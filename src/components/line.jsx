import { Card, ListGroup } from "react-bootstrap";
import Stop from "./stop";
import "./line.css";

const Line = (props) => {
  const alerts = props.alerts;
  const stops = props.stops;
  stops.forEach((stop) => {
    stop.alerts = [];
  });

  const alertsList =
    alerts.length > 0 ? (
      alerts.map((a) => <ListGroup.Item>{a.attributes.header}</ListGroup.Item>)
    ) : (
      <ListGroup.Item>No alerts to display at this time.</ListGroup.Item>
    );

  let stationAlerts = [];

  alerts.forEach((a) => {
    const stations = a.attributes.informed_entity.filter((ie) => {
      if (ie.stop) {
        return ie.stop.includes("place");
      }
      return false;
    });
    stationAlerts.push({ alert: a.attributes.header, stations: stations });
  });

  stationAlerts.forEach((a) => {
    a.stations.forEach((station) => {
      stops.forEach((stop) => {
        if (stop.id === station.stop) {
          stop.alerts = [...stop.alerts, a.alert];
        }
      });
    });
  });
  console.log("station alerts", stationAlerts);
  console.log("stops", stops);

  const stopComponents = stops.map((stop) => (
    <Stop key={stop.id} stop={stop} color={props.color} alerts={stop.alerts} />
  ));

  return (
    <div className="line">
      <h1 className="info">{props.name}</h1>
      <div className="stops-container">
        <div
          className="colored-line"
          style={{
            backgroundColor: props.color,
          }}
        ></div>
        {stopComponents}
      </div>
      <div className="info">
        <Card>
          <Card.Body>
            <Card.Title>Route Alerts</Card.Title>
            <ListGroup>{alertsList}</ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Line;
