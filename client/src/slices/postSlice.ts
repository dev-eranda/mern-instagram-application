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

export const getPostsAsync = createAsyncThunk("post/getPostAsync", async () => {
  const response = await axiosInstance.get("/post");

  return response.data.post;
});

export const likeAsync = createAsyncThunk(
  "post/likeAsync",
  async ({ postId }: { postId: string }) => {
    const response = await axiosInstance.put("/post/like", {
      postId,
    });

    return await response.data.post;
  }
);

export const unlikeAsync = createAsyncThunk(
  "post/unlikeAsync",
  async ({ postId }: { postId: string }) => {
    const response = await axiosInstance.put("/post/unlike", {
      postId,
    });

    return await response.data.post;
  }
);

export const commentAsync = createAsyncThunk(
  "post/commentAsync",
  async ({ postId, text }: { postId: string; text: string }) => {
    const response = await axiosInstance.put("/post/comment", {
      postId,
      text,
    });

    return response.data.post;
  }
);

export const getMyPostsAsync = createAsyncThunk("post/getMyPostsAsync", async () => {
  const response = await axiosInstance.get("/post/my");
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
        state.post = action.payload;
        state.loading = false;
      })

      .addCase(likeAsync.pending, (state) => {
        console.log("likeAsync.pending");
        state.loading = true;
      })
      .addCase(likeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post
        );
        state.loading = false;
      })

      .addCase(unlikeAsync.pending, () => {
        console.log("unlikeAsync.pending");
      })
      .addCase(unlikeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post
        );
      })

      .addCase(commentAsync.pending, () => {
        console.log("commentAsync.pending");
      })
      .addCase(commentAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post
        );
      })

      .addCase(getMyPostsAsync.pending, (state) => {
        console.log("getMyPostsAsync.pending");
        state.loading = true;
      })
      .addCase(getMyPostsAsync.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
