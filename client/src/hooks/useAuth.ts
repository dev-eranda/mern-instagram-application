import { useSelector, useDispatch } from "react-redux";
import { login, logout, refresh } from "../slices/authSlice";
import { RootTypes } from "../types";

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, access_token, refresh_token, user } = useSelector(
    (state: RootTypes) => state.auth
  );

  const handleLogin = (userData: any) => {
    dispatch(login(userData));
  };

  const handleRefresh = (tokens: {
    access_token: string;
    refresh_token: string;
  }) => {
    dispatch(refresh(tokens));
  };

  const handleLogout = () => {
    dispatch(logout(null));
  };

  return {
    isAuthenticated,
    access_token,
    refresh_token,
    user,
    login: handleLogin,
    refresh: handleRefresh,
    logout: handleLogout,
  };
};

export default useAuth;
