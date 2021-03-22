import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import style from "./page.module.css";
import { connect } from "react-redux";
import { changePassAction } from "../redux/actions";

class ChangePassPage extends Component {
  state = {
    password: "",
    confiirmPassword: "",
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onClickChangePass =() => {
    const {changePassAction} = this.props
    const {password} = this.state
    const token = new URLSearchParams(this.props.location.search).get("token")
    changePassAction({password, token})
  }

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <div className={style.container}>
        <h2 style={{ fontSize: 40 }}>Change My Password</h2>
        <div>
          <Input placeholder="password" onChange={this.onChangeInput}/>
          <Input placeholder="confirm password" onChange={this.onChangeInput}/>
        </div>
        <Button onClick={
          password && confirmPassword ? 
          this.onClickChangePass : () => alert("Password should be same")
        }>Confirm</Button>
      </div>
    );
  }
}

export default connect(null, { changePassAction })(ChangePassPage);
