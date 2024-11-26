import { AttachmentsTable, LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageAttachmentsPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of Attachments</h1>
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_ATTACHMENTS_CREATE}
          text="Add Attachment"
        />
      </div>
      <AttachmentsTable />
    </div>
  );
};

export default ManageAttachmentsPage;
