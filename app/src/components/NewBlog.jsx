import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";

class NewBlog extends React.Component {
  state = {};

  postNewBlog = async event => {
    event.preventDefault();

    await axios
      .post("/new_blog/", {
        title: event.target.elements.title.value,
        content: event.target.elements.content.value
      })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    return (
      <div>
        <Header heading={"New Post"} />
        <div style={{ padding: "30px" }}>
          <form onSubmit={event => this.postNewBlog(event)}>
            <input
              name="title"
              style={{
                marginBottom: "5px",
                width: "100%",
                height: "50px",
                fontSize: "40px",
                border: "none",
                backgroundColor: "rgb(241, 241, 241)"
              }}
              type={"text"}
              placeholder={"Title"}
            />

            <textarea
              name="content"
              id="new_blog_ta"
              placeholder="Blog content in html"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NewBlog;
