import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ProjectCard.css";

interface ProjectCardProps {
  ProjectNumber: string;
  ProjectName: string;
  ProjectDescription: string;
  ProjectLink: string;
  ProjectImage: string;
}

function ProjectCard(props: ProjectCardProps) {
  const {
    ProjectNumber,
    ProjectName,
    ProjectDescription,
    ProjectLink,
    ProjectImage,
  } = props;
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">#{ProjectNumber}</h2>
          <h4 className="card-title">{ProjectName}</h4>
          <br />
          <br />
          <p className="card-text">
            <span>{ProjectDescription}</span>
          </p>
          <br />
          <br />
          <a href={ProjectLink} className="card-link">
            <img
              className="link-icon"
              src="/images/RedirectIcon.svg"
              alt="Link Icon"
            />
          </a>
        </div>
      </div>
      <img className="project-image" src={ProjectImage} alt={ProjectName} />
    </div>
  );
}

export default ProjectCard;
