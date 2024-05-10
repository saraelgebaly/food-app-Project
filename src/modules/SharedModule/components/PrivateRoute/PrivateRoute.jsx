import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";

export default function PrivateRoute({children }) {
  let {loginData} = useContext(AuthContext)
  if (loginData?.userGroup == "SuperAdmin") return children;
  else return <Navigate to="/dashboard" />;
}