import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { productById, addToCartAction } from "../redux/actions";
import { Button } from "reactstrap";
import swal from "sweetalert";

class ProductDetail extends Component {
  state = {
    selectedQty: 1,
  };

  componentDidMount() {
    const { productById } = this.props;
    const id = this.props.match.params.id;
    console.log(id);
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
    const { product, productCart, addToCartAction } = this.props;
    const { selectedQty } = this.state;
    const { productName, price, stock, id } = product;
    console.log(productCart);
    const inCart = productCart.find((val) => val.id === id);
    if (!inCart) {
      const cartData = { id, productName, price, qty: selectedQty };
      addToCartAction(cartData);
      swal("Product added to cart.");
    } else {
      if (inCart.qty + selectedQty > stock) {
        swal("Quantity exceed available product.");
      } else {
        alert("haha");
      }
    }
  };

  render() {
    const {
      productName,
      price,
      description,
      stock,
      categoryID,
      imagepath,
    } = this.props.product;
    let available = stock;
    const { selectedQty } = this.state;

    return (
      <div>
        <div className="product-detail-container">
          <div className="image-detail">
            <div>Product Image</div>
          </div>
          <div className="product-detail">
            <div>
              <div className="product-title">
                <p>{productName}</p>
              </div>
              <div className="description-container">
                <p>{description}</p>
              </div>
            </div>
            <div className="product-price">
              <p>Rp {price}</p>
            </div>
            <p style={{ textAlign: "left" }}>Available: {available}</p>
            <div className="product-action">
              <div className="add-to-cart">
                <Button
                  color="info"
                  onClick={this.decreaseQty}
                  disabled={selectedQty === 1}
                >
                  -
                </Button>
                {this.state.selectedQty}
                <Button
                  color="info"
                  onClick={this.increaseQty}
                  disabled={selectedQty === available}
                >
                  +
                </Button>
                <Button color="info" onClick={this.cartButton}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ user, product, cart }) => {
  return {
    product: product.productList,
    user: user.id,
    productCart: cart.productCart,
    parcelCart: cart.parcelCart,
  };
};

export default connect(mapStatetoProps, { productById, addToCartAction })(
  ProductDetail
);
