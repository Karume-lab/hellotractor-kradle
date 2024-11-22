"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "./SellerDashboard";
import { useSession } from "@/providers/SessionProvider";
import { urls } from "@/lib/urls";
import BuyerDashboard from "./BuyerDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { accountType, isSwitchingAccountType, isAdmin, isBuyer, isSeller } =
    useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSwitchingAccountType && !accountType) {
      router.replace(urls.EXPLORE);
    }
  }, [accountType, isSwitchingAccountType, router]);

  return (
    <>
      {isBuyer && <BuyerDashboard />}
      {isSeller && <SellerDashboard />}
      {isAdmin && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
