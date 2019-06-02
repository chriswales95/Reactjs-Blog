import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import Cookies from "universal-cookie";

class Admin extends React.Component {
  loggedIn() {
    const cookies = new Cookies();

    if (cookies.get("LoggedIn") === "yes") {
      this.props.history.push("/admin/home");
    }
  }

  handlePostEvent = async event => {
    event.preventDefault();

    await axios
      .post("/users/login/", {
        username: event.target.elements.username.value,
        pass: event.target.elements.pass.value
      })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/admin/home");
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    return (
      <div>
        {this.loggedIn()}
        <Header heading={"Admin"} />
        <br />
        <div className={"pageWrap"}>
          <form onSubmit={event => this.handlePostEvent(event)}>
            <table
              className="loginForm"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                minWidth: "100%"
              }}
            >
              <tbody>
                <tr>
                  <th>
                    <h3>Username </h3>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input
                      style={{ backgroundColor: "white" }}
                      name="username"
                      type="username"
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <h3>Password </h3>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input
                      style={{ backgroundColor: "white" }}
                      name="pass"
                      type="password"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="submit" value="login" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Admin;
