import "./App.css";
import axios from "axios";
import { Navbar } from "react-bootstrap";
import Map from "./components/map-display";
import { useEffect, useState } from "react";

function App() {
  const [redLineStops, getRedLineStops] = useState({});

  useEffect(() => {
    getAllRedLineStops();
  }, []);

  const getAllRedLineStops = () => {
    axios
      .get("https://api-v3.mbta.com/stops?filter[route]=Red")
      .then((response) => {
        const allRedLineStops = response.data.data;
        getRedLineStops(allRedLineStops);
      })
      .catch();
  };

  return (
    <div className="App">
      <Navbar>MBTA Station Outages</Navbar>
      <Map redLineStops={redLineStops} />
    </div>
  );
}

export default App;
