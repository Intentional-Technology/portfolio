import { useEffect, useState } from "react";
import CodeSnippet from "../components/pages/index/CodeSnippet";
import ProjectCard from "../components/pages/index/ProjectCard";
import ContactForm from "../components/pages/index/ContactForm";

function IndexPage() {
  const height = 3000;
  const width = 1024;

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
      <div className="mission p-5" id="mission">
        <div className="w-100 d-flex justify-content-center">
          <img
            width="40%"
            src="/images/logo/logo_top.svg"
            alt="Intentional Technology Logo"
          />
        </div>
        <p className="mission-text">
          Our mission is to help our users to be intentional with their most
          valuable resource - time.
        </p>
      </div>
      <div className="projects p-5" id="projects">
        <h1 className="projects-header">Apps</h1>
        <div className="project-cards">
          <ProjectCard
            name={"GamePad"}
            description={
              "Discover, track, and bookmark video games all in one place."
            }
            appLink={"https://www.usegamepad.com/"}
            logoLink="/images/app_logos/gamepad.svg"
          />
          <ProjectCard
            ProjectName={"Word of the Week"}
            description={
              "Build your vocabulary by learning and using a new word of the week each week."
            }
            appLink={"https://www.wordoftheweek.app/"}
            logoLink="/images/app_logos/wotw.svg"
          />
        </div>
      </div>
      <div className="about p-5" id="about">
        <div className="about-header-container">
          <h1 className="about-header">Our Founder</h1>
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
          className="personal-picture"
          alt="Amanda Carr photo"
        />
        <p className="about-text">
          Amanda Carr is a process-oriented, data-driven scaler. With nearly 10
          years of tech experience at both early-stage YC startups and Google,
          she is passionate about using her skillset to help people be
          intentional with their time and focus on what matters most.
        </p>
      </div>
      <div className="contact p-5" id="contact">
        <h1 className="contact-header">It is time to contact us!</h1>
        <ContactForm />
      </div>
    </>
  );
}

export default IndexPage;
