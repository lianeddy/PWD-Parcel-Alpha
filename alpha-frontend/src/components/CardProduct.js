import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { api } from "../helpers";
import wander from "../assets/10.png";
import style from "./component.module.css";
import { Link } from "react-router-dom";
// import { EditModal, DeleteModal, AddModal, DetailModal } from ".";

class CardProduct extends Component {
  state = {};

  deleteData = () => {};

  cariIndex = (index) => {
    console.log(index);
  };

  render() {
    const {
      nama,
      harga,
      stock,
      imagepath,
      index,
      // roleID,
      // id_product,
      cariIndex,
    } = this.props;

    console.log(cariIndex);

    return (
      <div>
        <div
          key={index}
          style={{
            width: 270,
            height: "auto",
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Card>
            <CardImg
              src={imagepath ? `${api}${imagepath}` : wander}
              alt="ga keambil"
              className={style.imgcard}
            />
            <CardBody>
              <CardTitle tag="h4">{nama}</CardTitle>
              <CardSubtitle tag="h6">
                Rp.{harga} || Stock {stock}
              </CardSubtitle>
              <br />
              {/* <a href={`/product/${index}`}> */}
              <Link to={`/product/${index}`}>
                <Button style={{ backgroundColor: "#ff8ba7", border: "none" }}>
                  Details
                </Button>
              </Link>
              {/* </a> */}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default CardProduct;
