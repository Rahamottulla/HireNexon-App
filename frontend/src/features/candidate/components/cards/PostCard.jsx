import React from "react";

const PostCard = ({ user, content }) => {
  return (
    <div className="bg-white p-4 mb-5 rounded-xl border border-gray-300 transition hover:shadow-lg">
      <div className="font-semibold mb-2">{user}</div>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
