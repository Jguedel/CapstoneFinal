import React, { Component } from "react";
import "./SignIn.scss";
import Buttons from "../Elements/Button/Button";
import Inputs from "../Elements/Inputs/Inputs";
import {
  auth,
  handleUserProfile,
} from "../../FireBase/FireBase";

const initialState = {
  email: "",
  password: "",
};
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      await handleUserProfile(user);
    } catch (error) {
      alert("Email or password incorrect")
      console.log(error);
    }
  };
  forgotPass = async (e) => {
    const { email } = this.state;
    await auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Please check your email...");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <h2>Login</h2>
        <div className="fromW">
          <form onSubmit={this.handleSubmit}>
            <div className="SignIn">
              <Inputs
                required
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <Inputs
                required
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <Buttons type="submit">Sign in</Buttons>
            </div>
          </form>
          <div className="row">
            <Buttons onClick={this.forgotPass}>Forgot Password</Buttons>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
