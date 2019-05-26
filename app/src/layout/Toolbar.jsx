import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

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
  padding: "15px",
  backgroundColor: "#f7f7f9",
  textAlign: "left",
  marginBottom: "10px"
};

export default Toolbar;
