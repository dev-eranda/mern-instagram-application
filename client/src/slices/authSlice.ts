import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // isAuthenticated: false,
    // access_token: null,
    // refresh_token: null,
    user: {
      id: null,
      name: null,
      email: null,
    },
  },
  reducers: {
    login: (state, action) => {
      // state.isAuthenticated = true;
      // state.access_token = action.payload.accessToken;
      // state.refresh_token = action.payload.refreshToken;
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },

    refresh: (state, action) => {
      // state.access_token = action.payload.accessToken;
      // state.refresh_token = action.payload.refreshToken;
    },

    logout: (state, action) => {
      // state.isAuthenticated = false;
      // state.access_token = null;
      // state.refresh_token = null;
      state.user = {
        id: null,
        name: null,
        email: null,
      };
    },
  },
});

export const { login, logout, refresh } = authSlice.actions;
export default authSlice.reducer;
