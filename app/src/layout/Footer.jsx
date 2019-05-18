import React from "react";

function Footer() {
  return (
    <footer style={mainStyle}>
      <small>simple footer -- 123456789</small>
    </footer>
  );
}

const mainStyle = {
  backgroundColor: "#0e275e",
  color: "white",
  paddingTop: "10px",
  paddingBottom: "10px",
  bottom: 0,
  position: "fixed",
  width: "100%"
};

export default Footer;
