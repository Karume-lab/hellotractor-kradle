"use client";
import { useSession } from "@/providers/SessionProvider";
import { AdminSideBar, SellerSideBar } from "../sidebar";
import BuyerSideBar from "../sidebar/BuyerSideBar";

const SideBar = () => {
  const { user, isAdmin, isSeller, isBuyer } = useSession();

  if (!user) {
    return;
  }

  return (
    <>
      {isAdmin && <AdminSideBar />}
      {isBuyer && <BuyerSideBar />}
      {isSeller && <SellerSideBar />}
    </>
  );
};

export default SideBar;
