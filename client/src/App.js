import React, { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/NavBar";
// import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post1 from "./components/screens/Home";
// import Signin from "./components/screens/Signin";
// import Signup from "./components/screens/Signup";
// import Profile from "./components/screens/Profile";
// import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Post from "./features/post/Post";
// import Login from "./screens/login/view";

export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if (user) {
  //     dispatch({ type: "USER", payload: user }) /* user close browser without logged out and again open browser set state */
  //   }
  //   else {
  //     history.push('/signin')
  //   }
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Uncomment and update the following routes as needed */}
      {/* <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} /> */}
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {" "}
      {/* Access state and dispatch in all the routes */}
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routing /> {/* Access the history */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
