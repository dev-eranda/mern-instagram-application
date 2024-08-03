import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/auth"; // Adjust the import path

// Define the initial state with the AuthState type
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: {
    _id: null,
    name: null,
    email: null,
    roles: [],
  },
};

// Define the type for the payload in setAuthData action
interface SetAuthDataPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Create the slice with TypeScript
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<SetAuthDataPayload>) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
