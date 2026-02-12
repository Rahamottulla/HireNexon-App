import React, { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (chat) {
      setMessages([
        { id: 1, sender: chat.name, text: "Hi Rahamottulla, please confirm interview timing." },
        { id: 2, sender: "You", text: "Sure, I’ll be available at 3 PM." },
      ]);
    }
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (msg) => {
    setMessages([...messages, { id: Date.now(), sender: "You", text: msg }]);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-500">
        Select a conversation to start chatting 💬
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-200 border-r">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          {chat.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{chat.name}</h3>
          <span className="text-xs text-green-600">Active now</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[65%] px-4 py-2 rounded-2xl text-sm ${
              msg.sender === "You"
                ? "ml-auto bg-blue-500 text-white rounded-br-sm"
                : "bg-white rounded-bl-sm"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
