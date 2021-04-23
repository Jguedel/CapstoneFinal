import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Product from "../Components/Pages/Products/Products2";

const RestroomLayout = (props) => {
  return (
    <div className="RestroomLayout">
      <NavBar {...props} />
      <Product {...props}/>
      <Footer />
    </div>
  ); 
};

export default RestroomLayout;