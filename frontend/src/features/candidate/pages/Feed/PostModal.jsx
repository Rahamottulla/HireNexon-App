import React from "react";

const PostModal = ({ postingAsCompany, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-4 space-y-4">
        <textarea
          className="w-full border rounded-lg p-3 resize-none"
          placeholder={
            postingAsCompany
              ? "Share an update from your company..."
              : "What's on your mind?"
          }
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button className="px-4 py-1 bg-blue-600 text-white rounded">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
