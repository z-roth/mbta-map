import MapGl, { Marker } from "react-map-gl";
import { useState } from "react";

const Map = (redLineStops) => {
  const [viewport, setViewport] = useState({
    latitude: 42.3602534,
    longitude: -71.0582912,
    zoom: 10,
  });

  console.log(redLineStops);

  //const redLineMarkers = redLineStops.map((rls) => <Marker longitude={rls.} latitude={}></Marker>);

  return (
    <MapGl
      initialViewState={viewport}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100vw", height: "100vh" }}
    ></MapGl>
  );
};

export default Map;
