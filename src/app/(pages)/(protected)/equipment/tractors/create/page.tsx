import React from "react";
import { CreateEditTractorForm } from "@/components";

const NewTractorPage = () => {
  return (
    <>
      <h1 className="text-4xl text-center my-4">
        Fill in the details of you tractor below
      </h1>
      <CreateEditTractorForm />
    </>
  );
};

export default NewTractorPage;
