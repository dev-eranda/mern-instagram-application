import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/ui/Card";
import { setPosts } from "../../slices/postSlice";
import { RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./PostList.css";

const Post = () => {
  const { post } = useSelector((state: RootState) => state.post);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setLoading(true);

    const getPost = async () => {
      try {
        const response = await axiosPrivate.get("/post", {
          signal: controller.signal,
        });
        isMounted && dispatch(setPosts(response.data));
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setLoading(false);
      }
    };

    getPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [navigate, location, dispatch]);

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
