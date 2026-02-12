import React from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const MiniChatButton = ({ onOpen, onHide }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div className="relative">
        <button
          onClick={onOpen}
          className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
        >
          <FaComments size={22} />
        </button>
        <button
          onClick={onHide}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default MiniChatButton;
