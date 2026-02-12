import React from "react";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";

const PostActions = ({ liked, onLike }) => {
  return (
    <div className="flex justify-around border-t pt-2">
      <button
        onClick={onLike}
        className={`flex items-center gap-2 ${
          liked ? "text-blue-600 font-semibold" : "text-gray-600"
        }`}
      >
        <FaRegThumbsUp /> Like
      </button>
      <button className="flex items-center gap-2 text-gray-600">
        <FaRegComment /> Comment
      </button>
      <button className="flex items-center gap-2 text-gray-600">
        <FaShare /> Repost
      </button>
    </div>
  );
};

export default PostActions;
