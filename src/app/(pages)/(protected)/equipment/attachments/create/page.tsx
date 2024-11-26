import React from "react";
import { CreateEditAttachmentForm } from "@/components";

const NewTractorPage = () => {
  return (
    <>
      <h1 className="text-4xl text-center my-4">
        Fill in the attachment details below
      </h1>
      <CreateEditAttachmentForm />
    </>
  );
};

export default NewTractorPage;
