import React from "react";
import { Post } from "../../../types/post";
import "./Card.css";

type CardProps = {
  post: Post;
};

const PostCard: React.FC<CardProps> = ({ post }) => {
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
        <img alt="save" src="./heart-fill.svg" />
        {/* <img alt="save" src="./comment.svg" /> */}
        {/* <img alt="save" src="./share.svg" /> */}
        {/* <img className="save-icon" alt="like" src="./bookmark.svg" /> */}
      </div>
      <div className="likes-count">
        {post.likes && post.likes.length > 0 ? (
          post.likes?.map((count, index) => (
            <span key={index}>{post.likes.length} likes</span>
          ))
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
                <span className="coment-owner">{comment.commentedBy.name}</span>
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
