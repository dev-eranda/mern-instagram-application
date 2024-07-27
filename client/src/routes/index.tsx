import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "../routes/PublicRoutes";
import ProtectedRoute from "../routes/ProtectedRoutes";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import PostList from "../features/post/PostList";
import PostForm from "../features/post/PostForm";

export default () => (
  <Routes>
    <Route path="/login" element={<PublicRoute element={<Login />} />} />
    <Route path="/register" element={<PublicRoute element={<Register />} />} />
    <Route path="/" element={<ProtectedRoute element={<PostList />} />} />
    <Route path="/post" element={<ProtectedRoute element={<PostForm />} />} />
  </Routes>
);

// <BrowserRouter basename="/annex">
//   <Route path="/" exact component={View} />
//   <Route path="/login" exact component={Login} />
//   <Route path="/register" exact component={ClientRegister} />
//   <Route path="/dashboard" exact component={Dashboard} />
// </BrowserRouter>
