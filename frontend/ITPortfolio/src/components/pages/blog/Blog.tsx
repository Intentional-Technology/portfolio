import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import Spinner from "../../common/Spinner";

import styles from "./Blog.module.css";

function BlogPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState("");
  const askQuestion = () => {
    if (!question.trim()) {
      setErrorMessage("Please enter a valid input.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return;
    }

    setLoading(true);
    setErrorMessage("");
    return axios
      .post(process.env.NEXT_PUBLIC_PORTFOLIO_BACKEND_ADDRESS + "/ask", {
        question: question,
      })
      .then((response) => {
        setLoading(false);
        setAnswer(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Sorry. We couldn't process your request.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  };

  const clearAnswer = () => {
    setAnswer("");
  };

  return (
    <div className={styles.container}>
      <h1>Take a step to a more intentional life.</h1>
      <div className={styles.inputSection}>
        <span>How to be more intentional with</span>
        <input
          className={styles.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="..."
        />
        <Button
          type="submit"
          variant="intentional-primary"
          onClick={askQuestion}
        >
          Ask
        </Button>
      </div>
      {loading && <Spinner />}
      <span style={{ color: "red" }}>{errorMessage}</span>

      {answer && (
        <div className="p-5">
          <Card className="p-3 mb-3">{answer}</Card>
          <Button
            type="button"
            variant="intentional-secondary"
            onClick={clearAnswer}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
