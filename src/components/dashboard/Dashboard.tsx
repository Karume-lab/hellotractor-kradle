"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "./SellerDashboard";
import { useSession } from "@/providers/SessionProvider";
import { urls } from "@/lib/urls";
import BuyerDashboard from "./BuyerDashboard";
import TrainedOperatorDashboard from "./TrainedOperatorDashboard";

const Dashboard = () => {
  const { accountType, isSwitchingAccountType } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSwitchingAccountType && !accountType) {
      router.replace(urls.EXPLORE);
    }
  }, [accountType, isSwitchingAccountType, router]);


  return (
    <>
      {accountType?.value === "buyer" && <BuyerDashboard />}
      {accountType?.value === "seller" && <SellerDashboard />}
      {accountType?.value === "trainedOperator" && <TrainedOperatorDashboard />}
    </>
  );
};

export default Dashboard;
