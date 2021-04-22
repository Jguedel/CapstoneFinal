import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../FireBase";
import { AuthContext } from "../Auth";
import "./Login.css";

const Login = () => {
  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  });

  const { currentUser } = useContext(AuthContext);
  const [Page, changePage] = useState(false);
  if (currentUser) {
    return <Redirect to="/Home" />;
  }
  if (Page != false) {
    return <Redirect to="/Signup" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email: <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          Password:{" "}
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
      <form onSubmit={changePage}>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Login;
