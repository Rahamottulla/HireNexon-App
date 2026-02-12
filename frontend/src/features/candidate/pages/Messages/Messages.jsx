import React, { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";
import ChatWindow from "./ChatWindow";
import ChatInfo from "./ChatInfo";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

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

  useEffect(() => {
    if (!selectedChat && chatsData.length > 0) {
      setSelectedChat(chatsData[0]);
    }
  }, [selectedChat]);

  return (
    <div className="flex h-[calc(100vh-70px)] bg-gray-50 font-sans">
      <ChatPopup
        variant="page"
        isOpen={true}
        onClose={() => {}}
        onSelectChat={setSelectedChat}
      />

      <ChatWindow chat={selectedChat} />

      {selectedChat && <ChatInfo chat={selectedChat} />}
    </div>
  );
};

export default Messages;
