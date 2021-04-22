import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import Logo from "../../Images/logo.png";
import Cart from "../../Images/cart.png";

const NavBar = (props) => {
  const { currentUser, Roles } = props;

  return (
    <header className="NavBar">
      <div className="Wrap">
        <div className="Logo">
          <Link to="/">
            <img src={Logo} alt="That Brand's LOGO" />
          </Link>
        </div>
        <div className="Categories">
          <ul>
            <li>
              <Link to="/cleaning">Cleaning</Link>
            </li>
            <li>
              <Link to="/kitchen">Kitchen</Link>
            </li>
            <li>
              <Link to="/office">Office</Link>
            </li>
            <li>
              <Link to="/restroom">Restroom</Link>
            </li>
            <li>
              <Link to="/tech">Tech</Link>
            </li>
          </ul>
        </div>
        <div className="navigation">
          {/* IF USER SIGNED IN AS ADMIN*/}
          {currentUser && Roles === "admin" && (
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/cart">
                  <img src={Cart} alt="Cart Symbol" />
                </Link>
              </li>
            </ul>
          )}
          {/*IF USER SIGNED IN*/}
          {currentUser && Roles !== "admin" && (
            <ul>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/cart">
                  <img src={Cart} alt="Cart Symbol" />
                </Link>
              </li>
            </ul>
          )}
          {/*IF USER NOT SIGNED IN*/}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
