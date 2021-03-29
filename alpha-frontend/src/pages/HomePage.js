import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Spinner,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import {  CardProduct  } from "../components";
import {
  fetchProductsAction,
  filterByPrice,
  filterByName,
} from "../redux/actions";
import jumbotron from "../assets/Jumbotron.jpg";
import style from "./page.module.css";
import { FcSearch } from "react-icons/fc";

class HomePage extends Component {
  state = {
    isOpen: false,
    idProduct: 0,
    isAvailable: false,
    isOpenAdd: false,
    isOpenEdit: false,
    productName: "",
    priceMax: 0,
    priceMin: 0,
  };
  componentDidMount() {
    const { fetchProductsAction } = this.props;
    fetchProductsAction();
  }

  // FILTER //
  onChangeSearch = (e) => {
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
  onClickSearch = () => {
    const { filterByName } = this.props;
    const { productName } = this.state;
    filterByName({ productName });
  };
  oncClickFilter = () => {
    const { filterByPrice } = this.props;
    const { priceMax, priceMin } = this.state;
    filterByPrice({ priceMax, priceMin });
  };
  // FILTER //

  // MODAL//
  toggle = (id) => {
    this.setState({ isOpen: !this.state.isOpen, idProduct: id });
  };
  // MODAL//

  renderCardProduct = () => {
    const { productList, roleID } = this.props;
    return productList.map((val, i) => {
      return (
        <div style={{ margin: 5 }} key={val.id}>
          <CardProduct
            nama={val.productName}
            caption={val.descripton}
            harga={val.price}
            stock={val.stock}
            index={val.id_product}
            imagepath={val.imagepath}
            roleID={roleID}
            id_product={val.id_product}
            cariIndex={()=>this.cariIndex(i)}
          />
        </div>
      );
    });
  };

  cariIndex = (index) => {
    this.setState({
      nasi : index 
    })
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
            <a href="/parcels">
              <Button
                style={{
                  marginTop: "20px",
                  backgroundColor: "#ff8ba7",
                  border: "none",
                }}
              >
                Select Parcels
              </Button>
            </a>
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
          <InputGroup>
            <InputGroupAddon addonType="prepend" className={style.inputGroup}>
              <Button
                onClick={this.onClickSearch}
                style={{ backgroundColor: "#ff8ba7", border: "none" }}
              >
                <FcSearch />
              </Button>
            </InputGroupAddon>
            <Input
              id="productName"
              placeholder="Search..."
              type="text"
              onChange={this.onChangeSearch}
            />
          </InputGroup>
          <h4>Filter by Price</h4>
          <div className={style.Input}>
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
              style={{
                marginLeft: 30,
                backgroundColor: "#ff8ba7",
                border: "none",
              }}
            >
              Go!
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="d-flex justif-content-center flex-column">
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
        <Button />
      </div>
    );
  }
}

const mapStatetoProps = ({ product, user }) => {
  return {
    loading: product.loading,
    productList: product.productList,
    error: product.error,
    verified: user.verified,
    roleID: user.roleID,
  };
};

export default connect(mapStatetoProps, {
  fetchProductsAction,
  filterByPrice,
  filterByName,
})(HomePage);
