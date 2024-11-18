import { TasksTable } from "@/components";
import React from "react";

const ManageTasksPage = () => {
  
  return (
    <div className="h-screen w-full">
      <div>Tasks</div>
      <TasksTable />
    </div>
  );
};

export default ManageTasksPage;
