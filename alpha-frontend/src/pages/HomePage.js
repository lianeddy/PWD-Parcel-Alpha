import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Spinner, Button } from "reactstrap";
import { CardProduct } from "../components";
import { fetchProductsAction, filterByPrice } from "../redux/actions";
import jumbotron from "../assets/Jumbotron.jpg";
import style from "./page.module.css";

class HomePage extends Component {
  state = {
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
    isOpenAdd: false,
    isOpenEdit: false,
    searchTerm: "",
    priceMax: 0,
    priceMin: 0,
  };
  componentDidMount() {
    const { fetchProductsAction } = this.props;
    fetchProductsAction();
  }

  onChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onChangeMin = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onChangeMax = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  oncClickFilter = () => {
    const { filterByPrice } = this.props;
    const { priceMax, priceMin } = this.state;
    filterByPrice({ priceMax, priceMin });
  };

  renderCardProduct = () => {
    const { productList } = this.props;
    return productList
      .filter((x) => {
        if (this.state.searchTerm === "") {
          return x;
        } else if (
          x.productName
            .toLowerCase()
            .includes(this.state.searchTerm.toLocaleLowerCase())
        ) {
          return x;
        }
        return (x = "");
      })
      .map((val) => {
        return (
          <div style={{ margin: 5 }} key={val.id}>
            <CardProduct
              nama={val.productName}
              caption={val.descripton}
              harga={val.price}
              stock={val.stock}
              index={val.id_product}
              imagepath={val.imagepath}
            />
          </div>
        );
      });
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <div
          style={{
            marginTop: 50,
            marginBottom: 50,
            justifyContent: "space-between",
            display: "flex",
            marginRight: 150,
            marginLeft: 150,
          }}
        >
          <div className={style.headlineJumbotron}>
            <h1 className={style.headJumbotron}>Wanderlust</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incidi
            </p>
          </div>
          <div>
            <img
              src={jumbotron}
              className={style.jumbotronImg}
              alt="jumbotron"
            ></img>
          </div>
        </div>
        <div className={style.featureProduct}>
          <h1>Find Our Product</h1>
          <Input
            id="searchTerm"
            placeholder="Search..."
            type="text"
            onChange={this.onChangeInput}
            className={style.Input}
          />
          <h4>Filter by Price</h4>
          <div className={style.Input}>
            {/* <h1>Filter by Price</h1> */}
            <Input
              id="priceMax"
              placeholder="Price-max"
              onChange={this.onChangeMax}
            />
            <Input
              id="priceMin"
              placeholder="Price-min"
              onChange={this.onChangeMin}
            />
            <Button
              onClick={this.oncClickFilter}
              style={{ marginLeft: 30, backgroundColor: "#ff8ba7", border: "none" }}
            >
              Go!
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="d-flex justif-content-center align-items-center flex-column">
            <Spinner />
          </div>
        ) : (
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{
              borderRadius: 20,
              margin: 100,
              marginTop: 100,
            }}
          >
            {this.renderCardProduct()}
          </div>
        )}
      </div>
    );
  }
}
// animate__fadeInUp

const mapStatetoProps = ({ product, user }) => {
  return {
    loading: product.loading,
    productList: product.productList,
    error: product.error,
    verified: user.verified,
  };
};

export default connect(mapStatetoProps, { fetchProductsAction, filterByPrice })(
  HomePage
);
