import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Product from "../Components/Pages/Products/Products2";

const TechLayout = (props) => {
  return (
    <div className="TechLayout">
      <NavBar {...props} />
      <Product {...props}/>
      <Footer />
    </div>
  ); 
};

export default TechLayout;