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
      state.token = action.payload.userObj.token;
      state.user = {
        id: action.payload.userObj.user._id,
        name: action.payload.userObj.user.name,
        email: action.payload.userObj.user.email,
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
