import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Cookies from "universal-cookie";
import Toolbar from "../layout/Toolbar";

const cookies = new Cookies();

class Article extends Component {
  state = { post: {} };
  buttons = [{ text: "delete", onClick: () => console.log("test") }];

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
              style={{ padding: "40px" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <Footer />
          </div>
        </div>
      );
    } else
      return (
        <div>
          <Header />
          <p>Post does not exist</p>
          <Footer />
        </div>
      );
  }

  render() {
    return this.renderContent();
  }
}

export default Article;
