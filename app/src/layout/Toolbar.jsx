import React from "react";

class Toolbar extends React.Component {
  render() {
    return (
      <div style={style}>
        {this.props.buttons.map(item => {
          return (
            <button
              type={"button"}
              key={item.text}
              onClick={() => item.onClick()}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    );
  }
}

const style = {
  padding: "10px 15px 10px 15px",
  backgroundColor: "#f7f7f9",
  textAlign: "left",
  marginBottom: "10px"
};

export default Toolbar;
