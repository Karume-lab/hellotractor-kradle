import React from "react";
import SideBar from "../core/BaseSideBar";
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

const BUYER_SIDEBAR_ITEMS: T_SideBarItem[] = [...SHARED_SIDEBAR_ITEMS];

const BuyerSideBar = () => {
  return <SideBar items={BUYER_SIDEBAR_ITEMS} />;
};

export { BuyerSideBar, SHARED_SIDEBAR_ITEMS };
