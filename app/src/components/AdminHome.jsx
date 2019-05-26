import React from "react";
import Cookies from "universal-cookie";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Toolbar from "../layout/Toolbar";
const cookies = new Cookies();

class AdminHome extends React.Component {
  buttons = [
    { text: "New Post", onClick: () => this.props.history.push("/new_blog/") },
    {
      text: "Authentication",
      onClick: () => console.log("manage users")
    },
    { text: "Logout", onClick: () => this.logOut() }
  ];

  sidebar = {
    title: "Title",
    content: "Content"
  };

  logOut() {
    cookies.remove("LoggedIn", { path: "/" });
    cookies.remove("name", { path: "/" });
    window.location.replace("/");
  }

  LoggedIn() {
    if (cookies.get("LoggedIn") === "yes") {
      return (
        <React.Fragment>
          <Header heading={"Admin"} />
          <Toolbar buttons={this.buttons} />
          <div style={{ margin: "5px" }} className={"row"}>
            <div style={{ textAlign: "left" }} className="col-md-9 col-sm-12">
              <p>Hello {cookies.get("name")}</p>
            </div>
            <div className="col-md-3 col-sm-12">
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
