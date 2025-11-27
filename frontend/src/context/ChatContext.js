import React, { createContext, useContext, useState, useEffect } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ChatPopup from "../pages/Messages/Chatpopup";
import MiniChatButton from "../pages/Messages/MiniChatButton";


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showMiniButton, setShowMiniButton] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false); // ✅ restored
  const location = useLocation();

  const isMessagesPage = location.pathname.includes("candidate/messages");

  // ✅ Open chat popup
  const openChatPopup = () => {
    setIsPopupOpen(true);
    setShowMiniButton(false);
    setHasOpenedOnce(true); // ✅ remember user opened at least once
  };

  // ✅ Close popup and show mini chat (if not on messages page)
  const closeChatPopup = (shouldShowMini = true) => {
    console.log("🧩 closeChatPopup called", {
      shouldShowMini,
      hasOpenedOnce,
      isMessagesPage,
    });

    setIsPopupOpen(false);

    // ✅ Delay slightly for smooth close animation
    if (shouldShowMini && hasOpenedOnce && !isMessagesPage) {
      setTimeout(() => {
        console.log("✅ Showing mini chat button");
        setShowMiniButton(true);
      }, 150);
    } else {
      console.log("❌ Hiding mini chat button");
      setShowMiniButton(false);
    }
  };

  // ✅ If user navigates to messages page → hide popup & mini button
  useEffect(() => {
    if (isMessagesPage) {
      setIsPopupOpen(false);
      setShowMiniButton(false);
    }
  }, [isMessagesPage]);
  // 🔍 ADD THIS LOG JUST BEFORE RETURN
  console.log({
    isPopupOpen,
    showMiniButton,
    hasOpenedOnce,
    isMessagesPage,
    shouldRenderMini: !isPopupOpen && showMiniButton && !isMessagesPage
  });

  return (
    <ChatContext.Provider
      value={{ isPopupOpen, openChatPopup, closeChatPopup }}
    >
      {children}

      {/* ✅ Popup */}
      {isPopupOpen && (
        <ChatPopup
          isOpen={isPopupOpen}
          onClose={closeChatPopup}
        />
      )}

      {/* ✅ Mini Chat Button */}
      {!isPopupOpen && showMiniButton && !isMessagesPage && (
        <MiniChatButton
          onOpen={openChatPopup}
          onHide={() => setShowMiniButton(false)}
        />
      )}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);


