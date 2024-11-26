"use client";
import { useSession } from "@/providers/SessionProvider";
import { AdminSideBar, SellerSideBar, BuyerSideBar } from "../sidebar";
import { UserRole } from "@prisma/client";

const SideBar = () => {
  const { user, accountType } = useSession();

  if (!user) {
    return null;
  }

  if (user.role === UserRole.ADMIN && accountType) {
    // return <AdminSideBar />;
  }

  if (accountType?.value === "buyer") {
    return <BuyerSideBar />;
  }

  if (accountType?.value === "seller") {
    return <SellerSideBar />;
  }
};

export default SideBar;
