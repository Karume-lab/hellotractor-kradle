import { LinkAsButton, TasksTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageTasksPage = () => {
  return (
    <div className="h-screen w-full">
      <div>List of Trained Operators</div>
      <LinkAsButton redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_CREATE} text="Add trained operator" />
    </div>
  );
};

export default ManageTasksPage;
