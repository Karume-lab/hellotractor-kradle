import { LinkAsButton } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div>Admin</div>

      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS}
        text="Trained Operators"
      />

      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_DEALERS}
        text="Dealers"
      />

      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRACTORS}
        text="Tractors"
      />

      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_ATTACHMENTS}
        text="Attachments"
      />
    </>
  );
};

export default Dashboard;
