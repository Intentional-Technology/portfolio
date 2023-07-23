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

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "dummy123")
);

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const session = driver.session();

  return session
    .run("MATCH (a:Person {email: $email}) RETURN a", { email })
    .then((result) => {
      if (result.records.length > 0) {
        console.log(email + " already exists");
        return res.status(400).json({ error: "Email already exists" });
      }
    })
    .then(() => {
      return session.run("CREATE (a:Person {name: $name, email: $email})", {
        name,
        email,
      });
    })
    .then(() => {
      console.log("Successfully added " + name);
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    })
    .finally(() => {
      session.close();
    });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
