import {
  API_USER_FAILED,
  API_USER_START,
  API_USER_SUCCESS,
  LOGOUT,
  // API_CHECK_USER,
  LOGIN,
} from "../types";
import { api_url } from "../../helpers";
import Axios from "axios";
import Swal from "sweetalert2";

// const url = api + "/user";
const url = api_url + "/users";
// beda variable

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
    localStorage.removeItem("state");
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
      const { id, username, email, roleID, verified } = response.data;
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
export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      const response = await Axios.post(`${url}/login`, data);
      const { id, username, email, roleID, verified, token } = response.data;
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

export const sendEmailChangeAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: API_USER_START });
    try {
      await Axios.post(`${url}/change-email`, data);
      Swal.fire({
        title: "Email Change Password has been sent, please check your email",
      });
      // alert(`Email ganti password telah dikirim ke ${data.email}`);
      dispatch({
        type: API_USER_SUCCESS,
      });
    } catch (err) {
      Swal.fire({
        title: "Email not registered",
      });
      dispatch({
        type: API_USER_FAILED,
        payload: err.message,
      });
    }
  };
};

// export const registerAction = (registerData) => {
//   return async (dispatch) => {
//     dispatch({ type: API_USER_START });
//     try {
//       const response = await Axios.post(`${url}/register`, registerData);
//       const { id, username, email, token, roleID, verified } = response.data;
//       localStorage.setItem("token", token);
//       dispatch({
//         type: API_USER_SUCCESS,
//         payload: { id, username, email, roleID, verified },
//       });
//     } catch (err) {
//       dispatch({ type: API_USER_FAILED, payload: err.response.data.error });
//     }
//   };
// };

// export const keepLoginAction = () => {
//   return async (dispatch) => {
//     dispatch({ type: API_USER_START });
//     try {
//       const token = localStorage.getItem("token");
//       const headers = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await Axios.post(`${url}/keep-login`, {}, headers);
//       const { id, username, email, roleID, verified } = response.data;
//       dispatch({
//         type: LOGIN,
//         payload: { id, username, email, roleID, verified },
//       });
//     } catch (err) {
//       dispatch({
//         type: API_USER_FAILED,
//         payload: err.message,
//       });
//     }
//   };
// };

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

// export const loginAction = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: API_USER_START });
//     try {
//       const response = await Axios.post(`${url}/login`, data);
//       const { id, username, email, roleID, verified, token } = response.data;
//       localStorage.setItem("token", token);
//       dispatch({
//         type: LOGIN,
//         payload: { id, username, email, roleID, verified },
//       });
//     } catch (err) {
//       dispatch({
//         type: API_USER_FAILED,
//         payload: err.message,
//       });
//     }
//   };
// };

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
      Swal.fire({
        icon: "success",
        title: "Change password succes",
        showConfirmButton: false,
        timer: 1500,
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
