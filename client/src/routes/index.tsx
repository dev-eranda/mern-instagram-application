import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import PostList from "../features/post/PostList";
import PostForm from "../features/post/PostForm";
import Profile from "../features/profile/Profile";
import Unauthorized from "../components/Unauthorized";
import NotFound from "../components/NotFound";
// import Layout from "../components/Layout";

import RequireAuth from "../components/RequireAuth";

const ROLES = {
  User: 2001,
  Admin: 5150,
  Editor: 1984,
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* <Route path="/" element={<Layout />} /> */}

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
      <Route path="/" element={<PostList />} />
      <Route path="/post" element={<PostForm />} />
      <Route path="/profile" element={<Profile />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
      <Route path="/admin" element={<PostList />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
      <Route path="/editor" element={<PostList />} />
    </Route>

    <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
      <Route path="/lounge" element={<PostList />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
