import styles from "./ProjectCard.module.css";

function ProjectCard(props) {
  const {
    ProjectNumber,
    ProjectName,
    ProjectDescription,
    ProjectLink,
    ProjectImage,
  } = props;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className="card-body">
          <h2 className="card-title">#{ProjectNumber}</h2>
          <h4 className="card-title">{ProjectName}</h4>
          <br />
          <br />
          <p className={styles.cardText}>
            <span>{ProjectDescription}</span>
          </p>
          <br />
          <br />
          <a href={ProjectLink} className="card-link">
            <img
              className={styles.linkIcon}
              src="/images/RedirectIcon.svg"
              alt="Link Icon"
            />
          </a>
        </div>
      </div>
      <img
        className={styles.projectImage}
        src={ProjectImage}
        alt={ProjectName}
      />
    </div>
  );
}

export default ProjectCard;
