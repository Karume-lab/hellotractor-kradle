"use client";
import React from "react";
import AccountType from "./AccountTypeButton";
import { useSession } from "@/providers/SessionProvider";

const AccountTypesContainer = () => {
  const { accountTypes } = useSession();
  return (
    <>
      {accountTypes.map((type) => (
        <AccountType accountType={type} />
      ))}
    </>
  );
};

export default AccountTypesContainer;
