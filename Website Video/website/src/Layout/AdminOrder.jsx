import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import OrdersAdmin from '../Components/Pages/Admin/OrdersAdmin';

const AdminOrder = (props) => {
  return (
    <div>
      <NavBar {...props} />
      <OrdersAdmin {...props}/>
      <Footer />
    </div>
  );
};

export default AdminOrder;