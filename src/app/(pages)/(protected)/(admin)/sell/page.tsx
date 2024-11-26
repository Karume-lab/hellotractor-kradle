import { LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const SellPage = () => {
  return (
    <>
      <LinkAsButton text="Tractor" redirectTo={urls.CREATE_TRACTOR} />
      <LinkAsButton text="Attachment" redirectTo={urls.CREATE_ATTACHMENT} />
    </>
  );
};

export default SellPage;
