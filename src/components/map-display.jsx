import MapGl, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import mapboxgl from "mapbox-gl";

const Map = (props) => {
  const redStops = props.redLineStops;
  const orangeStops = props.orangeLineStops;
  const blueStops = props.blueLineStops;
  const [viewport, setViewport] = useState({
    latitude: 42.3602534,
    longitude: -71.0582912,
    zoom: 10,
  });
  const [selectedStop, setSelectedStop] = useState();
  const [showPopup, setShowPopup] = useState(false);

  console.log("Map", redStops);
  console.log("Map", orangeStops);

  const redMarkers = redStops.map((rls) => (
    <Marker
      key={rls.id}
      longitude={rls.attributes.longitude}
      latitude={rls.attributes.latitude}
      pitchAlignment="viewport"
      color="red"
      onClick={() => {
        setSelectedStop(rls);
        setShowPopup(true);
      }}
    ></Marker>
  ));

  const orangeMarkers = orangeStops.map((ols) => (
    <Marker
    key={ols.id}
    longitude={ols.attributes.longitude}
    latitude={ols.attributes.latitude}
    pitchAlignment="viewport"
    color="orange"
    onClick={() => {
      setSelectedStop(ols);
      setShowPopup(true);
    }}>
    </Marker>
  ))

  const blueMarkers = blueStops.map((bls) => (
    <Marker
    key={bls.id}
    longitude={bls.attributes.longitude}
    latitude={bls.attributes.latitude}
    pitchAlignment="viewport"
    color="blue"
    onClick={() => {
      setSelectedStop(bls);
      setShowPopup(true);
    }}>
    </Marker>
  ))


  const popUp = showPopup ? (
    <Popup
      latitude={selectedStop.attributes.latitude}
      longitude={selectedStop.attributes.longitude}
      anchor="bottom"
    >
      <div>{selectedStop.attributes.name}</div>
    </Popup>
  ) : (
    <div></div>
  );

  console.log(popUp);

  return (
    <MapGl
      initialViewState={viewport}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      style={{ width: "100vw", height: "100vh" }}
    >
      {redMarkers}
      {orangeMarkers}
      {blueMarkers}
      {popUp}
    </MapGl>
  );
};

export default Map;