import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Line from "./components/line";
import mbtaLogo from "./images/MBTA.svg";
import { Spinner } from "react-bootstrap";

const App = () => {
  const [stops, setStops] = useState({});
  const [alerts, setAlerts] = useState({});
  const [route, setRoute] = useState({});
  const [stopsLoading, setStopsLoading] = useState(true);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [line, setLine] = useState("Red");

  useEffect(() => {
    setStopsLoading(true);
    setAlertsLoading(true);
    getStops();
    getAlerts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);
  
  const client = axios.create({
    baseURL: "https://api-v3.mbta.com",
  });

  const getStops = () => {
    client({ method: "GET", url: `/stops?include=route&filter[route]=${line}` })
      .then((response) => {
        const allStops = response.data.data;
        setStops(allStops);
        setStopsLoading(false);
        const routeData = response.data.included.filter(
          (d) => d.type === "route"
        )[0];
        setRoute(routeData);
      })
      .catch((error) => console.error(error));
  };

  const getAlerts = () => {
    client({
      method: "GET",
      url: `/alerts?include=stops,routes&filter[route]=${line}`,
    })
      .then((response) => {
        const allAlerts = response.data.data;
        setAlerts(allAlerts);
        setAlertsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  console.log("Line Title: ", line);
  console.log("Alerts: ", alerts);
  console.log("Stops: ", stops);
  console.log("Route: ", route);

  const lineSelect = (
    <div className="line-select">
      <button
        className="line-button"
        onClick={() => {
          setLine("Red");
          console.log(line);
        }}
      >
        <div className="red-line-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#da291c"
            />
            <g fill="#fff">
              <path d="m17.17865 13.86377a6.66777 6.66777 0 0 1 2.50879.44971 5.78371 5.78371 0 0 1 1.91406 1.23242 5.35737 5.35737 0 0 1 1.21778 1.8125 5.81127 5.81127 0 0 1 .41992 2.21826 6.23057 6.23057 0 0 1 -.76758 3.16113 4.83029 4.83029 0 0 1 -2.50879 2.03028v.05761a3.5199 3.5199 0 0 1 1.3916.71045 3.9559 3.9559 0 0 1 .89942 1.13135 5.2879 5.2879 0 0 1 .50683 1.43555 12.49638 12.49638 0 0 1 .21778 1.56592q.0293.49292.05859 1.15966.02782.668.10156 1.36328a9.06039 9.06039 0 0 0 .23145 1.31934 3.043 3.043 0 0 0 .47851 1.05859h-4.55273a7.99213 7.99213 0 0 1 -.46384-2.34912q-.08788-1.3623-.26172-2.60986a4.11552 4.11552 0 0 0 -.98535-2.37793 3.39116 3.39116 0 0 0 -2.46484-.75391h-4.55374v8.09082h-4.55274v-20.706zm-1.624 9.36719a3.44032 3.44032 0 0 0 2.34863-.69629 2.88641 2.88641 0 0 0 .7832-2.26172 2.75737 2.75737 0 0 0 -.7832-2.18945 3.49346 3.49346 0 0 0 -2.34863-.68164h-4.9883v5.82914z" />
              <path d="m31.50385 13.86377v16.87793h10.09277v3.82812h-14.64551v-20.706z" />
            </g>
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Blue");
          console.log(line);
        }}
      >
        <div
          className="blue-line-icon line-icon"
          onClick={() => setLine("Blue")}
        >
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#003da5"
            />
            <g fill="#fff">
              <path d="m16.21338 13.647a12.87772 12.87772 0 0 1 2.69726.26123 5.83 5.83 0 0 1 2.0879.85547 3.98326 3.98326 0 0 1 1.34863 1.58057 5.56185 5.56185 0 0 1 .47851 2.43555 4.5366 4.5366 0 0 1 -.71093 2.61035 5.16141 5.16141 0 0 1 -2.10254 1.71093 4.97692 4.97692 0 0 1 2.85644 1.92823 5.74358 5.74358 0 0 1 .94239 3.3208 5.70688 5.70688 0 0 1 -.6084 2.71142 5.28726 5.28726 0 0 1 -1.63864 1.87058 7.25022 7.25022 0 0 1 -2.3496 1.07275 10.589 10.589 0 0 1 -2.71094.34815h-10.03422v-20.70603zm-.58008 8.38086a3.27472 3.27472 0 0 0 2.001-.57959 2.19 2.19 0 0 0 .7832-1.88525 2.41024 2.41024 0 0 0 -.26074-1.189 1.94175 1.94175 0 0 0 -.69629-.72509 2.94457 2.94457 0 0 0 -1.001-.36231 6.66287 6.66287 0 0 0 -1.17383-.10156h-4.26364v4.84277zm.26074 8.78711a6.08961 6.08961 0 0 0 1.27637-.13037 3.12816 3.12816 0 0 0 1.07324-.43506 2.20243 2.20243 0 0 0 .73926-.82666 2.84574 2.84574 0 0 0 .27539-1.334 2.67712 2.67712 0 0 0 -.89941-2.27637 3.83584 3.83584 0 0 0 -2.37793-.68164h-4.95896v5.68408z" />
              <path d="m31.438 13.647v16.8779h10.09276v3.8281h-14.64551v-20.706z" />
            </g>
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Orange");
          console.log(line);
        }}
      >
        <div className="orange-line-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#ed8b00"
            />
            <g fill="#fff">
              <path d="m5.64307 19.79541a10.34622 10.34622 0 0 1 2.001-3.46582 9.1562 9.1562 0 0 1 3.20508-2.31982 10.45537 10.45537 0 0 1 4.27734-.84131 10.43467 10.43467 0 0 1 4.292.84131 9.19465 9.19465 0 0 1 3.18945 2.31982 10.34624 10.34624 0 0 1 2.001 3.46582 12.94012 12.94012 0 0 1 .69629 4.30615 12.51018 12.51018 0 0 1 -.69629 4.21973 10.07168 10.07168 0 0 1 -2.001 3.40723 9.20067 9.20067 0 0 1 -3.18945 2.27685 10.595 10.595 0 0 1 -4.292.82617 10.616 10.616 0 0 1 -4.27734-.82617 9.16311 9.16311 0 0 1 -3.20515-2.27685 10.07166 10.07166 0 0 1 -2.001-3.40723 12.50994 12.50994 0 0 1 -.69629-4.21973 12.93987 12.93987 0 0 1 .69636-4.30615zm4.16211 6.84375a6.844 6.844 0 0 0 .9707 2.21875 4.978 4.978 0 0 0 1.74023 1.58009 5.31164 5.31164 0 0 0 2.61035.59472 5.31031 5.31031 0 0 0 2.60938-.59472 4.978 4.978 0 0 0 1.74023-1.58008 6.86683 6.86683 0 0 0 .97168-2.21875 10.53182 10.53182 0 0 0 .30469-2.5376 11.32323 11.32323 0 0 0 -.30469-2.63867 7.00147 7.00147 0 0 0 -.97168-2.27685 4.9307 4.9307 0 0 0 -1.74023-1.59473 5.31558 5.31558 0 0 0 -2.60938-.59473 5.3169 5.3169 0 0 0 -2.61035.59473 4.9307 4.9307 0 0 0 -1.74023 1.59468 6.9789 6.9789 0 0 0 -.9707 2.27685 11.32323 11.32323 0 0 0 -.30469 2.63867 10.53182 10.53182 0 0 0 .30469 2.53764z" />
              <path d="m32.96045 13.66162v16.87793h10.09277v3.82813h-14.64551v-20.70606z" />
            </g>
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Green-B");
          console.log(line);
        }}
      >
        <div className="green-line-b-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.79185 35.06978)"
            >
              B
            </text>
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.79185 35.06978)"
            >
              B
            </text>
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <path
              d="m25.07324 13.647a12.87782 12.87782 0 0 1 2.69727.26123 5.83 5.83 0 0 1 2.08789.85547 3.9831 3.9831 0 0 1 1.3486 1.58054 5.56184 5.56184 0 0 1 .47852 2.43555 4.5366 4.5366 0 0 1 -.71094 2.61035 5.16134 5.16134 0 0 1 -2.10254 1.71093 4.97692 4.97692 0 0 1 2.85645 1.92823 5.74358 5.74358 0 0 1 .94238 3.3208 5.70688 5.70688 0 0 1 -.6084 2.71142 5.28724 5.28724 0 0 1 -1.63867 1.87061 7.25037 7.25037 0 0 1 -2.34961 1.07275 10.58888 10.58888 0 0 1 -2.71094.34815h-10.03415v-20.70603zm-.58008 8.38086a3.2747 3.2747 0 0 0 2.001-.57959 2.19 2.19 0 0 0 .7832-1.88525 2.41024 2.41024 0 0 0 -.26074-1.189 1.94167 1.94167 0 0 0 -.69629-.72509 2.9446 2.9446 0 0 0 -1.001-.36231 6.663 6.663 0 0 0 -1.17383-.10156h-4.26366v4.84277zm.26075 8.78711a6.08958 6.08958 0 0 0 1.27636-.13037 3.12821 3.12821 0 0 0 1.07325-.43506 2.20249 2.20249 0 0 0 .73925-.82666 2.84562 2.84562 0 0 0 .27539-1.334 2.67712 2.67712 0 0 0 -.89941-2.27637 3.83582 3.83582 0 0 0 -2.37793-.68164h-4.959v5.68408z"
              fill="#fff"
            />
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Green-C");
          console.log(line);
        }}
      >
        <div className="green-line-c-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.25492 34.06979)"
            >
              C
            </text>
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.25492 34.06979)"
            >
              C
            </text>
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <path
              d="m28.53906 19.186a4.59688 4.59688 0 0 0 -1.01562-1.14551 4.69844 4.69844 0 0 0 -1.377-.76856 4.74812 4.74812 0 0 0 -1.60937-.27539 5.31688 5.31688 0 0 0 -2.61035.59473 4.93082 4.93082 0 0 0 -1.7402 1.59473 6.97933 6.97933 0 0 0 -.9707 2.27685 11.32377 11.32377 0 0 0 -.30469 2.63867 10.53232 10.53232 0 0 0 .30469 2.5376 6.84446 6.84446 0 0 0 .9707 2.21875 4.97814 4.97814 0 0 0 1.74024 1.58013 5.31161 5.31161 0 0 0 2.61035.59472 4.21452 4.21452 0 0 0 3.26269-1.27587 5.90447 5.90447 0 0 0 1.43458-3.36426h4.4082a10.53055 10.53055 0 0 1 -.89844 3.50928 8.41888 8.41888 0 0 1 -1.91406 2.668 8.12726 8.12726 0 0 1 -2.78418 1.68164 10.20069 10.20069 0 0 1 -3.50879.58008 10.61592 10.61592 0 0 1 -4.27734-.82617 9.16293 9.16293 0 0 1 -3.20508-2.27685 10.07168 10.07168 0 0 1 -2.001-3.40723 12.50994 12.50994 0 0 1 -.69629-4.21973 12.93987 12.93987 0 0 1 .69629-4.30615 10.34624 10.34624 0 0 1 2.001-3.46582 9.156 9.156 0 0 1 3.20508-2.31982 11.09858 11.09858 0 0 1 7.51074-.34815 8.76632 8.76632 0 0 1 2.72558 1.43555 7.74819 7.74819 0 0 1 1.98633 2.33447 8.3482 8.3482 0 0 1 .98633 3.18994h-4.4082a3.71734 3.71734 0 0 0 -.52149-1.43563z"
              fill="#fff"
            />
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Green-D");
          console.log(line);
        }}
      >
        <div className="green-line-d-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.25519 34.56984)"
            >
              D
            </text>
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.25519 34.56984)"
            >
              D
            </text>
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <path
              d="m24.1875 13.86377a10.6639 10.6639 0 0 1 3.72656.63818 8.08876 8.08876 0 0 1 2.98731 1.91405 8.83329 8.83329 0 0 1 1.97168 3.19 12.903 12.903 0 0 1 .71093 4.49463 14.34281 14.34281 0 0 1 -.58007 4.17627 9.19082 9.19082 0 0 1 -1.75491 3.3061 8.2152 8.2152 0 0 1 -2.92871 2.18945 9.914 9.914 0 0 1 -4.13281.79736h-8.93162v-20.706zm-.31836 16.87793a5.84432 5.84432 0 0 0 1.91406-.31885 4.2098 4.2098 0 0 0 1.65235-1.05859 5.317 5.317 0 0 0 1.16015-1.92826 8.48406 8.48406 0 0 0 .43555-2.9004 12.06178 12.06178 0 0 0 -.30469-2.82714 5.64589 5.64589 0 0 0 -1.001-2.16065 4.44088 4.44088 0 0 0 -1.84082-1.37744 7.36206 7.36206 0 0 0 -2.82813-.47852h-3.24802v13.04985z"
              fill="#fff"
            />
          </svg>
        </div>
      </button>

      <button
        className="line-button"
        onClick={() => {
          setLine("Green-E");
          console.log(line);
        }}
      >
        <div className="green-line-e-icon line-icon">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.604 34.56984)"
            >
              E
            </text>
            <path
              d="m24.03 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <text
              fill="#fff"
              font-family="HelveticaNeue-Bold, Helvetica Neue"
              font-size="29"
              font-weight="700"
              transform="translate(13.604 34.56984)"
            >
              E
            </text>
            <path
              d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"
              fill="#00843d"
            />
            <path
              d="m31.0918 13.86377v3.82812h-10.9336v4.437h10.03321v3.53811h-10.03321v5.0747h11.16407v3.82812h-15.7168v-20.706z"
              fill="#fff"
            />
          </svg>
        </div>
      </button>
    </div>
  );

  const navbar = (
    <div className="navbar">
      <div className="title">
        <img src={mbtaLogo} alt="MBTA Logo" className="logo"></img>
        MBTA Alerts
      </div>
      {lineSelect}
    </div>
  );

  const footer = (
    <div className="footer">
      Made by <a href="https://github.com/z-roth">Zack Roth</a>, 2022
    </div>
  )

  return stopsLoading || alertsLoading ? (
    <div className="App">
      {navbar}
      <Spinner animation="border" className="spinner" />
    </div>
  ) : (
    <div className="App">
      {navbar}
      <Line
        name={route.attributes.long_name}
        stops={stops}
        alerts={alerts}
        color={`#${route.attributes.color}`}
      />
      {footer}
    </div>
  );
};
export default App;
