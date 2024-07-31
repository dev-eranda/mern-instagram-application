import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: null,
      email: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };
    },

    logout: (state, action) => {
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
