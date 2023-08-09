import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import styles from "./Blog.module.css";

function BlogPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const tempanswer =
    "There's a lot of fun things to do in and around Gainesville Texas for adults, too. Gainesville is only 5 minutes from the luxurious Winstar Casino, a full-fledged casino resort. Stop by and play a huge selection of slots, table games, or just for dinner. The Winstar puts on regular shows from top comedians and artists, meaning there's always something to do. If you're heading out on a date night, or a casual get-together with friends, try out The Main Street Pub. The Main Street Pub has some of the best food in Gainesville, including juicy chicken fried steaks that are to die for. They always have tons on tap, and the atmosphere is on-point Texas-chic.";
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
      .post(process.env.NEXT_PUBLIC_PORTFOLIO_BACKEND_ADDRESS + "/ask", {
        question: "how to be more intentional with " + question,
      })
      .then((response) => setAnswer(response.data))
      .catch((error) => {
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
