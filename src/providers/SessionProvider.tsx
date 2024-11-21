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

interface SessionProviderContextValue {
  user: User;
  session: Session;
  accountType: T_Account_Type_Mapping | null;
  setAccountType: (type: T_Account_Type_Mapping | null) => void;
  isDealer: boolean;
  setIsDealer: (isDealer: boolean) => void;
  accountTypes: T_Account_Type_Mapping[];
  isBuyer: boolean;
  isSeller: boolean;
  isTrainedOperator: boolean;
  isAdmin: boolean;
  hasProfile: boolean;
  getAvailableAccountTypes: () => T_Account_Type_Mapping[];
  isSwitchingAccountType: boolean;
  setIsSwitchingAccountType: (isSwitching: boolean) => void;
}

const SessionProviderContext = createContext<
  SessionProviderContextValue | undefined
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
  const [isSwitchingAccountType, setIsSwitchingAccountType] = useState(false);

  const [updatedUserProfile, setUpdatedUserProfile] = useState(user.profile);

  useEffect(() => {
    setUpdatedUserProfile(user.profile);
  }, [user.profile]);

  const accountTypes: T_Account_Type_Mapping[] = [
    ...(updatedUserProfile?.buyer ? [ACCOUNT_TYPES_MAPPING["buyer"]] : []),
    ...(updatedUserProfile?.seller?.isDealer
      ? [ACCOUNT_TYPES_MAPPING["dealer"]]
      : []),
    ...(updatedUserProfile?.seller ? [ACCOUNT_TYPES_MAPPING["seller"]] : []),
    ...(updatedUserProfile?.trainedOperator
      ? [ACCOUNT_TYPES_MAPPING["trainedOperator"]]
      : []),
  ];

  const isBuyer = Boolean(updatedUserProfile?.buyer);
  const isSeller = Boolean(updatedUserProfile?.seller);
  const isTrainedOperator = Boolean(updatedUserProfile?.trainedOperator);
  const isAdmin = user.role === UserRole.ADMIN;

  const hasProfile = Boolean(updatedUserProfile);

  const getAvailableAccountTypes = (): T_Account_Type_Mapping[] => {
    const userAccountTypes = accountTypes.map((account) => account.value);

    return Object.values(ACCOUNT_TYPES_MAPPING).filter((accountType) => {
      return (
        !userAccountTypes.includes(accountType.value) &&
        accountType.value !== "dealer"
      );
    });
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
    isSeller,
    isTrainedOperator,
    isAdmin,
    hasProfile,
    getAvailableAccountTypes,
    isSwitchingAccountType,
    setIsSwitchingAccountType,
  };

  return (
    <SessionProviderContext.Provider value={value}>
      {children}
    </SessionProviderContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionProviderContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
