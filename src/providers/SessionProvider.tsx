"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Session, User } from "lucia";
import { UserRole } from "@prisma/client";
import { T_AccountType } from "@/lib/types";
import { ACCOUNT_TYPES_MAPPING, LOCAL_STORAGE_KEY } from "@/lib/constants";

interface SessionProviderPropsContextValue {
  user: User;
  session: Session;

  accountType: T_AccountType | null;
  setAccountType: (type: T_AccountType) => void;
  isDealer: boolean;
  setIsDealer: (isDealer: boolean) => void;

  accountTypes: T_AccountType[];

  isBuyer: () => boolean;
  isBusiness: () => boolean;
  isTrainedOperator: () => boolean;
  isAdmin: () => boolean;
  getAvailableAccountTypes: () => T_AccountType[];
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
  const [accountType, setAccountType] = useState<T_AccountType | null>(() => {
    if (typeof window !== "undefined") {
      const savedAccountType = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedAccountType ? JSON.parse(savedAccountType) : null;
    }
    return null;
  });
  const [isDealer, setIsDealer] = useState(false);

  const accountTypes: T_AccountType[] = [
    ...(user.buyer ? [ACCOUNT_TYPES_MAPPING["buyer"]] : []),
    ...(user.business
      ? user.business.map((business) =>
          business.isDealer
            ? ACCOUNT_TYPES_MAPPING["dealer"]
            : ACCOUNT_TYPES_MAPPING["seller"]
        )
      : []),
    ...(user.trainedOperator ? [ACCOUNT_TYPES_MAPPING["trainedOperator"]] : []),
  ];

  const isBuyer = () => user.buyer !== null;
  const isBusiness = () => user.business !== null;
  const isTrainedOperator = () => user.trainedOperator !== null;
  const isAdmin = () => user.role === UserRole.ADMIN;

  const getAvailableAccountTypes = (): T_AccountType[] => {
    const userAccountTypes = [
      ...accountTypes.map((account) => account.value),
      ...(user.business?.map((business) =>
        business.isDealer ? "dealer" : "seller"
      ) || []),
    ];

    const availableAccountTypes = Object.values(ACCOUNT_TYPES_MAPPING).filter(
      (accountType) => !userAccountTypes.includes(accountType.value)
    );

    return availableAccountTypes;
  };

  useEffect(() => {
    if (accountType) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accountType));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [accountType]);

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
    getAvailableAccountTypes,
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
