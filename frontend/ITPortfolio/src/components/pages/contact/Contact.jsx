import ContactForm from "./ContactForm";
import { Col, Row } from "react-bootstrap";

const styles = {
  container: {
    marginTop: "80px",
  },
};

function ContactPage() {
  return (
    <div style={styles.container} className="p-5 text-center">
      <h1>Contact Us</h1>
      <p className="mb-0">
        Reach out regarding any of our existing products, including:
      </p>
      <div className="d-flex justify-content-center">
        <Row style={{ maxWidth: "900px" }}>
          <Col className="py-2">
            <a href="https://www.usegamepad.com">
              <img src="/images/app_logos/gamepad.svg" height="30px" />
            </a>
          </Col>
          <Col className="py-2">
            <a href="https://www.wordoftheweek.app">
              <img src="/images/app_logos/wotw.svg" height="30px" />
            </a>
          </Col>
          <Col className="py-2">
            <a href="https://www.getbalancedbeing.com">
              <img src="/images/app_logos/balancedbeing.svg" height="30px" />
            </a>
          </Col>
        </Row>
      </div>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
