import Axios from "axios";
import { api } from "../../helpers";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from "../types";

const url = api + "/user";

export const registerAction = (registerData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_START });
    try {
      const response = await Axios.post(`${url}/register`, registerData);
      const { id, username, email, token, roleID, verified } = response.data;
      localStorage.setItem("token", token);
      dispatch({
        type: AUTH_SUCCESS,
        payload: { id, username, email, roleID, verified },
      });
    } catch (err) {
      dispatch({ type: AUTH_FAILED, payload: err.response.data.error });
    }
  };
};
