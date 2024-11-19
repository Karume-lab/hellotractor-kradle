"use client";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "@/providers/SessionProvider";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { T_AccountType } from "@/lib/types";

interface AccountTypeButtonProps {
  accountType: T_AccountType;
}

const AccountTypeButton: React.FC<AccountTypeButtonProps> = ({
  accountType,
}) => {
  const { setAccountType } = useSession();

  return (
    <Button
      className="uppercase"
      asChild
      onClick={() => setAccountType(accountType)}
    >
      <Link
        href={accountType.value === "buyer" ? urls.EXPLORE : urls.DASHBOARD}
      >
        {accountType.label}
      </Link>
    </Button>
  );
};

export default AccountTypeButton;
