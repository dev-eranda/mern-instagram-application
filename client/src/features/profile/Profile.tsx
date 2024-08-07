import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootTypes } from "../../types";
import { AppDispatch } from "../../store";
import { setPostData } from "../../slices/postSlice";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout/Layout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./Profile.css";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { post } = useSelector((state: RootTypes) => state.post);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        const response = await axiosPrivate("/post/my", {
          signal: controller.signal,
        });

        if (isMounted) {
          dispatch(setPostData(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [dispatch]);

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-wrapper">
          <img alt="avatar" src="./avatar.svg" />
          <div className="profile-user-details">
            <span className="profile-user-name">{user?.name}</span>
            <div className="followers">
              <p>Post 86</p>
              <p>Followers 100</p>
              <p>Followings 100</p>
            </div>
          </div>
        </div>
        <div className="post-wrapper">
          {loading ? (
            <p>Loadng...</p>
          ) : post && post.length > 0 ? (
            post.map((post) => (
              <div key={post._id} className="post-item">
                <img alt="post" src={post.photo} />
                <span className="post-title">{post?.title}</span>
              </div>
            ))
          ) : (
            <p>No post available...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
