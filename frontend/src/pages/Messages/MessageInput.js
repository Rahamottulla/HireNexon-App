// frontend/src/pages/Messages/MessageInput.js
import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane } from "react-icons/fa";
import "./Messages.css";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };
  
  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <button type="button" className="icon-btn">
        <FaPaperclip />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" className="icon-btn">
        <FaSmile />
      </button>
      <button type="button" className="icon-btn">
        <FaMicrophone />
      </button>
      <button type="submit" className="send-btn">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;
