import { useSession } from "@/providers/SessionProvider";
import { Message } from "@prisma/client";
import React from "react";
import clsx from "clsx";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { user, accountType } = useSession();
  const { content, createdAt, sellerId, buyerId } = message;

  const isSender =
    accountType?.value === "seller"
      ? user.profile?.seller?.id === sellerId
      : user.profile?.buyer?.id === buyerId;

  return (
    <div
      className={clsx(
        "flex items-start space-x-2 my-2",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-xs md:max-w-sm p-3 rounded-lg shadow-sm",
          isSender
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-200 text-gray-800 self-start"
        )}
      >
        <p className="text-sm">{content}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {new Date(createdAt).toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
