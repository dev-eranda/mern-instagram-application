import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { RootState } from "../../types";
import { createPost } from "../../slices/postSlice";
import "./Post.css";
import Layout from "../../components/Layout/Layout";

const Post = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const { post } = useSelector((state: RootState) => state.post);

  const fetchData = async (token: string) => {
    try {
      const response = await fetch("/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(createPost(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchData(token);
    }
  }, [isAuthenticated, token]);
  return (
    <Layout>
      <div className="post-section">
        {Array.isArray(post) && post.length > 0 ? (
          post.map((post, index) => <PostCard post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </Layout>
  );
};

export default Post;
