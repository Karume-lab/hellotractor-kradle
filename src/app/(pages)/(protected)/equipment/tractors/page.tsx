import { LinkAsButton, TractorsTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const TractorsPage = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-4xl text-center my-4">List of your tractors</h1>
        <LinkAsButton redirectTo={urls.CREATE_TRACTOR} text="Add Tractor" />
      </div>
      <TractorsTable fetchUrl={urls.API_SELLER_TRACTORS} />
    </>
  );
};

export default TractorsPage;
