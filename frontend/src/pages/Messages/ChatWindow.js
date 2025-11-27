// frontend/src/pages/Messages/ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import "./Messages.css";

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

  const handleSend = (newMsg) => {
    setMessages([...messages, { id: Date.now(), sender: "You", text: newMsg }]);
  };

  if (!chat) {
    return (
      <div className="chat-window-empty">
        <p>Select a conversation to start chatting 💬</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user">
          <div className="chat-avatar big">{chat.name.charAt(0)}</div>
          <div>
            <h3>{chat.name}</h3>
            <span className="online-status">Active now</span>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === "You" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
