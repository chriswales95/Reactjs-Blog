import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Heading from "../layout/Heading";

function Admin() {
  return (
    <div>
      <Header />
      <Heading heading={"Admin"} />
      <br />
      <div>
        <form action="/users/login/" method="POST">
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
              <th>
                <label>Username </label>
              </th>
              <tr>
                <input name="username" type="username" />
              </tr>
              <th>
                <label>Password </label>
              </th>
              <tr>
                <input name="pass" type="password" />
              </tr>
              <br />
              <tr>
                <input type="submit" value="login" />
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
