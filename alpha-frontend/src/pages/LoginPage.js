import React, { Component } from "react";
import { Input, Spinner, Button } from "reactstrap";
import { connect } from "react-redux";
import { loginAction } from "../redux/actions";
import { Link, Redirect } from "react-router-dom";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const { loading, username, loginAction } = this.props;
    if (username) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="my-2">
          <Input
            placeholder="Username"
            type="text"
            id="username"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Input
            placeholder="Password"
            type="password"
            id="password"
            onChange={this.onChangeInput}
          />
        </div>
        <div className="my-2">
          <Button onClick={() => loginAction(this.state)} disabled={loading}>
            {loading ? <Spinner /> : "Login"}
          </Button>
        </div>
        <Link to="/forget-password">Forget Password</Link>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    username: user.username,
    loading: user.loading,
  };
};

export default connect(mapStatetoProps, { loginAction })(LoginPage);
