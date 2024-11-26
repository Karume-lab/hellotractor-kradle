import { LinkAsButton, TrainedOperatorsTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageTrainedOperatorsPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of Trained Operators</h1>
        <LinkAsButton
          redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_CREATE}
          text="Add Trained Operator"
        />
      </div>
      <TrainedOperatorsTable />
    </div>
  );
};

export default ManageTrainedOperatorsPage;
