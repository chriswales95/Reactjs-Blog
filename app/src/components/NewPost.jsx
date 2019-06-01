import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";

class NewPost extends React.Component {
  state = {};

  newPost = async event => {
    event.preventDefault();

    await axios
      .post("/new_blog/", {
        title: event.target.elements.title.value,
        content: event.target.elements.content.value
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = "/new_blog/";
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Header heading={"New Post"} />
        <div className={"row"}>
          <form
            style={{ width: "100%", margin: 0, padding: "50px" }}
            onSubmit={event => this.newPost(event)}
          >
            <input
              name="title"
              style={{
                marginBottom: "5px",
                width: "100%",
                height: "50px",
                fontSize: "37px",
                border: "none",
                backgroundColor: "white"
              }}
              type={"text"}
              placeholder={"Title"}
            />

            <textarea
              name="content"
              id="new_blog_ta"
              placeholder="Blog content in html"
              style={{ backgroundColor: "white" }}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default NewPost;
