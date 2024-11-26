import React from "react";
import BaseSideBar from "../core/BaseSideBar";
import { T_SideBarItem } from "@/lib/types";
import { ADMIN_SELLER_SHARED_SIDEBAR_ITEMS } from "./AdminSideBar";
import { FaMoneyBill } from "react-icons/fa6";
import { urls } from "@/lib/urls";
import { Tractor, Unlink2 } from "lucide-react";

const SELLER_SIDEBAR_ITEMS: T_SideBarItem[] = [
  ...ADMIN_SELLER_SHARED_SIDEBAR_ITEMS,
  {
    label: "Sell",
    Icon: FaMoneyBill,
    redirectTo: urls.SELL,
  },
  {
    label: "Tractors",
    Icon: Tractor,
    redirectTo: urls.TRACTORS,
  },
  {
    label: "Attachments",
    Icon: Unlink2,
    redirectTo: urls.ATTACHMENTS,
  },
];

const SellerSideBar = () => {
  return <BaseSideBar items={SELLER_SIDEBAR_ITEMS} />;
};

export default SellerSideBar;
