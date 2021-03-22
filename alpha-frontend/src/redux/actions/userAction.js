import { API_USER_FAILED, API_USER_START, API_USER_SUCCESS, LOGOUT } from "../types";
import { api_url } from "../../helpers";
import Axios from "axios"

const url = api_url + "/users";

export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT,
    });
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
