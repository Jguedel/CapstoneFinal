import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../Elements/Button/Button";
import { auth } from "../../FireBase/FireBase";

const UserInfo = (props) => {
  const { Email} = props;

  function forgotPass() {
    auth
      .sendPasswordResetEmail(Email)
      .then(function () {
        alert("Please check your email...");
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  return (
    <div className="login">
      <h2>Profile Page</h2>
      <div className="UserInfo">
        <p>Email: {Email}</p>
      </div>
      <div className="fromW">
        <Buttons onClick={forgotPass}>Change Password</Buttons>
        <Link to="/myOrders">
          <Buttons>My Orders</Buttons>
        </Link>
        <Buttons onClick={() => auth.signOut()}>Sign Out</Buttons>
      </div>
    </div>
  );
};

export default UserInfo;
