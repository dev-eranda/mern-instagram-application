import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },
  reducers: {
    createPost: (state, action) => {
      state.post = action.payload.post;
    },
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;