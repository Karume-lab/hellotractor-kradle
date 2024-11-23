"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "./SellerDashboard";
import { useSession } from "@/providers/SessionProvider";
import { urls } from "@/lib/urls";
import BuyerDashboard from "./BuyerDashboard";
import AdminDashboard from "./AdminDashboard";
import { UserRole } from "@prisma/client";

const Dashboard = () => {
  const { accountType, isSwitchingAccountType, user } = useSession();
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
      {user.role === UserRole.ADMIN && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
