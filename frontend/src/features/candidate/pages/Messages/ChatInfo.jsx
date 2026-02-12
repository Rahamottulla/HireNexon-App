import React from "react";
import { FaUserCircle, FaBell, FaImages, FaLock } from "react-icons/fa";

const ChatInfo = ({ chat }) => {
  if (!chat) return null;

  return (
    <div className="w-[26%] bg-white border-l flex flex-col items-center p-5">
      <FaUserCircle className="text-5xl text-blue-600 mb-2" />
      <h3 className="font-semibold">{chat.name}</h3>
      <p className="text-sm text-gray-500 mb-4">Recruiter</p>

      <div className="w-full border-t pt-4 space-y-3 text-sm">
        <div className="flex items-center gap-2"><FaBell /> Notifications: On</div>
        <div className="flex items-center gap-2"><FaImages /> Shared Media</div>
        <div className="flex items-center gap-2"><FaLock /> End-to-end encrypted</div>
      </div>

      <div className="mt-auto w-full space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          View Profile
        </button>
        <button className="w-full bg-red-500 text-white py-2 rounded">
          Block
        </button>
      </div>
    </div>
  );
};

export default ChatInfo;
