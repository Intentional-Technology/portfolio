import { Card, Image } from "react-bootstrap";

const cardStyles = {
  maxWidth: "417px",
  maxHeight: "350px",
};

function AppCard(props) {
  const { name, description, appLink, logoLink } = props;
  return (
    <Card className="p-3" style={cardStyles}>
      <Card.Body>
        <a href={appLink}>
          <Image src={logoLink} alt={name} style={{ height: "40px" }} />
        </a>
        <p className="pt-5 fs-3">{description}</p>
      </Card.Body>
    </Card>
  );
}

export default AppCard;
