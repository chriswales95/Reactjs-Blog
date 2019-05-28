import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import Admin from "./components/Admin";
import { Link } from "react-router-dom";
import Article from "./components/Article";
import AdminHome from "./components/AdminHome";
import NewPost from "./components/NewPost";
import UserManagement from "./components/Users";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  state = {
    posts: [],
    sidebar: { title: "Sidebar", content: "sidebar content" }
  };

  componentDidMount() {
    fetch("/posts")
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

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
              <Route
                exact
                path="/"
                render={() => (
                  <div className="App">
                    <Header heading={"Blog Posts"} />
                    <div id={"main"} style={{ textAlign: "left" }}>
                      <div className="row">
                        <div className="col-md-9 col-sm-12">
                          <ul className="mainList">
                            {this.state.posts.map(post => (
                              <li key={this.state.posts.indexOf(post)}>
                                <Link
                                  className={"main_list"}
                                  to={`/article/${this.state.posts.indexOf(
                                    post
                                  )}`}
                                >
                                  {post.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-3 col-sm-12">
                          <Sidebar content={this.state.sidebar} />
                        </div>
                      </div>
                    </div>
                    <Footer />
                  </div>
                )}
              />
              <Route path="/new_blog" component={NewPost} />
              <Route
                exact
                path="/admin/"
                component={() => {
                  return "admin";
                }}
              />
              <Route exact path="/admin/login" component={Admin} />
              <Route exact path="/article/:id" component={Article} />
              <Route exact path="/admin/home" component={AdminHome} />
              <Route exact path="/admin/users" component={UserManagement} />
              <Route
                component={() => {
                  return "Content Not Found";
                }}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
