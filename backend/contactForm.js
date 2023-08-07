const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const validator = require("validator");
const cors = require("cors");
const neo4j = require("neo4j-driver");
const { Configuration, OpenAIApi } = require("openai");
const config = require("./config/configAdapter").config;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

console.log("CONFIG");
console.log(config);
console.log("OPENAI ORG KEY");
console.log(config.get("openai"));
console.log(config.get("openai.orgKey"));
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
      config.get("database.password")
    )
  );
} catch (error) {
  console.error(error);
}

app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  sendNotificationEmail(name, email);

  return addToDatabase(name, email)
    .then(() => {
      console.log("Successfully added " + name + " to database");
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

function sendNotificationEmail() {
  // Todo: Use Nodemailer to send emails to amanda@intentionaltechnology.net
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
      prompt: user_input,
      max_tokens: 150,
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
