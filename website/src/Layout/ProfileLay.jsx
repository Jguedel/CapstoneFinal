import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Profile from '../Components/Pages/Profile/Profile'

const ProfileLayout = (props) => {
  return (
    <div className="ProfileLayout">
      <NavBar {...props} />
      <Profile {...props}/>
      <Footer />
    </div>
  );
};

export default ProfileLayout;