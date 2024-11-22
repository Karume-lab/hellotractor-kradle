import React from "react";
import BaseSideBar from "../core/BaseSideBar";
import { T_SideBarItem } from "@/lib/types";
import { Home } from "lucide-react";
import { urls } from "@/lib/urls";

const SHARED_SIDEBAR_ITEMS: T_SideBarItem[] = [
  {
    Icon: Home,
    label: "Home",
    redirectTo: urls.EXPLORE,
  },
];

const SELLER_SIDEBAR_ITEMS: T_SideBarItem[] = [...SHARED_SIDEBAR_ITEMS];

const SellerSideBar = () => {
  return <BaseSideBar items={SELLER_SIDEBAR_ITEMS} />;
};

export default SellerSideBar;
