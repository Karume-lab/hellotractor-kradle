import { useChat } from "@/providers/ChatProvider";
import React from "react";
import ChatBubble from "./ChatBubble";

const ChatBubblesContainer = () => {
  const { buyerId, messages, inbox } = useChat();


  return (
    <div>
      {messages?.map((m) => (
        <ChatBubble key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChatBubblesContainer;
