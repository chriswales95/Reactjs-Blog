import React from "react";
import Cookies from "universal-cookie";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Toolbar from "../layout/Toolbar";
const cookies = new Cookies();
const jwt = require("jsonwebtoken");

class AdminHome extends React.Component {
  state = {
    name: cookies.get("name"),
    buttons: [],
    sidebar: {
      title: "Title",
      content: "Content"
    }
  };

  componentDidMount() {
    var authButton = {
      text: "Authentication",
      onClick: () => this.props.history.push("/admin/users/")
    };

    var postButton = {
      text: "New Post",
      onClick: () => this.props.history.push("/new_blog/")
    };
    var logoutButton = { text: "Logout", onClick: () => this.logOut() };

    jwt.verify(cookies.get("token"), process.env.REACT_APP_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        var buttons = this.state.buttons;
        buttons.push(postButton);
        if (decoded.admin === true) {
          this.state.buttons.push(authButton);
          this.setState(this.state.buttons);
        }
        buttons.push(logoutButton);
      }
    });
  }

  logOut() {
    cookies.remove("LoggedIn", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("token", { path: "/" });
    window.location.replace("/");
  }

  LoggedIn() {
    if (cookies.get("LoggedIn") === "yes") {
      const context = this.state;
      return (
        <React.Fragment>
          <Header heading={"Admin"} />
          <Toolbar buttons={this.state.buttons} />
          <div style={{ margin: "5px" }} className={"pageWrap"}>
            <div className={"row"}>
              <div style={{ textAlign: "left" }} className="col-md-9 col-sm-12">
                <div style={greetingStyle} className={"greetingBox"}>
                  <p>Hello {context.name}</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-12">
                <Sidebar content={this.state.sidebar} />
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
