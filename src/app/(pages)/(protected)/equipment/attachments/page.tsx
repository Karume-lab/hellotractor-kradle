import { AttachmentsTable, LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const TractorsPage = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of Attachments</h1>
        <LinkAsButton
          redirectTo={urls.CREATE_ATTACHMENT}
          text="Add Attachment"
        />
      </div>
      <AttachmentsTable fetchUrl={urls.API_SELLER_ATTACHMENTS} />
    </>
  );
};

export default TractorsPage;
