"use client";
import React from "react";
import AccountTypeButton from "./AccountTypeButton";
import { useSession } from "@/providers/SessionProvider";
import AddAccountTypeButton from "./AddAccountTypeButton";

interface AccountTypesContainerProps {
  isCreatingAccountType?: boolean;
}
const AccountTypesContainer: React.FC<AccountTypesContainerProps> = ({
  isCreatingAccountType = false,
}) => {
  const { accountTypes, getAvailableAccountTypes } = useSession();
  const accountTypesToUse = isCreatingAccountType
    ? getAvailableAccountTypes()
    : accountTypes;
  return (
    <>
      {accountTypesToUse.map((type) => (
        <AccountTypeButton
          key={type.value}
          accountType={type}
          isCreatingAccountType={isCreatingAccountType}
        />
      ))}
      {!isCreatingAccountType && <AddAccountTypeButton />}
    </>
  );
};

export default AccountTypesContainer;
