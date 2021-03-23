import React, { Component } from "react";
import { verifyEmailAction } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class VerificationPage extends Component {
  state = {};

  componentDidMount() {
    const { verifyEmailAction } = this.props;
    const username = new URLSearchParams(this.props.location.search).get(
      "username"
    );
    const password = new URLSearchParams(this.props.location.search).get(
      "password"
    );
    console.log({ username, password });
    if (username && password) {
      verifyEmailAction({ username, password });
    }
  }

  render() {
    const { verified } = this.props;
    if (verified === 1) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h5>Verification Page</h5>
      </div>
    );
  }
}

const mapStatetoProps = ({ user: { verified } }) => {
  return {
    verified,
  };
};

export default connect(mapStatetoProps, { verifyEmailAction })(
  VerificationPage
);
