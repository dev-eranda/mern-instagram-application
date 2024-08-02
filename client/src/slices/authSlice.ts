import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance ";

export const getUserAsync = createAsyncThunk("user/getUserAsync", async () => {
  const response = await axiosInstance.get("/user");

  return response.data;
});

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
        id: action.payload,
        name: action.payload,
        email: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, () => {
        console.log("getUserAsync.pending");
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = {
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
        };
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
