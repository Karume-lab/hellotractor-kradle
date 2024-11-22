"use client";
import { urls } from "@/lib/urls";
import LinkAsButton from "../core/LinkAsButton";

const SellerDashboard = () => {
  return (
    <>
      <LinkAsButton redirectTo={urls.TRACTORS} text="Tractors" />
      <LinkAsButton redirectTo={urls.ATTACHMENTS} text="Attachments" />
    </>
  );
};

export default SellerDashboard;
