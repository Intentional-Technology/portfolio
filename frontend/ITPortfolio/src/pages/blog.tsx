import { useState } from "react";
import { CSSProperties } from "react";
import axios from "axios";

export default function Blog() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const askQuestion = () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a valid input.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }

    setErrorMessage("");
    return axios
      .post(process.env.REACT_APP_PORTFOLIO_BACKEND_ADDRESS + "/ask", {
        question: "how to be more intentional with " + question,
      })
      .then((response) => setAnswer(response.data))
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const clearAnswer = () => {
    setAnswer("");
  };

  const inputStyle: CSSProperties = {
    width: "200px",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
    border: "none",
    borderBottom: "1px solid black",
    fontSize: "16px",
    background: "none",
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 60px)",
    paddingTop: "60px",
  };

  const questionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: "white",
    color: "pink",
    border: "1px solid pink",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "10px",
    borderRadius: "10px",
  };

  const answerStyle: CSSProperties = {
    marginTop: "20px",
    marginBottom: "20px",
    width: "1000px",
    border: "1px solid",
    minHeight: "50px",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    display: answer ? "block" : "none",
  };

  return (
    <div style={containerStyle}>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "CabinetGrotesk-Regular",
        }}
      >
        Take a step to a more intentional life.
      </h1>
      <div style={questionStyle}>
        <span>How to be more intentional with</span>
        <input
          style={inputStyle}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="..."
        />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <button type="button" style={buttonStyle} onClick={askQuestion}>
          Ask
        </button>
      </div>
      <div style={answerStyle}>{answer}</div>
      {answer && (
        <button type="button" style={buttonStyle} onClick={clearAnswer}>
          Clear
        </button>
      )}
    </div>
  );
}
