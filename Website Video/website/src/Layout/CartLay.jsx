import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Cart from '../Components/Pages/Cart/Cart'

const CartLayout = (props) => {
  return (
    <div className="CartLayout">
      <NavBar {...props} />
      <Cart {...props}/>
      <Footer />
    </div>
  );
};

export default CartLayout;