const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const validator = require("validator");
const cors = require("cors");
const neo4j = require("neo4j-driver");
const nodemailer = require("nodemailer");
const { Configuration, OpenAIApi } = require("openai");
const config = require("./config/configAdapter").config;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  return sendNotificationEmail(name, email, message)
    .then(() =>
      addToDatabase(name, email).catch((err) => {
        /* Database errors non-critical */
        console.log("Failed to add to database");
      }),
    )
    .then(() => {
      console.log("Successfully emailed " + email);
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

function sendNotificationEmail(name, email, message) {
  return gmailTransport.sendMail({
    from: { name: "GamePad", address: "info@intentionaltechnology.net" },
    to: "amanda@intentionaltechnology.net",
    subject: "Intentional Technology Inquiry",
    text: `User ${name} with email ${email} sent this message:\n${message}`,
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
