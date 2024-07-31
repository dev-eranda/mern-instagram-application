import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootTypes } from "../types";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // const isAuthenticated = useSelector(
  //   (state: RootTypes) => state.auth.isAuthenticated
  // );

  // const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
  // const location = useLocation();

  // useEffect(() => {
  //   const auth = localStorage.getItem("isAuth");
  //   setIsAuthenticated(auth);
  // }, []);

  // console.log(isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return element;
};

export default ProtectedRoute;
