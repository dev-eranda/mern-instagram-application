import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../types";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: {
      id: null,
      name: null,
      email: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
