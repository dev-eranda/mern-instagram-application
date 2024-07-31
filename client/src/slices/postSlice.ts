import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";
import axiosInstance from "../axios/axiosInstance ";

interface PostState {
  post: Post[];
  loading: boolean;
}

const initialState: PostState = {
  post: [],
  loading: false,
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

    return await response.json();
  },
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

    return await response.json();
  },
);

export const commentAsync = createAsyncThunk(
  "post/commentAsync",
  async ({ postId, token, text }: { postId: string; token: string; text: string }) => {
    const response = await axiosInstance.put("/post/comment", {
      body: JSON.stringify({ postId, text }),
    });

    return response.data;
  },
);

export const getPostsAsync = createAsyncThunk("post/getPostAsync", async () => {
  const response = await axiosInstance.get("/post");
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        console.log("getPostsAsync.pending");
        state.loading = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.loading = false;
      })

      .addCase(likeAsync.pending, (state) => {
        console.log("likeAsync.pending");
        state.loading = true;
      })
      .addCase(likeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post,
        );
        state.loading = false;
      })

      .addCase(unlikeAsync.pending, () => {
        console.log("unlikeAsync.pending");
      })
      .addCase(unlikeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post,
        );
      })

      .addCase(commentAsync.pending, () => {
        console.log("commentAsync.pending");
      })
      .addCase(commentAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post,
        );
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
