import { LinkAsButton, TrainedOperatorsTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const ManageTrainedOperatorsPage = () => {
  return (
    <div className="h-screen w-full">
      <div>List of Trained Operators</div>
      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_CREATE}
        text="Add trained operator"
      />
      <TrainedOperatorsTable />
    </div>
  );
};

export default ManageTrainedOperatorsPage;
