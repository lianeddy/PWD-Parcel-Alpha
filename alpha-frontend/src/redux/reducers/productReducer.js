import {
  API_PRODUCT_FAILED,
  API_PRODUCT_FILL,
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  FILTER_BY_PRICE,
  NULLIFY_ERROR,
  PRODUCT_BY_ID_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  productList: [],
  productById: {},
  loading: false,
  error: false,
  errorMessage: "",
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case API_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productById: action.payload,
        loading: false,
      };
    case API_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case API_PRODUCT_FILL:
      return {
        ...state,
        productList: [...action.payload],
        // loading : false
      };
    case FILTER_BY_PRICE:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
