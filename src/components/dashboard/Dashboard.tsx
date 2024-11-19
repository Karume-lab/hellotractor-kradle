"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "./SellerDashboard";
import { useSession } from "@/providers/SessionProvider";
import { urls } from "@/lib/urls";
import BuyerDashboard from "./BuyerDashboard";
import TrainedOperatorDashboard from "./TrainedOperatorDashboard";

const Dashboard = () => {
  const { accountType } = useSession();
  const router = useRouter();

  if (!accountType) {
    router.replace(urls.EXPLORE);
  }

  return (
    <>
      {accountType?.value === "buyer" && <BuyerDashboard />}
      {accountType?.value === "seller" && <SellerDashboard />}
      {accountType?.value === "trainedOperator" && <TrainedOperatorDashboard />}
    </>
  );
};

export default Dashboard;
