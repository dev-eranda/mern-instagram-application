import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { getPostsAsync } from "../../slices/postSlice";
import { RootState, AppDispatch } from "../../store";
import Layout from "../../components/Layout/Layout";
import "./PostList.css";

const Post = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { post } = useSelector((state: RootState) => state.post);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      await dispatch(getPostsAsync());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <Layout>
      <div className="post-section">
        {loading ? (
          <p>Loading...</p>
        ) : post && post.length > 0 ? (
          post.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts available...</p>
        )}
      </div>
    </Layout>
  );
};

export default Post;
