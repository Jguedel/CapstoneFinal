import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Product from "../Components/Pages/Products/Products2";

const OfficeLayout = (props) => {
  return (
    <div className="OfficeLayout">
      <NavBar {...props} />
      <Product {...props}/>
      <Footer />
    </div>
  ); 
};

export default OfficeLayout;