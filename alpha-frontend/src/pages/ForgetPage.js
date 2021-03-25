import React, { Component } from "react";
import { Button, Input, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { sendEmailChangeAction } from "../redux/actions";
import style from "./page.module.css"

class ForgetPage extends Component {
  state = {
    email: "",
  };
  render() {
    const { sendEmailChangeAction, loading } = this.props;
    return (
      <div className={style.container}>
        <div >
          <h3>Please input your email</h3>
        </div>
        <div >
          <Input
            type="text"
            id="email"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="my-2">
          <Button
            style={{ backgroundColor:"#ff8ba7", border: "none"}}
            onClick={() => sendEmailChangeAction({ email: this.state.email })}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Send Recovery Email"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user: { loading } }) => {
  return {
    loading,
  };
};

export default connect(mapStatetoProps, { sendEmailChangeAction })(ForgetPage);
