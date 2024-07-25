import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "./types";
import AppRoutes from "./routes";

function App() {
  // const navigate = useNavigate();
  // const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (isAuthenticated && token) {
  //     navigate("/post");
  //   }
  // }, [isAuthenticated, token]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
