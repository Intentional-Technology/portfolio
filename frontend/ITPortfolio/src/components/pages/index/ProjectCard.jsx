import { Card, Image } from "react-bootstrap";

const cardStyles = {
  width: "417px",
  height: "350px",
};

function ProjectCard(props) {
  const { name, description, appLink, logoLink } = props;
  return (
    <Card className="p-3" style={cardStyles}>
      <Card.Body>
        <a href={appLink}>
          <Image src={logoLink} alt={name} style={{ maxHeight: "40px" }} />
        </a>
        <p className="pt-5 fs-3">{description}</p>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
