import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);
    axios
      .post(process.env.NEXT_PUBLIC_PORTFOLIO_BACKEND_ADDRESS + "/register", {
        name: name,
        email: email,
        message: message,
      })
      .then(() => {
        setPopupMessage("Your submission was recorded successfully!");
      })
      .catch(() => {
        setPopupMessage("Submission failed. Please try again later.");
      })
      .finally(() => {
        setName("");
        setEmail("");
        setMessage("");

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
        <div className="mb-3">
          <label
            htmlFor="messageInput"
            className="form-label"
            style={{ fontSize: "18px" }}
          >
            Message
          </label>
          <input
            type="textarea"
            className="form-control"
            id="messageInput"
            aria-describedby="messageHelp"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ height: "200px" }}
          />
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
