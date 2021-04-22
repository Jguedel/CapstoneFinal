import React, { useEffect, useState } from "react";
import app from "./FireBase";

//CONTEXT PASSES AUTHCONTEXT TO THE WHOLE TREE lIKE GLABAL VARIABLE
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log("user: " , user);
      setCurrentUser(user)
    });
  }, []);
  return (
    <AuthContext.Provider value={{currentUser }}> {children}</AuthContext.Provider>
  );
};