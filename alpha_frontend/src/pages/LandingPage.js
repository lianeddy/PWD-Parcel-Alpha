import React from "react";
import { useHistory } from "react-router";

const LandingPage = () => {
  const history = useHistory();
  const toRegister = () => history.push("/register");
  return (
    <div>
      <div>
        <button onClick={toRegister}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
