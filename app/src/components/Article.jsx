import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cookies from "universal-cookie";
import Toolbar from "../layout/Toolbar";
import dateFormatter from "../utilities/dates";

const cookies = new Cookies();

class Article extends Component {
  state = { post: {} };
  buttons = [
    {
      text: "delete",
      onClick: () => this.deletePost()
    },
    { text: "edit", onClick: () => console.log("edit") }
  ];

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/posts/${id}/`)
      .then(res => res.json())
      .then(post => {
        this.setState({ post });
      });
  }

  Toolbar() {
    if (cookies.get("LoggedIn") === "yes") {
      return <Toolbar buttons={this.buttons} />;
    }
  }

  renderContent() {
    var post = this.state.post;

    if (post.title) {
      return (
        <div>
          <div
            style={{ maxWidth: "auto", textAlign: "centre" }}
            key={post.title}
          >
            <Header heading={post.title} />
            {this.Toolbar()}
            <div
              style={{
                marginTop: "10px",
                marginLeft: "35px",
                paddingLeft: "10px",
                textAlign: "left"
              }}
            >
              {dateFormatter.format(post.date)}
            </div>
            <div
              className={"pageWrap"}
              style={{
                backgroundColor: "white",
                margin: "0px 35px 35px 35px",
                padding: "20px",
                boxShadow: "0 4px 6px -5px rgba(0, 0, 0, 0.3)",
                textAlign: 'left'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Footer />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <p>Post does not exist</p>
          <Footer />
        </div>
      );
    }
  }

  deletePost() {
    var http = new XMLHttpRequest();
    http.open("DELETE", "/deletePost/", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        window.location.replace("/");
      }
    };
    var json = JSON.stringify(this.state.post);
    http.send(json);
  }

  render() {
    return this.renderContent();
  }
}

export default Article;
