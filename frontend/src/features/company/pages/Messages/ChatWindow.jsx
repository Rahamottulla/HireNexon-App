import useMessages from "@/features/company/hooks/useMessages";

const ChatWindow = () => {
  const { messages } = useMessages();

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-[600px]">
      {messages?.map((msg, i) => (
        <div key={i} className="mb-3 text-sm">
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;