import { useChat } from "@/providers/ChatProvider";
import React from "react";
import ChatBubble from "./ChatBubble";

const ChatBubblesContainer = () => {
  const { buyerId, messages, inbox } = useChat();


  return (
    <div className="flex-grow overflow-y-auto px-8">
      <div className="my-4 flex items-center space-x-2">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm text-gray-500">This is the beginning of this conversation</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      {messages?.map((m) => (
        <ChatBubble key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChatBubblesContainer;
