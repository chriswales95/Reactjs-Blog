import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header style={mainStyle}>
      <h1>Blog Application</h1> <Link to="/">Home</Link> |{" "}
      <Link to="/admin/login">Admin</Link>
      <h3 style={headingStyle}>{props.heading}</h3>
    </header>
  );
}

const headingStyle = {
  paddingBottom: "10px",
  backgroundColor: "#0e275e",
  color: "white",
  paddingTop: "10px",
  PaddingBottom: "10px"
};

const mainStyle = {
  backgroundColor: "#0e275e",
  color: "white",
  padding: "10px"
};

export default Header;
