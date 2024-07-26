import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    hamburger: true,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.hamburger = action.payload;
    },
  },
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
