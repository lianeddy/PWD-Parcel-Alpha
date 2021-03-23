import Axios from "axios";
import { api } from "../../helpers";
import {
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  API_PRODUCT_FAILED,
  PRODUCT_BY_ID_SUCCESS,
} from "../types";

const url = api + "/products";

export const fetchProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios.get(url);
      dispatch({ type: API_PRODUCT_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const productById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios.get(`${url}/${id}`);
      dispatch({
        type: PRODUCT_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};
