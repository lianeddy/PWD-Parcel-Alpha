import { ADD_TO_CART, ADD_TO_CART_SUCCESS } from "../types";

const INITIAL_STATE = {
  parcelCart: [],
  productCart: [],
  loading: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        productCart: action.payload,
      };
    default:
      return state;
  }
};
