"use client";
import { useSession } from "@/providers/SessionProvider";
import { AdminSideBar, SellerSideBar, BuyerSideBar } from "../sidebar";

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
