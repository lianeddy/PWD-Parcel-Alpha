import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Header } from "./components";
import {
  HomePage,
  ParcelOptions,
  ParcelPage,
  AccountPage,
  ChangePassPage,
  ForgetPage,
  LoginPage,
  RegisterPage,
  ProductDetail,
  AdminProduct,
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
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/forget-password" component={ForgetPage} />
        <Route path="/change-password" component={ChangePassPage} />
        <Route path="/parcels" component={ParcelPage} />
        <Route path="/parcel-options" component={ParcelOptions} />
        <Route path="/admin-product" component={AdminProduct} />
      </div>
    );
  }
}

export default connect(null, { keepLoginAction })(App);
