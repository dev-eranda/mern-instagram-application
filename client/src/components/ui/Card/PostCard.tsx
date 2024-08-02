import React, { useState } from "react";
import { Post } from "../../../types/post";
import { useDispatch } from "react-redux";
import { commentAsync, likeAsync, unlikeAsync } from "../../../slices/postSlice";
import { AppDispatch } from "../../../store";
import "./Card.css";

type CardProps = {
  post: Post;
};

const PostCard: React.FC<CardProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("_id");

  const handleLike = async (postId: string) => {
    try {
      setLikes([...likes, userId ?? ""]);
      await dispatch(likeAsync({ postId }));
    } catch (error) {
      console.log(error);
      setLikes(likes.filter((id) => id !== userId));
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      setLikes(likes.filter((id) => id !== userId));
      await dispatch(unlikeAsync({ postId }));
    } catch (error) {
      console.log(error);
      setLikes([...likes, userId ?? ""]);
    }
  };

  const handleComment = async (postId: string, text: string) => {
    try {
      const resultAction = await dispatch(commentAsync({ postId, text }));
      if (commentAsync.fulfilled.match(resultAction)) {
        const post = resultAction.payload;
        setComments(post.comments || []);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={post._id} className="card">
      <h2>@{post.postedBy.name}</h2>
      <div className="post-title">
        <span>{post.title}</span>
      </div>
      <div className="photo-container">
        <img alt="photo" src={post.photo || "./logo512.png"} />
      </div>
      <div className="action-container">
        {likes.includes(userId ?? "") ? (
          <img
            alt="save"
            src="./heart-fill.svg"
            onClick={() => {
              handleUnlike(post._id);
            }}
          />
        ) : (
          <img
            alt="save"
            src="./heart.svg"
            onClick={() => {
              handleLike(post._id);
            }}
          />
        )}
      </div>
      <div className="likes-count">
        {likes && likes.length > 0 ? <span>{likes.length} likes</span> : <span>0 like</span>}
      </div>
      <p>{post.body}</p>
      <div className="comments">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-details">
              <img alt="like" src="./avatar-boy.svg" />
              <div className="user-wrapper">
                <span className="comment-owner">{comment.commentedBy.name}</span>
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
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <img
            alt="like"
            src="./send.svg"
            onClick={() => {
              handleComment(post._id, text);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
