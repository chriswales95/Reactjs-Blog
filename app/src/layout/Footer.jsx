import React from "react";

function Footer() {
  return (
    <footer style={mainStyle}>
      <a
        style={{ color: "white" }}
        href="https://github.com/chriswales95/Reactjs-Blog"
      >
        github.com/chriswales95/Reactjs-Blog
      </a>
    </footer>
  );
}

const mainStyle = {
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  paddingTop: "10px",
  paddingBottom: "10px",
  bottom: 0,
  position: "fixed",
  width: "100%"
};

export default Footer;
