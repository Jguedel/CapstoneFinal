import React, { useCallback, useState, useContext } from "react";
import { Redirect } from "react-router";
import app from "../FireBase";
import { AuthContext } from "../Auth";
import "./Signup.css";

const SignUp = () => {
  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
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
    return <Redirect to="/Home" />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp} className="first">
        <label>
          Email: <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          Password:{" "}
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={changePage}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignUp;
