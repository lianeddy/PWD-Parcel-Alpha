import Axios from "axios";
import { api } from "../../helpers";
import {
  API_USER_START,
  API_USER_FAILED,
  API_USER_SUCCESS,
  LOGOUT,
  LOGIN,
} from "../types";

const url = api + "/user";
// const url = api_url + "/users";
// beda variable

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
      dispatch({ type: API_USER_FAILED, payload: err.response.data.error });
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

export const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await Axios.post(`${url}/keep-login`, {}, headers);
      const { id, username, email, alamat, roleID, verified } = response.data;
      dispatch({
        type: LOGIN,
        payload: { id, username, email, alamat, roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};
export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/login`, data);
      const {
        id,
        username,
        email,
        roleID,
        verified,
        token,
      } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: LOGIN,
        payload: { id, username, email,  roleID, verified },
      });
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

export const changePassAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    const headers = {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    try {
      await Axios.post(
        `${url}/change-pass`,
        { password: data.password },
        headers
      );
      alert("Password anda berhasil diganti");
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};
