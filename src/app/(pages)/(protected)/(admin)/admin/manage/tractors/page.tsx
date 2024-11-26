import { LinkAsButton, TractorsTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageTractorsPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of Tractors</h1>
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRACTORS_CREATE}
          text="Add Tractor"
        />
      </div>
      <TractorsTable />
    </div>
  );
};

export default ManageTractorsPage;
