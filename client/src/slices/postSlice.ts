import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";

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

export const commentAsync = createAsyncThunk(
  "post/commentAsync",
  async ({
    postId,
    token,
    text,
  }: {
    postId: string;
    token: string;
    text: string;
  }) => {
    const response = await fetch("/post/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId, text }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
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
      .addCase(likeAsync.pending, (state) => {
        console.log("likeAsync.pending");
        state.loading = true;
      })
      .addCase(likeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id
            ? { ...post, ...action.payload }
            : post
        );
        state.loading = false;
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
      })
      .addCase(commentAsync.pending, () => {
        console.log("commentAsync.pending");
      })
      .addCase(commentAsync.fulfilled, (state, action: PayloadAction<Post>) => {
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
