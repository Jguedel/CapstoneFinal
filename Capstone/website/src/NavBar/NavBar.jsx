import React, { useState } from "react";
import { Redirect } from "react-router";
import './NavBar.css';

const NavBar = () => {
  //CREATING HOVER EFFECT
  function changeBackground(e) {
    e.target.style.background = 'green';
  }
  //DISABLE HOVER
  function changeBackgroundBack(e) {
    e.target.style.background = 'grey';
  }
  //CHANGE PAGES
  const [Page, pageCh] = useState(0);
  if (Page == 1) {
    return <Redirect to="/" />;
  }
  else if (Page == 2){
    return <Redirect to="/Tech" />;
  }
  return (
    <div className="nav">
          <label className = 'nav' onClick={() => pageCh(1)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Home</label>
          <label className = 'nav' onClick={() => pageCh(2)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Tech</label>
          <label className = 'nav' onClick={() => pageCh(0)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Cleaning</label>
          <label className = 'nav' onClick={() => pageCh(0)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Kitchen</label>
          <label className = 'nav' onClick={() => pageCh(0)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Clothing</label>
          <label className = 'nav' onClick={() => pageCh(0)} onMouseOver={changeBackground} onMouseLeave={changeBackgroundBack}>Profile</label>
    </div>
  );
};
export default NavBar;
