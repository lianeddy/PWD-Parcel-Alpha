import React, {  useState } from "react";
import "../App.css";
import { registerAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { error, errorMessage } = useSelector((state) => state.user);

  const handlerChange = (e) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
    });
  };

  const handlerSubmit = () => {
    const { username, email, password, confirmPassword } = state;
    if (!username || !email || !password || !confirmPassword) {
      swal("Please fill all the forms.");
    } else if (password !== confirmPassword) {
      swal("Please reconfirm your password");
    } else if (password.length < 6) {
      swal(
        "Password has to be at least 6 characters, contains number and special character."
      );
    } else if (state.password === state.confirmPassword) {
      dispatch(registerAction({ username, email, password }));
      if (error) {
        console.log("error");
        swal(`${errorMessage}`);
      } else {
        swal("Email verification sent. Please verify your account.");
      }
    }
  };

  return (
    <div className="registerSection">
      <div className="registerContainer">
        <div className="registerForm">
          <div className="registerItem">
            <label>Username</label>
            <input
              className="registerInput"
              type="text"
              id="username"
              value={state.username}
              onChange={handlerChange}
            />
          </div>
          <div className="registerItem">
            <label>Email</label>
            <input
              className="registerInput"
              type="email"
              id="email"
              value={state.email}
              onChange={handlerChange}
            />
          </div>
          <div className="registerItem">
            <label>Password</label>
            <input
              className="registerInput"
              type="password"
              id="password"
              value={state.password}
              onChange={handlerChange}
            />
          </div>
          <div className="registerItem">
            <label>Repeat Password</label>
            <input
              className="registerInput"
              type="password"
              id="confirmPassword"
              value={state.confirmPassword}
              onChange={handlerChange}
            />
          </div>
          <div className="registerItem">
            {/* pakek href yaa */}
            <Link to="/">
              <button className="registerBtn" onClick={handlerSubmit}>
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="registerFooter">
          <p>Masuk ke Wanderlust</p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
