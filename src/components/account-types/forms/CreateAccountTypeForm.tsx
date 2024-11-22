"use client";
import React from "react";
import { parseAsString, useQueryState } from "nuqs";
import { ACCOUNT_TYPES_MAPPING, URL_QUERY_STATES } from "@/lib/constants";
import {
  CreateEditBuyerForm,
  CreateEditSellerForm,
} from "@/components";
import { urls } from "@/lib/urls";
import { useRouter } from "next/navigation";

const CreateAccountTypeForm = () => {
  const [accountType] = useQueryState(URL_QUERY_STATES.accountType, parseAsString);
  const router = useRouter();

  const validAccountType =
    accountType &&
    ACCOUNT_TYPES_MAPPING[accountType as keyof typeof ACCOUNT_TYPES_MAPPING];

  if (!validAccountType) {
    router.push(urls.CREATE_ACCOUNT_TYPE);
    return;
  }

  return (
    <>
      {validAccountType.value === "buyer" && <CreateEditBuyerForm />}
      {validAccountType.value === "seller" && <CreateEditSellerForm />}
    </>
  );
};

export default CreateAccountTypeForm;
