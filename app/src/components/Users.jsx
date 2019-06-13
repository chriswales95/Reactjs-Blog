import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Toolbar from "../layout/Toolbar";
import Cookies from "universal-cookie";
import Axios from "axios";

class UserManagement extends React.Component {
  state = { render: false, users: [] };

  buttons = [
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
  ];

  componentDidMount() {
    const cookies = new Cookies();
    const uName = cookies.get("username");

    Axios.put("/users/userIsSU/", {
      username: uName
    }).then(response => {
      if (response.status === 200) {
        var render = true;
        this.setState({ render });
      }
    });

    fetch("/users/manage")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    if (this.state.render === true) {
      return (
        <React.Fragment>
          <Header heading={"User Management"} />
          <Toolbar buttons={this.buttons} />
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
          <p>Not authorised</p>
        </React.Fragment>
      );
    }
  }
}

export default UserManagement;
