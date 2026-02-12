import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import ChatPopup from "../pages/Messages/ChatPopup";
import MiniChatButton from "../pages/Messages/MiniChatButton";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showMiniButton, setShowMiniButton] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const location = useLocation();
  const isMessagesPage = location.pathname.includes("/candidate/messages");

  const openChatPopup = () => {
    setIsPopupOpen(true);
    setShowMiniButton(false);
    setHasOpenedOnce(true);
  };

  const closeChatPopup = (shouldShowMini = true) => {
    setIsPopupOpen(false);

    if (shouldShowMini && hasOpenedOnce && !isMessagesPage) {
      setTimeout(() => setShowMiniButton(true), 150);
    } else {
      setShowMiniButton(false);
    }
  };

  useEffect(() => {
    if (isMessagesPage) {
      setIsPopupOpen(false);
      setShowMiniButton(false);
    }
  }, [isMessagesPage]);

  return (
    <ChatContext.Provider value={{ isPopupOpen, openChatPopup, closeChatPopup }}>
      {children}

      {isPopupOpen && (
        <ChatPopup isOpen={isPopupOpen} onClose={closeChatPopup} />
      )}

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
