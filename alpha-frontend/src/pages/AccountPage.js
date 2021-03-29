import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
import style from "./page.module.css";

class AccountPage extends Component {
  state = {};

  render() {
    const { username, email,  address, roleID } = this.props;

    return (
      <div className={style.Appcontainer}>
        <h1 style={{ fontSize: "50px" }}>Account Information</h1>

        <div style={{ padding: 20 }}>
          <h2>
            Username : <Badge color="dark">{username}</Badge>
          </h2>
          <h2>
            Email :<Badge color="dark">{email}</Badge>
          </h2>
          <h2>
            Address :<Badge color="dark">{address}</Badge>
          </h2>
        </div>
        <div>
          {roleID === 2 ? (
            <a href="/forget-password">
              <Button>Change My Password Account ?</Button>
            </a>
          ) : (
            <div>
              <a href="/forget-password">
                <Button>Change My Password Account ?</Button>
              </a>
              <Link to="/admin-product">
                <Button> ALL PRODUCT</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => {
  return {
    username: user.username,
    email: user.email,
    address: user.address,
    roleID: user.roleID,
  };
};

export default connect(mapStatetoProps)(AccountPage);
