import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootTypes } from "../../types";
import { createPost } from "../../slices/postSlice";
import Layout from "../../components/Layout/Layout";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootTypes) => state.auth);
  const { post } = useSelector((state: RootTypes) => state.post);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/post/my", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      if (result) {
        dispatch(createPost(result));
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Layout>
      <div className="profile-container">
        <div className="profile-wrapper">
          <img alt="avatar" src="./avatar.svg" />
          <div className="profile-user-details">
            <span className="profile-user-name">Eranda Madusanka</span>
            <div className="followers">
              <p>Post 86</p>
              <p>Followers 100</p>
              <p>Followings 100</p>
            </div>
          </div>
        </div>
        <div className="post-wrapper">
          {Array.isArray(post) && post.length > 0 ? (
            post.map((post, index) => (
              <div key={index} className="post-item">
                <img alt="post" src={post.photo} />
                <span className="post-title">{post?.title}</span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
