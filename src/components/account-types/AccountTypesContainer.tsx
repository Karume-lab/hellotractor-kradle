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
  isCreatingAccountType = false
}) => {
  const { accountTypes, getAvailableAccountTypes } = useSession();
  const accountTypesToUse = isCreatingAccountType
    ? getAvailableAccountTypes()
    : accountTypes;

  return (
    // <>
    //   {accountTypesToUse.map((type) => (
    //     <AccountTypeButton
    //       key={type.value}
    //       accountType={type}
    //       isCreatingAccountType={isCreatingAccountType}
    //     />
    //   ))}
    //   {!isCreatingAccountType && <AddAccountTypeButton />}
    // </>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* Step Progress Indicator */}
      <div className="w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Step 2 of 4: Select Account Type
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Choose an account type to proceed.
        </p>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div className="absolute top-0 left-0 h-2 bg-primary rounded-full" style={{ width: "50%" }}></div>
        </div>
      </div>

      {/* Mapped Buttons */}
      <div className="flex flex-col items-center w-full max-w-md space-y-4">
        {accountTypesToUse.map((type) => (
          <AccountTypeButton
            key={type.value}
            accountType={type}
            isCreatingAccountType={isCreatingAccountType}
          />
        ))}

        {/* Add Account Type Button */}
        {!isCreatingAccountType && (
          <AddAccountTypeButton />
        )}
      </div>
    </div>

  );
};

export default AccountTypesContainer;
