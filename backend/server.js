const express = require("express");
const validator = require("validator");
const cors = require("cors");
const config = require("./config/configAdapter").config;
const { connectToDatabase } = require("./util/database");
const stripe = require("stripe")(config.get("stripe.secretKey"));
const { sendContactNotificationEmail } = require("./util/nodemailer");
const { generateArticle } = require("./util/openai");
const {
  handleCheckoutCompleted,
} = require("./requestHandlers/balancedBeingCheckout");

const app = express();
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.post(
  "/processPayment",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = stripe.webhooks.constructEvent(
      request.body,
      request.headers["stripe-signature"],
      config.get("stripe.webhookSecret"),
    );

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

app.use(express.json());

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

app.post("/ask", async (req, res) => {
  let user_input = req.body.question;

  return generateArticle(user_input)
    .then((response) => res.json(response))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error processing request" });
    });
});

// Start server
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
