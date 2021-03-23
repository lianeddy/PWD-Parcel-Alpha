import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Header } from "./components";
import {
  HomePage,
  AccountPage,
  ChangePassPage,
  ForgetPage,
  LoginPage,
  RegisterPage
} from "./pages";
import { keepLoginAction } from "./redux/actions";

class App extends Component {
  state = {};
  componentDidMount() {
    const { keepLoginAction } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      keepLoginAction();
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forget-password" component={ForgetPage} />
        <Route path="/change-password" component={ChangePassPage} />
      </div>
    );
  }
}


export default connect(null, {keepLoginAction}) (App);
