import React from "react";
import { api } from "../helpers";
import style from "./component.module.css";
import { Button } from "reactstrap";
import { AiFillDelete } from "react-icons/ai";
const imagesrc =
  "https://i.pinimg.com/564x/48/59/41/485941384d255a96dda1235183204ed0.jpg";

const ParcelCart = ({
  imagepath,
  name,
  quantity,
  price,
  parcelID,
  changeParcelButton,
}) => {
  console.log(`${api}${imagepath}`);
  return (
    <div className={style.mainContainer}>
      <div className={style.cartWrapper}>
        <div className={style.image}>
          <img
            top
            width="100%"
            src={imagepath ? `${api}${imagepath}` : imagesrc}
            alt="img"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div style={{ justifySelf: "left" }}>
          <h6 style={{ padding: "5px", color: "#33272a" }}>{name}</h6>
        </div>
        <div className={style.description}>
          <div className={style.quantity}>
            <Button
              // onClick={() =>
              //   changeParcelButton({ quantity: quantity - 1, parcelID })
              // }
              style={{
                marginLeft: 30,
                backgroundColor: "#ff8ba7",
                border: "none",
              }}
            >
              -
            </Button>
            <h6 style={{ padding: "5px", color: "#33272a" }}>{quantity}</h6>
            <Button
              // onClick={() =>
              //   changeParcelButton({ quantity: quantity + 1, parcelID })
              // }
              style={{
                backgroundColor: "#ff8ba7",
                border: "none",
              }}
            >
              +
            </Button>
          </div>
          <div>
            <h6 style={{ padding: "5px" }}>Rp {price.toLocaleString()}</h6>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <AiFillDelete size={30} color="#ff8ba7" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelCart;
