import React from "react";
import { PlusCircle } from "lucide-react";
import { useSession } from "@/providers/SessionProvider";
import LinkAsButton from "../core/LinkAsButton";
import { urls } from "@/lib/urls";

const AddAccountTypeButton = ({}) => {
  const { getAvailableAccountTypes } = useSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
  {/* Step Progress Indicator */}
  <div className="w-full max-w-md mb-6">
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
      Step 1 of 4: Add Account Type
    </h1>
    <p className="text-gray-600 text-center mb-4">
      Start by adding a new account type to proceed.
    </p>
    <div className="relative w-full h-2 bg-gray-200 rounded-full">
      <div className="absolute top-0 left-0 h-2 bg-primary rounded-full" style={{ width: "25%" }}></div>
    </div>
  </div>

  {/* Add New Account Type Button */}
  {!!getAvailableAccountTypes().length && (
    <LinkAsButton
      redirectTo={urls.CREATE_ACCOUNT_TYPE}
      className="flex items-center justify-center p-3"
    >
      <PlusCircle className="mr-2" />
      <span>Add new account type</span>
    </LinkAsButton>
  )}
</div>

  );
};

export default AddAccountTypeButton;
