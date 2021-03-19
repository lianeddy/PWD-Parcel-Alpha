import React from "react";
import { Route } from "react-router-dom";
import { LandingPage, RegisterPage } from "./pages";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" component={RegisterPage} />
    </div>
  );
};

export default App;
