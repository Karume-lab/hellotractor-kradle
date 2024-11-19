"use client";
import React from "react";
import AccountTypeButton from "./AccountTypeButton";
import { useSession } from "@/providers/SessionProvider";
import AddAccountTypeButton from "./AddAccountTypeButton";

const AccountTypesContainer = () => {
  const { accountTypes, getAvailableAccountTypes } = useSession();

  return (
    <>
      {accountTypes.map((type) => (
        <AccountTypeButton key={type.value} accountType={type} />
      ))}
      <AddAccountTypeButton />
    </>
  );
};

export default AccountTypesContainer;
