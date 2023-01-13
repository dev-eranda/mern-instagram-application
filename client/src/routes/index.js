import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import NavBar from '../components/NavBar'
import Home from '../components/screens/Home'
import Signin from '../components/screens/Signin'
import Signup from '../components/screens/Signup'
import Profile from '../components/screens/Profile'

const route = () => (
    <BrowserRouter>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
    </BrowserRouter>
)

export default route;
