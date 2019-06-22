import React from "react";

function Footer() {
  return (
    <footer style={mainStyle}>
      <div className={"row"}>
        <div
          style={{ padding: "0", margin: "0" }}
          className="col-md-6 col-sm-12"
        >
          <h3>About</h3>
          Created by Christopher Wales
          <br />A mini-project for learning ReactJS
        </div>
        <div
          style={{ padding: "0", margin: "0" }}
          className="col-md-6 col-sm-12"
        >
          <h3>Links</h3>
          <a href={"https://chriswales.uk"}>chriswales.uk</a>
          <br />
          <a href="https://github.com/chriswales95/Reactjs-Blog">GitHub repo</a>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#0F0A0A",
          margin: "30px 0px 0px 0px",
          minWidth: "100%"
        }}
        className={"row"}
      >
        <div
          style={{
            margin: "0",
            minWidth: "100%",
            textAlign: "center"
          }}
        >
          <p
            style={{
              paddingTop: "0px",
              paddingBottom: "0px"
            }}
          >
            <small>© 2019 Christopher Wales</small>
          </p>
        </div>
      </div>
    </footer>
  );
}

const mainStyle = {
  backgroundColor: "var(--main-theme-color)",
  color: "white",
  marginTop: "10px"
};

export default Footer;
