import { useSession } from "@/providers/SessionProvider";
import { Message } from "@prisma/client";
import React from "react";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { user, accountType } = useSession();

  const { content, createdAt, sellerId, buyerId } = message;
  return (
    <>
      {}
      <div>{content}</div>
      <div>{createdAt.toDateString()}</div>
      {accountType?.value === "seller"
        ? user.profile?.seller?.id === sellerId && <span>You</span>
        : user.profile?.buyer?.id === buyerId && <span>You</span>}
    </>
  );
};

export default ChatBubble;
