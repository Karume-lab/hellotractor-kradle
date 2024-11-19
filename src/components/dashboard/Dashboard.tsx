"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "./SellerDashboard";
import { useSession } from "@/providers/SessionProvider";
import { urls } from "@/lib/urls";

const Dashboard = () => {
  const { accountType } = useSession();
  const router = useRouter();

  if (!accountType) {
    router.replace(urls.EXPLORE);
  }

  return (
    <>
      {/* {accountType.value === "buyer" && <BuyerForm />} */}
      {accountType?.value === "seller" && <SellerDashboard />}
      {/* {accountType.value === "business" && <BusinessForm />}
      {accountType.value === "trainedOperator" && <TrainedOperatorForm />} */}
    </>
  );
};

export default Dashboard;
