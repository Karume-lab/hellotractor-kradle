import React from "react";
import BaseSideBar from "../core/BaseSideBar";
import { T_SideBarItem } from "@/lib/types";
import { Home, Tractor, Heart, Inbox } from "lucide-react";
import { urls } from "@/lib/urls";

const BUYER_ONLY_SIDEBAR_ITEMS: T_SideBarItem[] = [
  {
    Icon: Home,
    label: "Home",
    redirectTo: urls.HOME,
  },
  {
    Icon: Tractor,
    label: "Explore",
    redirectTo: urls.EXPLORE,
  },
  {
    Icon: Heart,
    label: "Wishlist",
    redirectTo: urls.WISHLIST,
  },
  {
    Icon: Inbox,
    label: "Inbox",
    redirectTo: urls.INBOX,
  },
];

const BUYER_SIDEBAR_ITEMS: T_SideBarItem[] = [...BUYER_ONLY_SIDEBAR_ITEMS];

const BuyerSideBar = () => {
  return <BaseSideBar items={BUYER_SIDEBAR_ITEMS} />;
};

export default BuyerSideBar;
