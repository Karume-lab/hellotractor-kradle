"use client";
import { urls } from "@/lib/urls";
import ButtonAsLink from "../core/ButtonAsLink";

const SellerDashboard = () => {
  return (
    <>
      <ButtonAsLink redirectTo={urls.TRACTORS} text="Tractors" />
    </>
  );
};

export default SellerDashboard;
