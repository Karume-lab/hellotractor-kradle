"use client";
import React from "react";
import { parseAsString, useQueryState } from "nuqs";
import { ACCOUNT_TYPES_MAPPING, URL_STATES } from "@/lib/constants";
import { notFound } from "next/navigation";
import {
  CreateEditBuyerForm,
  CreateEditSellerForm,
  CreateEditTrainedOperatorForm,
} from "@/components";

const NewAccountTypeForm = () => {
  const [accountType] = useQueryState(URL_STATES.accountType, parseAsString);

  const validAccountType =
    accountType &&
    ACCOUNT_TYPES_MAPPING[accountType as keyof typeof ACCOUNT_TYPES_MAPPING];

  if (!validAccountType) {
    return notFound();
  }

  return (
    <>
      {validAccountType.value === "buyer" && <CreateEditBuyerForm />}
      {validAccountType.value === "seller" && <CreateEditSellerForm />}
      {validAccountType.value === "trainedOperator" && (
        <CreateEditTrainedOperatorForm />
      )}
    </>
  );
};

export default NewAccountTypeForm;
