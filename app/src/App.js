import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Admin from "./components/Admin";
import { Link } from "react-router-dom";
import Article from "./components/Article";
import AdminHome from "./components/AdminHome";

import "./App.css";

class App extends Component {
  state = { posts: [] };

  componentDidMount() {
    fetch("/posts")
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div className="App">
                    <Header />
                    <div style={{ padding: "10px", textAlign: "left" }}>
                      <h4>Blog Items</h4>
                      <ul>
                        {this.state.posts.map(post => (
                          <li key={post.id}>
                            <Link to={`/article/${post.id}`}>{post.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Footer />
                  </div>
                )}
              />
              <Route
                path="/new_blog"
                render={() => <h1>Write New Blog Post</h1>}
              />
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
