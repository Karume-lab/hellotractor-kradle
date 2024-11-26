import { AttachmentsTable, LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageAttachmentsPage = () => {
  return (
    <div className="h-screen w-full">
      <div>List of Attachments</div>
      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_ATTACHMENTS_CREATE}
        text="Add attachment"
      />
      <AttachmentsTable />
    </div>
  );
};

export default ManageAttachmentsPage;
