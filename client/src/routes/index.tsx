import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "../routes/PublicRoutes";
import ProtectedRoute from "../routes/ProtectedRoutes";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import PostList from "../features/post/PostList";
import PostForm from "../features/post/PostForm";
import Profile from "../features/profile/Profile";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<PublicRoute element={<Login />} />} />
    <Route path="/register" element={<PublicRoute element={<Register />} />} />
    <Route path="/" element={<ProtectedRoute element={<PostList />} />} />
    <Route path="/post" element={<ProtectedRoute element={<PostForm />} />} />
    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
  </Routes>
);

export default AppRoutes;
