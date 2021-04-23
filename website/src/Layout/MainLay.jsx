import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const MainLayout = (props) => {
  return (
    <div className="MainLayout">
      <NavBar {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
