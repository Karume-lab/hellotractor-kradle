"use client";
import React from "react";
import { urls } from "@/lib/urls";
import LinkAsButton from "../core/LinkAsButton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { KINDLY_WAIT } from "@/lib/constants";
import { useSession } from "@/providers/SessionProvider";

const AccountTypeSwitcher = () => {
  const router = useRouter();
  const {
    accountType,
    setAccountType,
    setIsSwitchingAccountType,
  } = useSession();

  const handleOnClick = () => {
    toast.success(`Switching account, ${KINDLY_WAIT}`);
    setAccountType(null);
    router.push(urls.ACCOUNT_TYPES);
    setIsSwitchingAccountType(true);
  };

  return (
    <>
      {accountType && (
        <LinkAsButton
          redirectTo={urls.ACCOUNT_TYPES}
          text="Switch Account"
          onClick={handleOnClick}
        />
      )}
    </>
  );
};

export default AccountTypeSwitcher;
