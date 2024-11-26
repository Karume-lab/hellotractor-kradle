"use client";
import { useSession } from "@/providers/SessionProvider";
import { AdminSideBar, SellerSideBar, BuyerSideBar } from "../sidebar";

const SideBar = () => {
  const { user, accountType, isAdmin } = useSession();

  if (!user) {
    return;
  }

  return (
    <>
      {isAdmin &&
        accountType?.value !== "buyer" &&
        accountType?.value !== "seller" && <AdminSideBar />}
      {accountType?.value === "buyer" && <BuyerSideBar />}
      {accountType?.value === "seller" && <SellerSideBar />}
    </>
  );
};

export default SideBar;
