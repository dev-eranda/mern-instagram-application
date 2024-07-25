import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    hamberger: true,
  },
  reducers: {
    toggleSidebar: (state, action) => {
      console.log(action.payload);
      state.hamberger = action.payload;
    },
  },
});

export const { toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
