import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { getPostsAsync } from "../../slices/postSlice";
import { RootState, AppDispatch } from "../../store";
import Layout from "../../components/Layout/Layout";
import "./PostList.css";

const Post = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { post } = useSelector((state: RootState) => state.post);

  const fetchData = async () => {
    console.log("fetchdata");

    dispatch(getPostsAsync());
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
