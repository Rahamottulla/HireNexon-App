import React, { useState } from "react";
import { FaPaperclip, FaSmile, FaMicrophone, FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t px-3 py-2 flex items-center gap-2">
      <FaPaperclip className="cursor-pointer text-gray-500" />
      <input
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <FaSmile className="cursor-pointer text-gray-500" />
      <FaMicrophone className="cursor-pointer text-gray-500" />
      <button className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;
