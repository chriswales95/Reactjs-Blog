import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={mainStyle}>
      <h1>Blog Application</h1> <Link to="/">Home</Link> |{" "}
      <Link to="/admin/login">Admin</Link>
    </header>
  );
}

const mainStyle = {
  backgroundColor: "#0e275e",
  color: "white",
  padding: "10px"
};

export default Header;
