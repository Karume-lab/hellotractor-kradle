import { ButtonAsLink } from "@/components";
import { urls } from "@/lib/urls";
import React from "react";

const TractorsPage = () => {
  return (
    <>
      <span>List of tractors</span>
      <ButtonAsLink redirectTo={urls.NEW_TRACTOR} text="Add Tractor" />
    </>
  );
};

export default TractorsPage;
