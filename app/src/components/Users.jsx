import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Toolbar from "../layout/Toolbar";
import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");

class UserManagement extends React.Component {
  state = {
    users: [],
    render: false,
    buttons: [
      { text: "Delete Account", onClick: () => console.log("...") },
      {
        text: "Enable Account",
        onClick: () => console.log("...")
      },
      {
        text: "Disable Account",
        onClick: () => console.log("...")
      },
      { text: "Change Password", onClick: () => console.log("...") }
    ]
  };

  componentDidMount() {
    const cookies = new Cookies();

    jwt.verify(
      cookies.get("token"),
      process.env.REACT_APP_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          console.log(err);
          this.props.history.push("/");
        }

        if (decoded) {
          if (decoded.admin === true) {
            fetch("/users/manage")
              .then(res => {
                if (res.status === 200) {
                  return res.json();
                }
              })
              .then(users => {
                this.setState({ users });
              })
              .catch(err => console.log(err));

            var render = true;
            this.setState({ render });
          }
        }
      }
    );
  }

  render() {
    if (this.state.render === true && typeof this.state.users !== "undefined") {
      return (
        <React.Fragment>
          <Header heading={"User Management"} />
          <Toolbar buttons={this.state.buttons} />
          <div
            className={"pageWrap"}
            style={{ overflowX: "auto", padding: "20px" }}
          >
            <table
              id={"userTable"}
              style={{
                boxShadow: "0 4px 6px -5px rgba(0, 0, 0, 0.3)"
              }}
            >
              <tbody>
                <tr key={"header"}>
                  <th />
                  <th>ID</th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Admin</th>
                </tr>
                {this.state.users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type={"radio"}
                        name="userChoice"
                        value={user.username}
                      />
                    </td>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.superUser === true ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>Not authorised</h1>
        </React.Fragment>
      );
    }
  }
}

export default UserManagement;
