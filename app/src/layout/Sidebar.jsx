import React from "react";

class Sidebar extends React.Component {
  render() {
    const content = this.props.content;
    return (
      <div style={style}>
        <h5
          style={{
            textAlign: "center",
            backgroundColor: "var(--main-theme-color)",
            color: "white",
            padding: "10px"
          }}
        >
          {content.title}
        </h5>
        <div style={{ padding: "10px" }}>
          <p>{content.content}</p>
          <li>
            <a href="/">link to somewhere</a>
          </li>
        </div>
      </div>
    );
  }
}

const style = {
  backgroundColor: "white",
  padding: "0px",
  margin: "20px",
  textAlign: "left",
  boxShadow: "0 4px 6px -5px rgba(0,0,0,0.3)"
};
export default Sidebar;
