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
      onClick: () => this.props.history.push("/admin/users/")
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
          <div style={{ margin: "5px" }} className={"pageWrap"}>
            <div className={"row"}>
              <div style={{ textAlign: "left" }} className="col-md-9 col-sm-12">
                <div style={greetingStyle} className={"greetingBox"}>
                  <p>Hello {cookies.get("name")}</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-12">
                <Sidebar content={this.sidebar} />
              </div>
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

const greetingStyle = {
  backgroundColor: "white",
  fontSize: "20pt",
  padding: "10px 0px 1px 5px",
  margin: "20px",
  boxShadow: "0 4px 6px -5px rgba(0, 0, 0, 0.3)",
  maxWidth: "33%"
};
export default AdminHome;
