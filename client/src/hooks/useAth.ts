import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";
import { RootState } from "../store";

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout(null));
  };

  return {
    isAuthenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;