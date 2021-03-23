import Axios from "axios";
import { api } from "../../helpers";
import {
  API_USER_START,
  API_USER_FAILED,
  API_USER_SUCCESS,
  LOGOUT,
  API_CHECK_USER,
  LOGIN,
} from "../types";

const url = api + "/user";

export const getUserAction = (email) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.get(`${url}`, email);
      dispatch({ type: API_USER_SUCCESS, payload: response });
    } catch (err) {
      dispatch({ type: API_USER_FAILED, payload: err.message });
    }
  };
};

export const registerAction = (registerData) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/register`, registerData);
      const { id, username, email, token, roleID, verified } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: API_USER_SUCCESS,
        payload: { id, username, email, roleID, verified },
      });
    } catch (err) {
      dispatch({ type: API_USER_FAILED, payload: err.message });
    }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT,
    });
  };
};

export const verifyEmailAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: API_USER_START,
    });
    try {
      const response = await Axios.post(`${url}/email-verification`, data);
      const { id, username, email, roleID, token, verified } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email, roleID, verified },
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};
