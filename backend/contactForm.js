const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const validator = require("validator");
const cors = require("cors");
const neo4j = require("neo4j-driver");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to DB, if available.
const driver = null;
try {
  driver = neo4j.driver(
    process.env.DB_URL,
    neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD)
  );
} catch (error) {
  // Error is non-critical.
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

function addToDatabase() {
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

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
