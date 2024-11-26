import { DealersTable, LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageDealersPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of Dealers</h1>
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_DEALERS_CREATE}
          text="Add Dealer"
        />
      </div>
      <DealersTable />
    </div>
  );
};

export default ManageDealersPage;
