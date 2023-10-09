import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AppCard from "./AppCard";
import ContactForm from "./ContactForm";
import styles from "./Index.module.css";

function IndexPage() {
  return (
    <>
      <div className={styles.indexSection} id="mission">
        <div className="w-100 d-flex justify-content-center">
          <img
            width="40%"
            src="/images/logo/logo_top.svg"
            alt="Intentional Technology Logo"
          />
        </div>
        <p className={styles.indexText + " pt-5"}>
          Our mission is to help our users to be intentional with their most
          valuable resource - time.
        </p>
      </div>
      <div className={styles.indexSection} id="apps">
        <h1 className={styles.indexSectionHeader + " pb-4"}>Apps</h1>
        <Row>
          <Col className="d-flex justify-content-center">
            <AppCard
              name={"GamePad"}
              description={
                "Discover, track, and bookmark video games all in one place."
              }
              appLink={"https://www.usegamepad.com/"}
              logoLink="/images/app_logos/gamepad.svg"
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <AppCard
              ProjectName={"Word of the Week"}
              description={
                "Build your vocabulary by learning and using a new word of the week each week."
              }
              appLink={"https://www.wordoftheweek.app/"}
              logoLink="/images/app_logos/wotw.svg"
            />
          </Col>
        </Row>
      </div>
      <div className={styles.indexSection} id="about">
        <div className={styles.aboutHeaderContainer}>
          <h1 className={styles.indexSectionHeader}>Our Founder</h1>
          <a href="https://www.linkedin.com/in/amanda-t-carr/">
            <img
              src="/images/linkedin.svg"
              alt="Linkedin Icon"
              id="linkedin-icon"
            />
          </a>
        </div>
        <img
          src="/images/AmandaCarr.png"
          className={styles.personalPicture}
          alt="Amanda Carr photo"
        />
        <p className={styles.indexText}>
          Amanda Carr is a process-oriented, data-driven scaler. With nearly 10
          years of tech experience at both early-stage YC startups and Google,
          she is passionate about using her skillset to help people be
          intentional with their time and focus on what matters most.
        </p>
      </div>
      <div className={styles.indexSection} id="contact">
        <h1 className={styles.indexSectionHeader + " pb-4"}>
          It is time to contact us!
        </h1>
        <ContactForm />
      </div>
    </>
  );
}

export default IndexPage;
