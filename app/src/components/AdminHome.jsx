import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cookies from "universal-cookie";
import Toolbar from "../layout/Toolbar";
import Sidebar from "../layout/Sidebar";
const cookies = new Cookies();

class AdminHome extends Component {
  buttons = [
    { text: "Logout", onClick: () => this.logOut() },
    { text: "New Post", onClick: () => this.props.history.push("/new_blog/") }
  ];

  sidebar = {
    title: "dojodj",
    content: "ye boi"
  };

  logOut() {
    cookies.set("LoggedIn", "no", { path: "/" });

    window.location.replace("/");
  }

  LoggedIn() {
    if (cookies.get("LoggedIn") === "yes") {
      return (
        <React.Fragment>
          <Header heading={"Admin"} />
          <Toolbar buttons={this.buttons} />
          <div className={"row"}>
            <div className="col-md-10 col-sm-12">
              <p>...</p>
            </div>
            <div className="col-md-2 col-sm-12">
              <Sidebar content={this.sidebar} />
            </div>
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
