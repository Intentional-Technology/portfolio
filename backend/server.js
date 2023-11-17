const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const validator = require("validator");
const cors = require("cors");
const neo4j = require("neo4j-driver");
const nodemailer = require("nodemailer");
const { Configuration, OpenAIApi } = require("openai");
const config = require("./config/configAdapter").config;
const { connectToDatabase, recordSubscription } = require("./util/database");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const stripe = require("stripe")(config.get("stripe.secretKey"));

const app = express();
app.use(express.json());
app.use("/processPayment", express.raw({ type: "*/*" }));
app.use(cors());

// Mailchimp setup
mailchimp.setConfig({
  apiKey: config.get("mailchimp.apiKey"),
  server: config.get("mailchimp.serverPrefix"),
});

// Nodemailer Setup
const gmailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: config.get("nodemailer.port"),
  secure: true,
  auth: {
    user: config.get("nodemailer.user"),
    pass: config.get("nodemailer.password"),
  },
});

// Open AI Setup
const configuration = new Configuration({
  organization: config.get("openai.orgKey"),
  apiKey: config.get("openai.apiKey"),
});
const openai = new OpenAIApi(configuration);

// Neo4j Setup
let driver = null;
try {
  driver = neo4j.driver(
    config.get("database.url"),
    neo4j.auth.basic(
      config.get("database.username"),
      config.get("database.password"),
    ),
  );
} catch (error) {
  console.error(error);
}

app.post(
  "/processPayment",
  express.json({ type: "application/json" }),
  (request, response) => {
    // Verify signature for security
    const sig = request.headers["stripe-signature"];
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        let customerDetails = event.data.object.customer_details;
        let name = customerDetails.name;
        let email = customerDetails.email;
        let zipcode = customerDetails.address.postal_code;
        handleCheckoutCompleted(name, email, zipcode);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  },
);

function handleCheckoutCompleted(name, email, zipcode) {
  // Add to mailchimp subscription
  return subscribeToEmails(name, email)
    .then((unused) => {
      // Email me to notify
      sendSubscriptionNotificationEmail(name, email);
    })
    .then((unused) => {
      // Add to database
      recordSubscription(name, email);
    });
}

// app.post(
//   "/processPayment",
//   express.raw({ type: "application/json" }),
//   (req, res) => {
//     const sig = ;
//     console.log("SIG");
//     console.log(sig);
//     let event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       config.get("stripe.webhookSecret"),
//     );
//     console.log(event);

//   },
// );

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  return sendContactNotificationEmail(name, email, message)
    .then(() => {
      console.log("Successfully emailed " + email);
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function subscribeToEmails(name, email) {
  return mailchimp.lists.addListMember(config.get("mailchimp.audienceListId"), {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: name,
    },
  });
}

function sendContactNotificationEmail(name, email, message) {
  return gmailTransport.sendMail({
    from: {
      name: "Intentional Technology",
      address: "info@intentionaltechnology.net",
    },
    to: "amanda@intentionaltechnology.net",
    subject: "Intentional Technology Inquiry",
    text: `User ${name} with email ${email} sent this message:\n${message}`,
  });
}

function sendSubscriptionNotificationEmail(name, email) {
  return gmailTransport.sendMail({
    from: {
      name: "Balanced Being",
      address: "info@intentionaltechnology.net",
    },
    to: "amanda@intentionaltechnology.net",
    subject: "New Balanced Being Subscription",
    text: `User ${name} with email ${email} just subscribed for Balanced Being`,
  });
}

function addToDatabase(name, email) {
  if (!driver) {
    throw new Error("Database connection unavailable.");
  }

  const session = driver.session();

  return session
    .run("MATCH (a:Person {email: $email}) RETURN a", { email })
    .then((result) => {
      if (result.records.length > 0) {
        console.log(email + " already exists");
        throw new Error("Email already exists");
      }
    })
    .then(() => {
      return session.run("CREATE (a:Person {name: $name, email: $email})", {
        name,
        email,
      });
    })
    .finally(() => {
      session.close();
    });
}

app.post("/ask", async (req, res) => {
  let user_input = req.body.question;

  return openai
    .createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a 500 word article about how to be intentional with " +
        user_input,
      max_tokens: 4000,
    })
    .then((response) => res.json(response.data.choices[0].text.trim()))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error processing request" });
    });
});

connectToDatabase()
  .catch((err) => {
    logger.error(
      "Failed to connect to database. Shutting down due to error: ",
      err.message,
    );
    process.exit();
  })
  .then((unused) => {
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server is listening on port 4000");
    });
  });
