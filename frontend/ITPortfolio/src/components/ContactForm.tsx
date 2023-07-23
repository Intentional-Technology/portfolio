import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Name: " + name);
    console.log("Email: " + email);
    axios
      .post("http://" + process.env.REACT_APP_PORTFOLIO_BACKEND_ADDRESS + "/register", {
        name: name,
        email: email,
      })
      .then(() => {
        setPopupMessage("Your submission was recorded successfully!");
      })
      .catch(() => {
        setPopupMessage("Email already exists!");
      })
      .finally(() => {
        setName("");
        setEmail("");

        setTimeout(() => {
          setPopupMessage("");
        }, 2000);
      });
  };

  return (
    <div className="container" style={{ maxWidth: "600px", textAlign: "left" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="nameInput"
            className="form-label"
            style={{ fontSize: "18px" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="emailInput"
            className="form-label"
            style={{ fontSize: "18px" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{ color: "whitesmoke", opacity: "0.6" }}
          >
            We'll never share your email with anyone else.
          </div>
        </div>
        <button type="submit" className="btn btn-outline-light">
          Submit
        </button>
      </form>

      {popupMessage && (
        <span className="popuptext" id="ActualPopup">
          {popupMessage}
        </span>
      )}
    </div>
  );
}

export default Form;
