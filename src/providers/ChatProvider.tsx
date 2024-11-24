"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { T_InboxBuyerSellerMessagesDataInclude } from "@/lib/types";

interface ChatContextProps {
  inbox: T_InboxBuyerSellerMessagesDataInclude | null;
  setInbox: (inbox: T_InboxBuyerSellerMessagesDataInclude) => void;
  messages: T_InboxBuyerSellerMessagesDataInclude["messages"];
  setMessages: (
    messages: T_InboxBuyerSellerMessagesDataInclude["messages"]
  ) => void;
  buyerId: string | null;
  setBuyerId: (buyerId: string) => void;
  sellerId: string | null;
  setSellerId: (sellerId: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  inboxActive: T_InboxBuyerSellerMessagesDataInclude | null;
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  inboxActive,
  children,
}) => {
  const [inbox, setInbox] =
    useState<T_InboxBuyerSellerMessagesDataInclude | null>(inboxActive);
  const [messages, setMessages] = useState<
    T_InboxBuyerSellerMessagesDataInclude["messages"]
  >([]);
  const [buyerId, setBuyerId] = useState<string | null>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    if (inboxActive) {
      setInbox(inboxActive);
      setBuyerId(inboxActive.buyerId);
      setSellerId(inboxActive.sellerId);
      setMessages(inboxActive.messages || []);
    }
  }, [inboxActive]);

  return (
    <ChatContext.Provider
      value={{
        inbox,
        setInbox,
        messages,
        setMessages,
        buyerId,
        setBuyerId,
        sellerId,
        setSellerId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
