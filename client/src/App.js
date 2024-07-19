import React, { useEffect, createContext, useReducer, useContext } from 'react'
import NavBar from './components/NavBar'
// import "./App.css"
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import { reducer, initialState } from './reducers/userReducer'

import { Login } from './screens/login'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)

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
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/signin"><Signin /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/profile"><Profile /></Route>
      <Route path="/createpost"><CreatePost /></Route>
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}> {/* Access state and dispatch in all the routes */}
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routing />  {/* Access the history */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App