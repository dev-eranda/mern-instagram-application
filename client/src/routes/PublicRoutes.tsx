import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootTypes } from "../types";

interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
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

  // if (isAuthenticated) {
  //   // const from = location.state?.from?.pathname || "/post";
  //   // return <Navigate to={from} replace />;
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return element;
};

export default PublicRoute;
