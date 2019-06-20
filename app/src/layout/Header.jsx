import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header style={mainStyle}>
      <h2>ReactJS Application</h2> <h4 style={headingStyle}>{props.heading}</h4>
      <Link to="/">Home</Link> | <Link to="/admin/login">Admin</Link>
    </header>
  );
}

const headingStyle = {
  paddingBottom: "5px",
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  paddingTop: "5px",
  PaddingBottom: "5px",
  fontSize: "16px"
};

const mainStyle = {
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  padding: "10px",
  maxWidth: "100%"
};

export default Header;
