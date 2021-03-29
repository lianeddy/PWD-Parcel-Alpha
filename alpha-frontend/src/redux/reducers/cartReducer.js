import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  CART_FAILED,
  CART_START,
  PARCEL_CART_SUCCESS,
  EDIT_TO_CART_SUCCESS,
  PRODUCT_CART_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  cartList: [],
  productCart: [],
  loading: false,
  error: false,
  errorMessage: "",
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_START:
      return {
        ...state,
        loading: true,
      };
    case PARCEL_CART_SUCCESS:
      return {
        ...state,
        parcelCart: action.payload,
        loading: false,
      };
    case PRODUCT_CART_SUCCESS:
      return {
        ...state,
        productCart: action.payload,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        productCart: [action.payload],
      };
    case EDIT_TO_CART_SUCCESS:
      return {
        ...state,
        productCart: [action.payload],
      };
    case CART_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
