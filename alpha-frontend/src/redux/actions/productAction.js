import Axios from "axios";
import { api } from "../../helpers";
import {
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  API_PRODUCT_FAILED,
  PRODUCT_BY_ID_SUCCESS,
  API_PRODUCT_FILL,
  FILTER_BY_PRICE,
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

export const fetchProductsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const res = await Axios.get(url);
      dispatch({
        type: API_PRODUCT_FILL,
        payload: res.data,
      });
      // console.log(res.data);
      dispatch({
        type: API_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const filterByPrice = (query) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios({
        method: "get",
        url: `${url}?priceMax=${query.priceMax}&&priceMin=${query.priceMin}`,
      });
      dispatch({
        type: FILTER_BY_PRICE,
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
