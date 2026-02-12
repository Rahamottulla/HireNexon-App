import React, { useState } from "react";
import { FaEllipsisV, FaTimes } from "react-icons/fa";
import FeedMenu from "./FeedMenu";
import PostActions from "./PostActions";

const FeedPost = ({ post, onLike, onRemove }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3 relative">
      <div className="flex items-start gap-3">
        <img src={post.avatar} className="w-11 h-11 rounded-full" />

        <div className="flex-1">
          <h4 className="font-semibold">{post.name}</h4>
          <p className="text-sm text-gray-500">{post.tagline}</p>
          <span className="text-xs text-gray-400">{post.time}</span>
        </div>

        <button onClick={() => setOpenMenu(!openMenu)}>
          <FaEllipsisV />
        </button>
        <button onClick={() => onRemove(post.id)}>
          <FaTimes />
        </button>

        {openMenu && <FeedMenu />}
      </div>

      <p>{post.content}</p>
      {post.image && <img src={post.image} className="rounded-lg w-full" />}

      <div className="text-xs text-gray-500 flex justify-between">
        <span>{post.likes} Likes</span>
        <span>{post.comments} Comments</span>
        <span>{post.reposts} Reposts</span>
      </div>

      <PostActions liked={post.liked} onLike={() => onLike(post.id)} />
    </div>
  );
};

export default FeedPost;
