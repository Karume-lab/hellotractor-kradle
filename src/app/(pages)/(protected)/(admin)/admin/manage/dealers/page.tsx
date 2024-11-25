import { DealersTable, LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageDealersPage = () => {
  return (
    <div className="h-screen w-full">
      <div>List of Dealers</div>
      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_DEALERS_CREATE}
        text="Add dealer"
      />
      <DealersTable />
    </div>
  );
};

export default ManageDealersPage;
