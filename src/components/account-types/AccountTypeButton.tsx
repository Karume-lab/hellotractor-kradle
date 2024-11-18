"use client";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "@/providers/SessionProvider";
import { T_AccountType } from "@/lib/types";

interface AccountTypeButtonProps {
  accountType: T_AccountType;
}
const AccountTypeButton: React.FC<AccountTypeButtonProps> = ({
  accountType,
}) => {
  const { setAccountType } = useSession();
  return (
    <Button className="uppercase" onClick={() => setAccountType(accountType)}>
      {accountType}
    </Button>
  );
};

export default AccountTypeButton;
