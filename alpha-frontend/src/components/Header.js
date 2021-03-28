import React, { Component } from "react";
import style from "./component.module.css";
import {
  // UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/actions";
import { connect } from "react-redux";
import { BsFillPersonFill, BsFillPersonLinesFill } from "react-icons/bs";
import { AiFillShopping } from "react-icons/ai";
// npm install react-icons

class Header extends Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  render() {
    const styleLink = {
      color: "inherit",
      textDecoration: "none",
    };

    const { username, logoutAction, id } = this.props;

    return (
      <div className={style.container}>
        {username ? (
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle color="none" style={styleLink} caret>
              <BsFillPersonLinesFill size={40} />
            </DropdownToggle>
            <DropdownMenu>
              <Link to="/account" style={styleLink}>
                <DropdownItem>Account</DropdownItem>
              </Link>
              <Link to="/history" style={styleLink}>
                <DropdownItem>History Trans</DropdownItem>
              </Link>
              <Link to="/" style={styleLink}>
                <DropdownItem onClick={logoutAction}>Logout</DropdownItem>
              </Link>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle color="none" style={styleLink} caret>
              {/* Dropdown Account */}
              <BsFillPersonFill size={40} />
            </DropdownToggle>
            <DropdownMenu>
              <Link to="/login" style={styleLink}>
                <DropdownItem>Login</DropdownItem>
              </Link>
              <Link to="/register" style={styleLink}>
                <DropdownItem>Register</DropdownItem>
              </Link>
            </DropdownMenu>
          </Dropdown>
        )}
        <div>
          <Link to="/" style={styleLink}>
            <h1 className={style.title}>Wanderlust</h1>
          </Link>
        </div>
        <Link to={id ? `/cart/${id}` : "/login"} style={styleLink}>
          <div>
            <AiFillShopping size={40} />
          </div>
          {/* <div>Icon Shop Cart</div> */}
        </Link>
      </div>
    );
  }
}

const mapStatetoProps = ({ user: { username, id } }) => {
  return {
    username,
    id,
  };
};

export default connect(mapStatetoProps, { logoutAction })(Header);
