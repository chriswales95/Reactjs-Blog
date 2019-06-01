import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Toolbar from "../layout/Toolbar";
import Cookies from "universal-cookie";

class UserManagement extends React.Component {
  state = { users: [] };

  buttons = [
    { text: "Delete", onClick: () => console.log("...") },
    {
      text: "Enable",
      onClick: () => console.log("...")
    },
    { text: "Disable", onClick: () => console.log("...") }
  ];

  componentDidMount() {
    fetch("/users/manage")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const cookies = new Cookies();

    if (cookies.get("LoggedIn") === "yes") {
      return (
        <React.Fragment>
          <Header heading={"User Management"} />
          <Toolbar buttons={this.buttons} />
          <div className={"row"} style={{ padding: "20px" }}>
            <table
              id={"userTable"}
              style={{
                boxShadow: "0 4px 6px -5px rgba(0, 0, 0, 0.3)",
                minWidth: "100%"
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
          <h1>Not logged in</h1>
        </React.Fragment>
      );
    }
  }
}

export default UserManagement;
