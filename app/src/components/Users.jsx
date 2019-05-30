import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cookies from "universal-cookie";

class UserManagement extends React.Component {
  state = { users: [] };

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
          <div className={"row"} style={{ padding: "40px" }}>
            <div className={"col-md-10"}>
              <table id={"userTable"} style={{ minWidth: "90%" }}>
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
            <div id={"side-buttons-users"} className={"col-md-02"}>
              <button>Delete</button>
              <br />
              <button>Enable</button>
              <br />
              <button>Disable</button>
            </div>
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
