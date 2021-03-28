import React, { Component } from "react";
import "../App.css";
import { api } from "../helpers";
import { connect } from "react-redux";
import { productById, addToCartAction, editCartAction } from "../redux/actions";
import swal from "sweetalert";
import image from "../assets/10.png";

class ProductDetail extends Component {
  state = {
    selectedQty: 1,
  };

  componentDidMount() {
    const { productById } = this.props;
    const id = this.props.match.params.id;
    console.log(`Mounted: ${id}`);
    productById(id);
  }

  increaseQty = () => {
    this.setState({
      selectedQty: this.state.selectedQty + 1,
    });
  };

  decreaseQty = () => {
    this.setState({
      selectedQty: this.state.selectedQty - 1,
    });
  };

  cartButton = () => {
    const {
      product,
      productCart,
      addToCartAction,
      editCartAction,
    } = this.props;
    console.log(product);
    const { selectedQty } = this.state;
    const { productName, price, stock, id_product } = product;
    console.log(productCart);
    const inCart = productCart.find((val) => val.id_product === id_product);
    if (!inCart) {
      let cartData = { id_product, price, productName, qty: selectedQty };
      addToCartAction(cartData);
      swal("Product added to cart.");
    } else {
      if (inCart.qty + selectedQty > stock) {
        swal("Quantity exceed available product.");
      } else {
        let cartData = {
          id_product: inCart.id_product,
          price: inCart.price,
          productName: inCart.productName,
          qty: inCart.qty + selectedQty,
        };
        cartData = JSON.stringify(cartData);
        editCartAction(cartData);
        console.log(`disini edit ${cartData}`);
        swal("Product added to cart(2)");
      }
    }
  };

  render() {
    const {
      productName,
      price,
      description,
      stock,
      imagepath,
    } = this.props.product;
    let available = stock;
    const { selectedQty } = this.state;
    console.log(productName);
    return (
      <div className="product-detail-container">
        <div className="image-detail">
          <img
            src={imagepath ? `${api}${imagepath}` : image}
            alt="img"
            style={{ width: "100%", height: "50%", objectFit: "cover" }}
          />
        </div>
        <div className="product-detail">
          <div className="product-title">
            <h2>{productName}</h2>
          </div>
          <div className="description-container">
            <h6>{description}</h6>
          </div>
          <div className="product-price">
            <h8>Rp {price.toLocaleString()}</h8>
          </div>
          <div className="product-action">
            <div className="add-to-cart">
              <button onClick={this.decreaseQty} disabled={selectedQty === 1}>
                -
              </button>
              <h6>{this.state.selectedQty}</h6>
              <button
                onClick={this.increaseQty}
                disabled={selectedQty === available}
              >
                +
              </button>
              <button onClick={this.cartButton}>Add to cart</button>
            </div>
            <div>
              <h10 style={{ textAlign: "left" }}>Available: {available}</h10>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user, product, cart }) => {
  return {
    product: product.productById,
    user: user.id,
    productCart: cart.productCart,
    parcelCart: cart.parcelCart,
  };
};

export default connect(mapStatetoProps, {
  productById,
  addToCartAction,
  editCartAction,
})(ProductDetail);
