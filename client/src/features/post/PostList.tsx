import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { RootTypes } from "../../types";
import { createPost } from "../../slices/postSlice";
import Layout from "../../components/Layout/Layout";
import "./PostList.css";
import { RootState } from "../../store";

const Post = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootTypes) => state.auth);
  const { post, loading } = useSelector((state: RootState) => state.post);

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
    if (token) {
      fetchData(token);
    }
  }, [token]);

  return (
    <Layout>
      <div className="post-section">
        {Array.isArray(post) && post.length > 0 ? (
          post.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <p>No post available...</p>
        )}
      </div>
    </Layout>
  );
};

export default Post;
