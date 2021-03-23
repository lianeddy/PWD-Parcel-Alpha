import swal from "sweetalert";
import { ADD_TO_CART_SUCCESS, EDIT_TO_CART_SUCCESS } from "../types";

export const addToCartAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data,
    });
  };
};

export const editCartAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_TO_CART_SUCCESS,
      payload: data,
    });
  };
};
