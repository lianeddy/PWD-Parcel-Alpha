import Axios from "axios";
import { api } from "../../helpers";
import {
  ADD_TO_CART_SUCCESS,
  CART_FAILED,
  CART_START,
  EDIT_TO_CART_SUCCESS,
  PARCEL_CART_SUCCESS,
  PRODUCT_CART_SUCCESS,
} from "../types";

const url = api + "/cart";

export const getParcelCart = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CART_START });
      const response = await Axios.get(`${url}/parcels/${user_id}`);
      dispatch({ type: PARCEL_CART_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: CART_FAILED, payload: err.message });
    }
  };
};

export const getProductCart = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CART_START });
      const response = await Axios.get(`${url}/products/${user_id}`);
      dispatch({ type: PRODUCT_CART_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: CART_FAILED, payload: err.message });
    }
  };
};

export const changeQuantityParcel = ({ quantity, parcelID, user_id }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CART_START });
      await Axios.patch(`${url}/parcels`, quantity, {
        params: { user_id, parcelID },
      });
      dispatch(getParcelCart(user_id));
    } catch (err) {
      dispatch({ type: CART_FAILED, payload: err.message });
    }
  };
};

export const changeQuantityProduct = ({ quantity, productID, user_id }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CART_START });
      await Axios.patch(`${url}/products/${productID}`, quantity);
      dispatch(getProductCart(user_id));
    } catch (err) {
      dispatch({ type: CART_FAILED, payload: err.message });
    }
  };
};

export const addToCartAction = (data) => {
  return async (dispatch) => {
    try {
      // loading star
      // dispatch({
      //   type: ADD_TO_CART_SUCCESS,
      //   payload: data,
      // });
      await axios.post(`${url}`, data);
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: data,
      });
    } catch (err) {
      // FAILED
      // dispatch({
      //   type: ADD_TO_CART_SUCCESS,
      //   payload: data,
      // });
    }
  };
};

export const getCartAction = (user_id) => {
  return async (dispatch) => {
    try {
      // loading star
      // dispatch({
      //   type: ADD_TO_CART_SUCCESS,
      //   payload: data,
      // });
      const response = await axios.get(`${url}/${user_id}`);
      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response,
      });
    } catch (err) {
      // FAILED
      // dispatch({
      //   type: ADD_TO_CART_SUCCESS,
      //   payload: data,
      // });
    }
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

// export const getCartAction = (user_id) => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: CART_START,
//       });
//       const response = await Axios.get(`${url}/${user_id}`);
//       dispatch({ type: CART_SUCCESS, payload: [...response.data] });
//     } catch (error) {
//       dispatch({ type: CART_FAILED, payload: error.message });
//     }
//   };
// };
