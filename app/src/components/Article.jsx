import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

class Article extends Component {
  state = { post: {} };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`/posts/${id}/`)
      .then(res => res.json())
      .then(post => {
        this.setState({ post });
      });
  }

  renderContent() {
    var post = this.state.post;

    if (post.title) {
      return (
        <div>
          {" "}
          <div
            style={{ maxWidth: "auto", textAlign: "centre" }}
            key={post.title}
          >
            <Header heading={post.title} />
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
