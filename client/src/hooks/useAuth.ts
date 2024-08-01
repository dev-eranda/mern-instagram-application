import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";
import { RootTypes } from "../types";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootTypes) => state.auth);

  const handleLogin = (userData: object) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout(null));
  };

  return {
    user,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
