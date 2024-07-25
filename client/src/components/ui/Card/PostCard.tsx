import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Card.css";

type CardProps = {
  name: string;
  title: string;
  description: string;
};

const PostCard: React.FC<CardProps> = ({ name, title, description }) => {
  return (
    <div className="card">
      <h2>Card Header</h2>
      <div className="photo-container">
        <img alt="photo" src="./logo512.png" />
      </div>
      <div className="action-container">
        <img alt="save" src="./heart-fill.svg" />
        <img alt="save" src="./comment.svg" />
        <img alt="save" src="./share.svg" />
        <img className="save-icon" alt="like" src="./bookmark.svg" />
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Incidunt
      </p>
      <div className="comments">
        <div className="comment-details">
          <img alt="like" src="./avatar-boy.svg" />
          <div className="user-wrapper">
            <span className="coment-owner">Eranda Madusanka</span>
            <span className="comment">nice</span>
          </div>
        </div>

        <div className="comment-details">
          <img alt="like" src="./avatar-girl.svg" />
          <div className="user-wrapper">
            <span className="coment-owner">Eranda Madusanka</span>
            <span className="comment">nice</span>
          </div>
        </div>

        <div className="input-wrapper">
          <input className="comment-input" type="text" placeholder="add a comment..." />
          <img alt="like" src="./send.svg" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
