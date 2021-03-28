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
  LoginPage,
  VerificationPage,
  CartPage,
} from "./pages";
import {
  keepLoginAction,
  getParcelCart,
  getProductCart,
} from "./redux/actions";

// link color
// https://www.happyhues.co/palettes/15

class App extends Component {
  state = {};
  componentDidMount() {
    const {
      keepLoginAction,
      getParcelCart,
      getProductCart,
      user_id,
    } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      keepLoginAction();
      getParcelCart(user_id);
      getProductCart(user_id);
    }
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
        <Route path="/verify" component={VerificationPage} />
        <Route path="/cart" component={CartPage} />
      </div>
    );
  }
}

const mapStatetoProps = ({ user, cart }) => {
  return {
    user_id: user.id,
    parcelCart: cart.parcelCart,
    productCart: cart.productCart,
  };
};

export default connect(mapStatetoProps, {
  keepLoginAction,
  getParcelCart,
  getProductCart,
})(App);
