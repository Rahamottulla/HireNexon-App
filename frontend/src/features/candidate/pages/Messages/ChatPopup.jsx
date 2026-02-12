import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaFilter, FaCog, FaExpand, FaEdit } from "react-icons/fa";

const ChatPopup = ({ isOpen = true, onClose, variant = "popup", onSelectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const chatsData = [
    { id: 1, name: "Riya Sharma", lastMsg: "Hey! How are you?", online: true },
    { id: 2, name: "Tech Community", lastMsg: "New post on AI updates", online: false },
    { id: 3, name: "Suraj", lastMsg: "Got the update done!", online: true },
    { id: 4, name: "Monika", lastMsg: "Let's meet tomorrow.", online: false },
    { id: 5, name: "Shubham", lastMsg: "Sent you the file.", online: true },
    { id: 6, name: "Growix Team", lastMsg: "Internship meeting today.", online: false },
    { id: 7, name: "Saurabh", lastMsg: "Can you check the PR?", online: true },
    { id: 8, name: "CU Coding Group", lastMsg: "Contest on Sunday!", online: false },
  ];

  const filteredChats = chatsData.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFullScreen = () => {
    if (variant === "popup") {
      onClose(false);
      navigate("/candidate/messages");
    }
  };

  return (
    <AnimatePresence>
      {(isOpen || variant === "page") && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className={
            variant === "popup"
              ? "fixed top-[70px] right-3 w-[350px] h-[480px] bg-white border rounded-xl shadow-lg flex flex-col z-50"
              : "w-[28%] bg-white border-r flex flex-col"
          }
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-800">Messages</h3>
            <div className="flex gap-2">
              <FaEdit className="cursor-pointer text-gray-500 hover:text-blue-600" />
              <FaCog className="cursor-pointer text-gray-500 hover:text-blue-600" />
              {variant === "popup" && (
                <FaExpand onClick={handleFullScreen} className="cursor-pointer" />
              )}
              {variant === "popup" && (
                <FaTimes onClick={() => onClose(true)} className="cursor-pointer" />
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b">
            <FaSearch className="text-gray-400" />
            <input
              className="w-full outline-none text-sm"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaFilter className="text-gray-400 cursor-pointer" />
          </div>

          {/* Filters */}
          <div className="flex border-b">
            {["All", "Unread", "Groups"].map(tab => (
              <button
                key={tab}
                className={`flex-1 py-2 text-sm ${
                  activeFilter === tab
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => onSelectChat && onSelectChat(chat)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div className="relative w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {chat.name.charAt(0)}
                  <span
                    className={`absolute bottom-1 right-1 w-2 h-2 rounded-full border-2 border-white ${
                      chat.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-semibold truncate">{chat.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;
