import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  signin: () => {},
  signout: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const signin = (userData) => {
    setAuth(userData);
  };

  const signout = () => {
    setAuth(undefined);
  };

  const valueContext = {
    auth,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
