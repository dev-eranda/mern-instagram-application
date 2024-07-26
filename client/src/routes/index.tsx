import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "../routes/PublicRoutes";
import ProtectedRoute from "../routes/ProtectedRoutes";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Post from "../features/post/Post";
import CreatePost from "../features/post/CreatePost";

export default () => (
  <Routes>
    <Route path="/login" element={<PublicRoute element={<Login />} />} />
    <Route path="/register" element={<PublicRoute element={<Register />} />} />
    <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
    <Route path="/createpost" element={<ProtectedRoute element={<CreatePost />} />} />
  </Routes>
);

// <BrowserRouter basename="/annex">
//   <Route path="/" exact component={View} />
//   <Route path="/login" exact component={Login} />
//   <Route path="/register" exact component={ClientRegister} />
//   <Route path="/dashboard" exact component={Dashboard} />
// </BrowserRouter>
