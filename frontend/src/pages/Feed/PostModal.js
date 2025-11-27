import React from "react";

const PostModal = ({ postingAsCompany, setOpenPostModal }) => {
  return (
    <div className="post-modal">
      <textarea
        placeholder={
          postingAsCompany
            ? "Share an update from your company..."
            : "What's on your mind?"
        }
      />
      <button onClick={() => setOpenPostModal(false)}>Close</button>
    </div>
  );
};

export default PostModal;
