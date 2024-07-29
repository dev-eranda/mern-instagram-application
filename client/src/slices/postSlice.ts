import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";

interface PostState {
  post: Post[];
}

const initialState: PostState = {
  post: [],
};

export const likeAsync = createAsyncThunk(
  "post/likeAsync",
  async ({ postId, token }: { postId: string; token: string }) => {
    const response = await fetch("/post/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return (await response.json()) as Post;
  }
);

export const unlikeAsync = createAsyncThunk(
  "post/unlikeAsync",
  async ({ postId, token }: { postId: string; token: string }) => {
    const response = await fetch("/post/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return (await response.json()) as Post;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.post = action.payload.post;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeAsync.pending, () => {
        console.log("likeAsync.pending");
      })
      .addCase(likeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        );
      })
      .addCase(unlikeAsync.pending, () => {
        console.log("unlikeAsync.pending");
      })
      .addCase(unlikeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        );
      });
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
