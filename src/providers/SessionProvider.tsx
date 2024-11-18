"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Session, User } from "lucia";
import { UserRole } from "@prisma/client";
import { T_AccountType } from "@/lib/types";

interface SessionProviderPropsContextValue {
  user: User;
  session: Session;

  accountType: T_AccountType;
  setAccountType: (type: T_AccountType) => void;
  isDealer: boolean;
  setIsDealer: (isDealer: boolean) => void;

  accountTypes: T_AccountType[];

  isBuyer: () => boolean;
  isBusiness: () => boolean;
  isTrainedOperator: () => boolean;
  isAdmin: () => boolean;
}

const SessionProviderContext = createContext<
  SessionProviderPropsContextValue | undefined
>(undefined);

interface SessionProviderProps {
  children: ReactNode;
  session: Session;
  user: User;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
  user,
}) => {
  const [accountType, setAccountType] = useState<T_AccountType>(null);
  const [isDealer, setIsDealer] = useState(false);

  const accountTypes: T_AccountType[] = [
    ...(user.buyer ? (["buyer"] as const) : []),
    ...(user.business?.isDealer ? (["dealer"] as const) : []),
    ...(user.business ? (["business"] as const) : []),
    ...(user.trainedOperator ? (["trainedOperator"] as const) : []),
  ];

  const isBuyer = () => user.buyer !== null;
  const isBusiness = () => user.business !== null;
  const isTrainedOperator = () => user.trainedOperator !== null;
  const isAdmin = () => user.role === UserRole.ADMIN;

  const value = {
    user,
    session,

    accountType,
    setAccountType,
    isDealer,
    setIsDealer,

    accountTypes,

    isBuyer,
    isBusiness,
    isTrainedOperator,
    isAdmin,
  };

  return (
    <SessionProviderContext.Provider value={value}>
      {children}
    </SessionProviderContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionProviderContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
