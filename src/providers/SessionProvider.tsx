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
import { T_Account_Type_Mapping } from "@/lib/types";
import { ACCOUNT_TYPES_MAPPING, LOCAL_STORAGE_KEY } from "@/lib/constants";

interface SessionProviderPropsContextValue {
  user: User;
  session: Session;
  accountType: T_Account_Type_Mapping | null;
  setAccountType: (type: T_Account_Type_Mapping | null) => void;
  isDealer: boolean;
  setIsDealer: (isDealer: boolean) => void;
  accountTypes: T_Account_Type_Mapping[];
  isBuyer: () => boolean;
  isSeller: () => boolean;
  isTrainedOperator: () => boolean;
  isAdmin: () => boolean;
  getAvailableAccountTypes: () => T_Account_Type_Mapping[];
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
  const [accountType, setAccountType] = useState<T_Account_Type_Mapping | null>(
    () => {
      if (typeof window !== "undefined") {
        const savedAccountType = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedAccountType ? JSON.parse(savedAccountType) : null;
      }
      return null;
    }
  );

  const [isDealer, setIsDealer] = useState(false);

  const accountTypes: T_Account_Type_Mapping[] = [
    ...(user.profile?.buyer ? [ACCOUNT_TYPES_MAPPING["buyer"]] : []),
    ...(user.profile?.seller?.isDealer
      ? [ACCOUNT_TYPES_MAPPING["dealer"]]
      : []),
    ...(user.profile?.seller ? [ACCOUNT_TYPES_MAPPING["seller"]] : []),
    ...(user.profile?.trainedOperator
      ? [ACCOUNT_TYPES_MAPPING["trainedOperator"]]
      : []),
  ];

  const isBuyer = () => user.profile?.buyer !== null;
  const isSeller = () => user.profile?.seller !== null;
  const isTrainedOperator = () => user.profile?.trainedOperator !== null;
  const isAdmin = () => user.role === UserRole.ADMIN;

  const getAvailableAccountTypes = (): T_Account_Type_Mapping[] => {
    const userAccountTypes = [...accountTypes.map((account) => account.value)];

    const availableAccountTypes = Object.values(ACCOUNT_TYPES_MAPPING).filter(
      (accountType) => {
        return !userAccountTypes.includes(accountType.value);
      }
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
    isTrainedOperator,
    isAdmin,
    isSeller,
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
