import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post";
// import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axiosInstance from "../axios/axiosInstance ";
import axios from "axios";

interface PostState {
  post: Post[];
}

const initialState: PostState = {
  post: [],
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
  return response.data.post;
});

export const storeImageAync = createAsyncThunk("Post/storeImageAync", async (file: File) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "insta-clone");
  data.append("cloud_name", "dgbgvecx3");

  const response = await axios.post("https://api.cloudinary.com/v1_1/dgbgvecx3/image/upload", data);

  return response.data.url;
});

export const createPostAsync = createAsyncThunk(
  "post/createPostAsync",
  async (
    { title, description, file }: { title: string; description: string; file: File[] },
    { dispatch }
  ) => {
    const imageUrl = await dispatch(storeImageAync(file[0])).unwrap();
    if (imageUrl) {
      const response = await axiosInstance.post("/post", {
        title,
        body: description,
        image_url: imageUrl,
      });
      return response.data;
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, () => {
        console.log("getPostsAsync.pending");
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.post = action.payload;
      })

      .addCase(createPostAsync.pending, () => {
        console.log("createPostAsync.pending");
      })
      .addCase(createPostAsync.fulfilled, () => {
        console.log("createPostAsync.fulfilled");
      })

      .addCase(storeImageAync.pending, () => {
        console.log("storeImageAync.pending");
      })
      .addCase(storeImageAync.fulfilled, () => {
        console.log("storeImageAync.fulfilled");
      })

      .addCase(likeAsync.pending, () => {
        console.log("likeAsync.pending");
      })
      .addCase(likeAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.post = state.post.map((post) =>
          post._id === action.payload._id ? { ...post, ...action.payload } : post
        );
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

      .addCase(getMyPostsAsync.pending, () => {
        console.log("getMyPostsAsync.pending");
      })
      .addCase(getMyPostsAsync.fulfilled, (state, action) => {
        state.post = action.payload;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
// function dispatch(arg0: AsyncThunkAction<any, File, AsyncThunkConfig>) {
//   throw new Error("Function not implemented.");
// }
