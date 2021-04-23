import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Orders from "../Components/Pages/Orders/Orders";

const OrderLay = (props) => {
  return (
    <div>
      <NavBar {...props} />
      <Orders {...props} />
      <Footer />
    </div>
  );
};

export default OrderLay;
