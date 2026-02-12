import React from "react";

const PostBox = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4 transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/48"
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />

        <input
          type="text"
          placeholder="Start a post..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
      </div>

      <div className="mt-3 flex justify-around text-sm text-gray-500">
        <span>📸 Photo</span>
        <span>🎥 Video</span>
        <span>📰 Article</span>
      </div>
    </div>
  );
};

export default PostBox;
