import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./Signup/Signup";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Tech from"./Tech/Tech";
import Product from './techProduct/Product'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          {/*PRIVATEROUTE IS FOR ONLY SIGNED IN USERS
             ROUTE CAN ONLY BE ACCESSED BY USERS NOT SIGNED IN*/}
          <PrivateRoute exact path="/Home" component={Home} />
          <PrivateRoute exact path="/Tech" component={Tech}/>
          <PrivateRoute exact path="/Product" component={Product}/>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;