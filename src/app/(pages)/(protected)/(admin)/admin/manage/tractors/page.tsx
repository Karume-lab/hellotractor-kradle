import { LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageTractorsPage = () => {
  return (
    <div className="h-screen w-full">
      <div>List of Tractors</div>
      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRACTORS_CREATE}
        text="Add Tractor"
      />
    </div>
  );
};

export default ManageTractorsPage;
