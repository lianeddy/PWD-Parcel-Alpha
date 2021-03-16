import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT } from "../types";

const INITIAL_STATE = {
  id: 0,
  username: "",
  email: "",
  roleID: 0,
  isLogin: false,
  isLoading: false,
  error: false,
  errorMessage: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...action.payload,
        isLogin: false,
        isLoading: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
