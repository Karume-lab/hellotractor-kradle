"use client";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "@/providers/SessionProvider";
import Link from "next/link";
import { urls } from "@/lib/urls";
import { T_Account_Type_Mapping } from "@/lib/types";

interface AccountTypeButtonProps {
  accountType: T_Account_Type_Mapping;
  isCreatingAccountType: boolean;
}

const AccountTypeButton: React.FC<AccountTypeButtonProps> = ({
  accountType,
  isCreatingAccountType,
}) => {
  const { setAccountType } = useSession();

  let redirectTo = "";

  if (isCreatingAccountType) {
    redirectTo = urls.ACCOUNT_TYPE_CREATION_FORM(accountType.value!);
  } else {
    redirectTo = accountType.value === "buyer" ? urls.EXPLORE : urls.DASHBOARD;
  }

  return (
    <Button
      className="uppercase"
      asChild
      onClick={() => setAccountType(accountType)}
    >
      <Link href={redirectTo}>
        {accountType.label ?? "Unknown Account Type"}
      </Link>
    </Button>
  );
};

export default AccountTypeButton;
