import React from "react";

class TokenWarning extends React.Component {
  render() {
    if (this.props.present === true) {
      return (
        <React.Fragment>
          <div
            class="alert alert-danger"
            role="alert"
            style={{ margin: "0px" }}
          >
            Your authorisation token has expired. Login again to renew.
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
export default TokenWarning;
