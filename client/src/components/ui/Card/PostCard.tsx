import React, { useEffect, useState } from "react";
import { Post } from "../../../types/post";
import { RootTypes } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { likeAsync, unlikeAsync } from "../../../slices/postSlice";
import { AppDispatch } from "../../../store";
import "./Card.css";

type CardProps = {
  post: Post;
};

const PostCard: React.FC<CardProps> = ({ post }) => {
  const { user, token } = useSelector((state: RootTypes) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [likes, setLikes] = useState(post.likes || []);

  const handleLike = async (postId: string, token: string) => {
    try {
      setLikes([...likes, user?.id ?? ""]);
      await dispatch(likeAsync({ postId, token }));
    } catch (error) {
      console.log(error);
      setLikes(likes.filter((id) => id !== user?.id));
    }
  };

  const handleUnlike = async (postId: string, token: string) => {
    try {
      setLikes(likes.filter((id) => id !== user?.id));
      dispatch(unlikeAsync({ postId, token }));
    } catch (error) {
      console.log(error);
      setLikes([...likes, user?.id ?? ""]);
    }
  };

  return (
    <div key={post.title} className="card">
      <h2>@{post.postedBy?.name}</h2>
      <div className="post-title">
        <span>{post.title}</span>
      </div>
      <div className="photo-container">
        <img alt="photo" src={post.photo || "./logo512.png"} />
      </div>
      <div className="action-container">
        {likes?.includes(user?.id ?? "") ? (
          <img
            alt="save"
            src="./heart-fill.svg"
            onClick={() => {
              handleUnlike(post._id, token);
            }}
          />
        ) : (
          <img
            alt="save"
            src="./heart.svg"
            onClick={() => {
              handleLike(post._id, token);
            }}
          />
        )}
      </div>
      <div className="likes-count">
        {likes && likes.length > 0 ? (
          <span>{likes.length} likes</span>
        ) : (
          <span>0 like</span>
        )}
      </div>
      <p>{post.body}</p>
      <div className="comments">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="comment-details">
              <img alt="like" src="./avatar-boy.svg" />
              <div className="user-wrapper">
                <span className="comment-owner">
                  {comment.commentedBy.name}
                </span>
                <span className="comment">{comment.text}</span>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
        <div className="input-wrapper">
          <input
            className="comment-input"
            type="text"
            placeholder="add a comment..."
          />
          <img alt="like" src="./send.svg" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
