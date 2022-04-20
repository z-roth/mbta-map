import "./stop-icon.css";

const StopIcon = (props) => {
  const color = props.alert ? "yellow" : "white"
  return (
    <div
      className="stop-icon"
      style={{
        backgroundColor: color,
        border: `.35rem solid ${props.color}`,
      }}
    ></div>
  );
};

export default StopIcon;
