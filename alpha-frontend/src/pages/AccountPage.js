import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import style from "./page.module.css";

class AccountPage extends Component {
  state = {};

  render() {
    const {
      username,
      email,
      password,
      address
    } = this.props;

    return (
      <div className={style.Appcontainer}>
        <h1 style={{fontSize:"50px"}}>Account Information</h1>

        <div style={{padding: 20}}>
          <h2>
            Username : <Badge color="dark">{username}</Badge>
          </h2>
          <h2>
            Email :<Badge color="dark">{email}</Badge>
          </h2>
          <h2>
            Password :<Badge color="dark">{password}</Badge>
          </h2>
          <h2>
            Address :<Badge color="dark">{address}</Badge>
          </h2>
        </div>
        <div>
          <Link to="/change-password">
            <Button>Change My Password Account ?</Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    username: user.username,
    email: user.email,
    address : user.address
  };
};

export default connect(mapStatetoProps)(AccountPage);
