"use client";
import React from "react";
import AccountTypeButton from "./AccountTypeButton";
import { useSession } from "@/providers/SessionProvider";
import AddAccountTypeButton from "./AddAccountTypeButton";

interface AccountTypesContainerProps {
  isCreatingAccountType?: boolean;
  helperText?: string;
}
const AccountTypesContainer: React.FC<AccountTypesContainerProps> = ({
  isCreatingAccountType = false,
}) => {
  const { accountTypes, getAvailableAccountTypes } = useSession();
  const accountTypesToUse = isCreatingAccountType
    ? getAvailableAccountTypes()
    : accountTypes;

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl text-center my-4">
        Select an account type to continue
      </h1>
      <div className="flex justify-center gap-x-4">
        {accountTypesToUse.map((type) => (
          <AccountTypeButton
            key={type.value}
            accountType={type}
            isCreatingAccountType={isCreatingAccountType}
          />
        ))}
        {!isCreatingAccountType && <AddAccountTypeButton />}
      </div>
    </div>
  );
};

export default AccountTypesContainer;
