import React, {  useState } from "react";
import "../App.css";
import { registerAction } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handlerChange = (e) => {
    const { id, value } = e.target;
    setState({
      ...state,
      [id]: value,
    });
  };


  const handlerSubmit = () => {
    const { username, email, password } = state;
    if (state.password === state.confirmPassword) {
      dispatch(registerAction({ username, email, password }));
      // dispatch(keepLoginAction())
    } else {
      alert("Password Invalid");
    }
  };

  return (
    <div className="registerSection">
      <div className="registerContainer">
        <div className="registerHeader">
          <p>WANDERLUST</p>
        </div>
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
          <p>Masuk ke Big Box</p>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
