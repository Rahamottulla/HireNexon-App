// frontend/src/pages/Messages/Messages.js
import React, { useState, useEffect } from "react"; // ✅ added useEffect
import ChatPopup from "./Chatpopup"; 
import ChatWindow from "./ChatWindow";
import ChatInfo from "./ChatInfo";
import "./Messages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // ✅ Same chat data as in ChatPopup
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

  // ✅ Automatically open the first chat on page load
  useEffect(() => {
    if (!selectedChat && chatsData.length > 0) {
      setSelectedChat(chatsData[0]);
    }
  }, [selectedChat]);

  return (
    <div className="messenger-page">
      {/* ✅ Left Panel: ChatPopup (used as Chat List) */}
      <ChatPopup
        variant="page"
        isOpen={true}
        onClose={() => {}}
        onSelectChat={setSelectedChat} // ✅ passes selected chat to parent
      />

      {/* ✅ Middle Panel: Chat Window */}
      <ChatWindow chat={selectedChat} />

      {/* ✅ Right Panel: Chat Info */}
      {selectedChat && <ChatInfo chat={selectedChat} />}
    </div>
  );
};

export default Messages;
