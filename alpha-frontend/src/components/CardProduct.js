import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  // CardText,
} from "reactstrap";
import { api } from "../helpers";
import wander from "../assets/10.png";
import style from "./component.module.css";

class CardProduct extends Component {
  state = {};
  render() {
    const { nama, harga, stock, imagepath, index } = this.props;
    return (
      <div key={index} style={{ width: 270, height: "auto",marginLeft : 20, marginTop: 20, marginBottom: 20  }}>
        <Card>
          <CardImg
            src={imagepath ? `${api}${imagepath}` : wander}
            alt="ga keambil"
            className={style.imgcard}
          />
          <CardBody >
            <CardTitle tag="h4">{nama}</CardTitle>
            <CardSubtitle tag="h6">
              Rp.{harga} || Stock {stock}
            </CardSubtitle>
            <br />
            <a href={`/product/${index}`}>
              <Button style={{ backgroundColor: "#ff8ba7", border: "none" }}>
                Details
              </Button>
            </a>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default CardProduct;
