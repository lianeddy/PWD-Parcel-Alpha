import React, { Component } from "react";
import { connect } from "react-redux";
import { ParcelCart, ProductCart } from "../components";
import {
  keepLoginAction,
  getParcelCart,
  getProductCart,
  changeQuantityParcel,
  changeQuantityProduct,
} from "../redux/actions";

class CartPage extends Component {
  state = {};

  componentDidMount() {
    const { user_id, getParcelCart, getProductCart } = this.props;
    getParcelCart(user_id);
    getProductCart(user_id);
  }

  changeParcelButton = ({ quantity, parcelID }) => {
    const { changeQuantityParcel, user_id } = this.props;
    changeQuantityParcel({ quantity, parcelID, user_id });
  };
  changeProductButton = ({ quantity, productID }) => {
    const { changeQuantityProduct, user_id } = this.props;
    changeQuantityProduct({ quantity, productID, user_id });
  };

  renderParcels = () => {
    const { parcelCart } = this.props;
    return parcelCart.map((val) => {
      console.log(val.imagepath);
      return (
        <div>
          <ParcelCart
            parcelId={val.parcelId}
            name={val.parcelName}
            imagepath={val.imagepath}
            quantity={val.parcel_qty}
            price={val.parcelPrice}
            changeParcelButton={() =>
              this.changeParcelButton({
                quantity: val.qty,
                parcelID: val.parcelID,
              })
            }
          />
        </div>
      );
    });
  };

  renderProducts = () => {
    const { productCart } = this.props;
    return productCart.map((val) => {
      console.log(val.imagepath);
      return (
        <div>
          <ProductCart
            productID={val.productID}
            name={val.productName}
            imagepath={val.imagepath}
            quantity={val.product_qty}
            price={val.price}
            changeProductButton={() =>
              this.changeProductButton({
                quantity: val.qty,
                productID: val.productID,
              })
            }
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div>
          <h6
            style={{
              marginLeft: "220px",
              marginTop: "50px",
              fontSize: "20px",
              color: "#33272a",
            }}
          >
            Parcels
          </h6>
          {this.renderParcels()}
        </div>
        <div>
          <h6
            style={{
              marginLeft: "220px",
              marginTop: "50px",
              fontSize: "20px",
              color: "#33272a",
            }}
          >
            Products
          </h6>
          {this.renderProducts()}
        </div>
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
  getProductCart,
  getParcelCart,
  changeQuantityParcel,
  changeQuantityProduct,
})(CartPage);
