import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootTypes } from "../../types";
import { AppDispatch } from "../../store";
import { getMyPostsAsync } from "../../slices/postSlice";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootTypes) => state.auth);
  const { post } = useSelector((state: RootTypes) => state.post);

  const fetchPosts = useCallback(async () => {
    try {
      dispatch(getMyPostsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  console.log(post);
  console.log(Array.isArray(post));

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
          {post && post.length > 0 ? (
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
