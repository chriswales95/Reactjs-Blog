import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header style={mainStyle}>
      <h1>ReactJS Blog</h1> <h3 style={headingStyle}>{props.heading}</h3>
      <Link to="/">Home</Link> | <Link to="/admin/login">Admin</Link>
    </header>
  );
}

const headingStyle = {
  paddingBottom: "5px",
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  paddingTop: "10px",
  PaddingBottom: "10px",
  fontSize: "21px"
};

const mainStyle = {
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  padding: "10px",
  maxWidth: "100%"
};

export default Header;
