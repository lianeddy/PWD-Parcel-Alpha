import {
  API_PRODUCT_FAILED,
  API_PRODUCT_FILL,
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  FILTER_BY_PRICE,
  LOAD_DATA,
  NULLIFY_ERROR,
  PRODUCT_BY_ID_SUCCESS,
  SORT_BY_ALPHABET,
  SORT_BY_PRICE,
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
        productList: action.payload,
        // loading : false
      };
    case SORT_BY_ALPHABET:
      //sort alphabetically
      return state;
    case SORT_BY_PRICE:
      //sort by price
      return state;
    case FILTER_BY_PRICE:
      //filter by price
      return {
        ...state,
        productList : action.payload,
        loading : false
      };
    case LOAD_DATA:
      //load data
      return state;
    case NULLIFY_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
