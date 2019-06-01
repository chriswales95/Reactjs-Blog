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
  marginBottom: "10px",
  boxShadow: "0 4px 6px -5px rgba(0, 0, 0, 0.3)"
};

export default Toolbar;
