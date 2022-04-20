import StopIcon from "./stop-icon";
import { Card, Collapse, ListGroup } from "react-bootstrap";
import "./stop.css";
import { useState } from "react";

const Stop = (props) => {
  const [open, setOpen] = useState(false);
  const alerts = props.alerts;

  const preparedAlerts =
    props.alerts.length === 0 ? (
      <Card.Text>No alerts to display at this time.</Card.Text>
    ) : (
      <ListGroup>
        {alerts.map((a) => (
          <ListGroup.Item>{a}</ListGroup.Item>
        ))}
      </ListGroup>
    );

  return (
    <div className="stop-container">
      <StopIcon color={props.color} alert={props.alerts.length !== 0} />
      <Card>
        <Card.Header
          onClick={() => {
            setOpen(!open);
            console.log("Clicky dicky");
          }}
          aria-expanded={open}
          style={{ minWidth: "7.5rem", textAlign: "center" }}
        >
          {props.stop.attributes.name}
        </Card.Header>
        <Collapse in={open}>
          <Card.Body style={{ minWidth: "20rem" }}><Card.Title>Alerts</Card.Title>{preparedAlerts}</Card.Body>
        </Collapse>
      </Card>
    </div>
  );
};

export default Stop;
