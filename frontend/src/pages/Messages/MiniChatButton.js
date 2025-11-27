import React from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import "./Messages.css";

const MiniChatButton = ({ onOpen, onHide }) => {
  return (
    <div className="mini-chat-wrapper">
      <div className="mini-chat-container">
        <button
          className="mini-chat-btn"
          title="Open Chat"
          onClick={onOpen}
        >
          <FaComments size={20} />
        </button>
        <button
          className="mini-chat-close-attached"
          title="Hide Chat Button"
          onClick={onHide}
        >
          <FaTimes size={10} />
        </button>
      </div>
    </div>
  );
};

export default MiniChatButton;
