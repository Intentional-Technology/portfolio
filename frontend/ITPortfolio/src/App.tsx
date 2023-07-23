import "./App.css";
import Menu from "./components/Menu";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import personalPicture from "/images/AmandaMoreton.png";
import LinkedinIcon from "/images/linkedin.svg";
{
  /*import AOS from "aos";
import "aos/dist/aos.css";*/
}
import "./Fonts/cabinet-grotesk.css";
import "./Fonts/satoshi.css";
import { useEffect, useState } from "react";
import CodeSnippet from "./components/CodeSnippet";

function App() {
  const height = 3000;
  const width = 1024;

  {
    /*useEffect(() => {
    AOS.init();
  }, []);*/
  }

  const [codeSnippets, setCodeSnippets] = useState<
    Array<{ top: number; left: number; key: number }>
  >([]);

  const maxSnippets = 20;

  useEffect(() => {
    const createSnippet = () => {
      setCodeSnippets((snippets) => {
        const newTop = Math.random() * height;
        const newLeft = Math.random() * width;

        let newSnippets = [
          ...snippets,
          { top: newTop, left: newLeft, key: Date.now() },
        ];

        if (newSnippets.length > maxSnippets) {
          newSnippets = newSnippets.slice(-maxSnippets);
        }

        return newSnippets;
      });
    };

    createSnippet();

    const intervalId = setInterval(createSnippet, 3000);

    return () => clearInterval(intervalId);
  }, [height, width]);

  return (
    <>
      <div>
        {codeSnippets.map((snippet) => (
          <CodeSnippet
            key={snippet.key}
            top={snippet.top}
            left={snippet.left}
          />
        ))}
      </div>
      <Menu />
      <div
        className="mission"
        id="mission"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <h1 className="mission-header">Intentional Technologies</h1>
        <p className="mission-text">
          Our mission is to help our users to be intentional with their most
          valuable resource - time.
        </p>
      </div>

      <div
        className="projects"
        id="projects"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <h1 className="projects-header">Projects</h1>
        <div className="project-cards">
          <ProjectCard
            ProjectNumber="01"
            ProjectName={"GamePad"}
            ProjectDescription={
              "Use GamePad to discover, track, and bookmark video games all in one place."
            }
            ProjectLink={"https://www.usegamepad.com/"}
            ProjectImage="/images/GamePadCard.png"
          />
          <ProjectCard
            ProjectNumber="02"
            ProjectName={"Word of the Week"}
            ProjectDescription={
              "Build your vocabulary by learning and using a new word of the week each week."
            }
            ProjectLink={"https://www.wordoftheweek.app/"}
            ProjectImage="/images/WotwCard.png"
          />
        </div>
      </div>

      <div
        className="about"
        id="about"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <div className="about-header-container">
          <h1 className="about-header">Amanda Carr</h1>
          <a href="https://www.linkedin.com/in/amanda-t-carr/">
            <img src={LinkedinIcon} alt="Linkedin Icon" id="linkedin-icon" />
          </a>
        </div>
        <img
          src={personalPicture}
          className="personal-picture"
          alt="Amanda Moreton personal picture."
        />
        <p className="about-text">
          A process-oriented, data-driven scaler. With nearly 10 years of tech
          experience at both early-stage YC startups and Google, she is
          passionate about using her skillset to help people be intentional with
          their time and focus on what matters most.
        </p>
      </div>

      <div
        className="contact"
        id="contact"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <h1 className="contact-header">It is time to contact us!</h1>
        <ContactForm />
      </div>

      <footer className="footer">
        <p id="footer-text">© 2023 Intentional Technologies</p>
      </footer>
    </>
  );
}

export default App;
