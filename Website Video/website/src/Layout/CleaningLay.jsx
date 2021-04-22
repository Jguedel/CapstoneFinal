import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Product from "../Components/Pages/Products/Products2";

const CleaningLayout = (props) => {
  return (
    <div className="CleaningLayout">
      <NavBar {...props} />
      <Product {...props}/>
      <Footer />
    </div>
  ); 
};

export default CleaningLayout;