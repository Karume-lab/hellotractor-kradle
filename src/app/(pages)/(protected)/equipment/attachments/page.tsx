import { ButtonAsLink } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const TractorsPage = () => {
  return (
    <>
      <span>List of attachments</span>
      <ButtonAsLink redirectTo={urls.CREATE_ATTACHMENT} text="Add Attachment" />
    </>
  );
};

export default TractorsPage;
