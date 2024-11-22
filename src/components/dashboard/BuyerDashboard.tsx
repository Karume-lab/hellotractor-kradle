"use client";
import { urls } from "@/lib/urls";
import LinkAsButton from "../core/LinkAsButton";

const BusinessDashboard = () => {
  return (
    <>
      <LinkAsButton redirectTo={urls.TRACTORS} text="Tractors" />
    </>
  );
};

export default BusinessDashboard;
