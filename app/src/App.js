import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/Admin";
import Article from "./components/Article";
import AdminHome from "./components/AdminHome";
import NewPost from "./components/NewPost";
import UserManagement from "./components/Users";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";

class App extends Component {

  render() {
    return (
      <Router>
        <div
          className="App"
          style={{ margin: "0px", padding: "0px", minWidth: "100%" }}
        >
          <div
            className="container"
            style={{ margin: "0px", padding: "0px", minWidth: "100%" }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/new_blog" component={NewPost} />
              <Route exact path="/admin/login" component={Admin} />
              <Route exact path="/article/:id" component={Article} />
              <Route exact path="/admin/home" component={AdminHome} />
              <Route exact path="/admin/users" component={UserManagement} />
              <Route component={() => { return "Content Not Found"; }} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
