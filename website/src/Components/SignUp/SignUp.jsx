import React, { Component } from "react";
import "./SignUp.scss";
import Buttons from "../Elements/Button/Button";
import Inputs from "../Elements/Inputs/Inputs";
import {
  auth,
  handleUserProfile,
} from "../../FireBase/FireBase";

const initialState = {
  email: "",
  password: "",
  conPass: "",
};

class SignUp extends Component {
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
    const { email, password, conPass} = this.state;
    if (password !== conPass) {
      alert("Passwords dont match. Please try again");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user);

      this.setState({
        ...initialState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password, conPass} = this.state;
    return (
      <div className="register">
        <h2>Register</h2>

        <div className="fromW">
          <form onSubmit={this.handleSubmit}>
            <div className="SignUp">
              <Inputs
                required
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              /><Inputs
                required
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <Inputs
                required
                type="password"
                name="conPass"
                value={conPass}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              <Buttons type="submit">Sign Up</Buttons>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
