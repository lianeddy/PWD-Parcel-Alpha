import { LOGOUT } from '../types';


export const logoutAction = () => {
    return (dispatch) => {
      localStorage.removeItem("token");
      dispatch({
        type: LOGOUT,
      });
    };
  };