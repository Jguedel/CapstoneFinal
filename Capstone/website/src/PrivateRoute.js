import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
 //USECONTEXT CALLS USEER CONTEXT CREATED FROM AUTH.JS
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      //IF WE HAVE USER SIGNED IN THEN
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          //IF USER NOT SIGNED IN
          <Redirect to={"/"} />
        )
      }
    />
  );
};


export default PrivateRoute