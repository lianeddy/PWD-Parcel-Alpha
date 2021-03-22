import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Header } from "./components";
import {
  HomePage,
  AccountPage,
  ChangePassPage,
  ProductDetail,
  RegisterPage,
  LoginPage
} from "./pages";
import { keepLoginAction } from "./redux/actions";

// link color
// https://www.happyhues.co/palettes/15

class App extends Component {
  state = {};
  componentDidMount() {
    const { keepLoginAction } = this.props;
    const token = localStorage.getItem("token");
    if (token) {keepLoginAction()};
  }
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/change-password" component={ChangePassPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product/:id" component={ProductDetail} />
      </div>
    );
  }
}

export default connect(null, {keepLoginAction}) (App);
