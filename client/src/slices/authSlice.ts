import { createSlice } from "@reduxjs/toolkit";

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
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },

    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = {
        id: null,
        name: null,
        email: null,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
