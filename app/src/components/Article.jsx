import React, { Component } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Heading from "../layout/Heading";

class Article extends Component {
  state = { post: {} };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`/posts/${id}/`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
  }

  renderContent() {
    if (
      Object.entries(this.state.post).length === 0 &&
      this.state.post.constructor === Object
    ) {
      return <p>Blog does not exist sadly</p>;
    } else {
      return (
        <div>
          {" "}
          {Object.keys(this.state.post).map(p => (
            <div
              style={{ maxWidth: "auto", textAlign: "centre" }}
              key={this.state.post[p].title}
            >
              <Heading heading={this.state.post[p].title} />
              <div
                style={{ padding: "10px" }}
                dangerouslySetInnerHTML={{ __html: this.state.post[p].content }}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

export default Article;
