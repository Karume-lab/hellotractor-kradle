import { LinkAsButton, TractorsTable } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const TractorsPage = () => {
  return (
    <>
      <span>List of tractors</span>
      <LinkAsButton redirectTo={urls.CREATE_TRACTOR} text="Add Tractor" />
      <TractorsTable fetchUrl={urls.API_SELLER_TRACTORS} />
    </>
  );
};

export default TractorsPage;
