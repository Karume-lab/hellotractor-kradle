import React from "react";
import { T_InboxDataInclude } from "@/lib/types";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { urls } from "@/lib/urls";

interface InboxCardProps {
  inbox: T_InboxDataInclude;
}

const InboxCard: React.FC<InboxCardProps> = ({ inbox }) => {
  const recipient =
    inbox.buyer?.profile?.firstName || inbox.seller?.profile?.firstName;

  const lastMessage = inbox.messages[0];
  const truncateMessage = (message: string, maxLength = 50) =>
    message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;

  const router = useRouter();

  const handleOnClick = () => {
    router.push(urls.INBOX_DETAIL(inbox.id));
  };

  return (
    <div
      className="group relative p-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-[#f7cfda] flex items-center justify-center">
            <User className="w-6 h-6 text-[#f8285f]" />
          </div>
          {lastMessage && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
          )}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-[#2f1c54] truncate">
              {recipient}
            </h3>
            {lastMessage && (
              <span className="text-xs text-gray-500">
                {new Date(lastMessage.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {lastMessage && (
            <p className="text-sm text-gray-600 truncate">
              {truncateMessage(lastMessage.content)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxCard;
