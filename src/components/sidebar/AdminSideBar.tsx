import React from "react";
import BaseSideBar from "../core/BaseSideBar";
import { T_SideBarItem } from "@/lib/types";

const ADMIN_SELLER_SHARED_SIDEBAR_ITEMS: T_SideBarItem[] = [];

const ADMIN_SIDEBAR_ITEMS: T_SideBarItem[] = [
  ...ADMIN_SELLER_SHARED_SIDEBAR_ITEMS,
];

const AdminSideBar = () => {
  return <BaseSideBar items={ADMIN_SIDEBAR_ITEMS} />;
};

export { AdminSideBar, ADMIN_SELLER_SHARED_SIDEBAR_ITEMS };
