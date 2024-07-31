import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { createPost } from "../../slices/postSlice";
import { RootState } from "../../store";
import Layout from "../../components/Layout/Layout";
import axiosInstance from "../../axios/axiosInstance ";
import "./PostList.css";

const Post = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state: RootState) => state.post);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/post");
      const data = await response.data;
      dispatch(createPost(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <div className="post-section">
        {post && post.length > 0 ? (
          post.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No post available...</p>
        )}
      </div>
    </Layout>
  );
};

export default Post;
