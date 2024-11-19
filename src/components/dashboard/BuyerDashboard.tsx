"use client";
import { urls } from "@/lib/urls";
import ButtonAsLink from "../core/ButtonAsLink";

const BusinessDashboard = () => {
  return (
    <>
      <ButtonAsLink redirectTo={urls.TRACTORS} text="Tractors" />
    </>
  );
};

export default BusinessDashboard;
