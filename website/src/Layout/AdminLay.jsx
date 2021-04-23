import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import Admin from "../Components/Pages/Admin/Admin"

const AdminLayout = (props) => {
  return (
    <div className="AdminLayout">
      <NavBar {...props} />
      <Admin {...props}/>
      <Footer />
    </div>
  );
};

export default AdminLayout;