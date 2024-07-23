import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
// import Post1 from "./components/screens/Home";
// import "./App.css"
// import Signin from "./components/screens/Signin";
// import Signup from "./components/screens/Signup";
// import Profile from "./components/screens/Profile";
// import CreatePost from "./components/screens/CreatePost";
// import { reducer, initialState } from "./reducers/userReducer";
// import login from "./hooks/useAuth";
import { login } from "./slices/authSlice";
import { useDispatch } from "react-redux";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Post from "./features/post/Post";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";

// export const UserContext = createContext();

const Routing = () => {
  // const { state, dispatch } = useContext(UserContext);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if (user) {
  //     dispatch({ type: "USER", payload: user }) /* user close browser without logged out and again open browser set state */
  //   }
  //   else {
  //     history.push('/signin')
  //   }
  // }, [])
};

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(login({ isAuthenticated: true, user: user }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />

        <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
        {/* Uncomment and update the following routes as needed 
      <Route path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
