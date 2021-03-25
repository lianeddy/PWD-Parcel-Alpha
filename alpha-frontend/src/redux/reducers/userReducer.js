import {
  API_USER_FAILED,
  API_USER_START,
  API_USER_SUCCESS,
  LOGIN,
  LOGOUT,
} from "../types";

const INITIAL_STATE = {
  id: 0,
  username: "bayu",
  email: "",
  // alamat: "", address belum buat di database
  roleID: 0,
  verified: null,
  loading: false,
  error: false,
  errorMessage: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_USER_START:
      return {
        ...state,
        loading: true,
      };
    case API_USER_SUCCESS:
      return {
        ...action.payload,
        loading: false,
      };
    case API_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
