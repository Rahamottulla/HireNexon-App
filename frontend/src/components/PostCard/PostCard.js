import React from "react";
import "./PostCard.css";

const PostCard = ({ user, content }) => {
  return (
    <div className="post-card">
      <div className="post-user">{user}</div>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
