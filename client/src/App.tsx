import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./types";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Post from "./features/post/Post";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";

// const navigate = useNavigate();
// const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

// useEffect(() => {
//   if (isAuthenticated && token) {
//     navigate("/signin");
//   }
// }, [isAuthenticated, token]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
