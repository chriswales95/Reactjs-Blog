import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class AdminHome extends Component {
  state = {};

  logOut() {
    cookies.remove("LoggedIn");
    this.props.history.push("/");
  }

  LoggedIn() {
    if (cookies.get("LoggedIn")) {
      return (
        <React.Fragment>
          <Header heading={"Admin"} />

          <div
            className="adminToolbar"
            style={{
              padding: "10px",
              backgroundColor: "#f7f7f9",
              textAlign: "left"
            }}
          >
            <button
              onClick={() => {
                window.location.href = "/new_blog";
              }}
            >
              New Post
            </button>
            <button onClick={() => this.logOut()}>Log Out</button>
          </div>

          <Footer />
        </React.Fragment>
      );
    } else {
      return <h1>Not logged in</h1>;
    }
  }

  render() {
    return <div> {this.LoggedIn()}</div>;
  }
}

export default AdminHome;
