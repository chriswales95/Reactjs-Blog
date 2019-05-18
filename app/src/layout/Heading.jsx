import React from "react";

function Heading(props) {
  return <h3 style={style}>{props.heading}</h3>;
}

const style = {
  paddingBottom: "10px",
  backgroundColor: "#0e275e",
  color: "white",
  paddingTop: "10px",
  PaddingBottom: "10px"
};

export default Heading;
