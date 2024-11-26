import React from "react";
import BaseSideBar from "../core/BaseSideBar";
import { T_SideBarItem } from "@/lib/types";
import {
  Handshake,
  LayoutDashboard,
  ShieldCheck,
  Tractor,
  Unlink2,
} from "lucide-react";
import { urls } from "@/lib/urls";

const ADMIN_SELLER_SHARED_SIDEBAR_ITEMS: T_SideBarItem[] = [];

const ADMIN_SIDEBAR_ITEMS: T_SideBarItem[] = [
  ...ADMIN_SELLER_SHARED_SIDEBAR_ITEMS,
  {
    Icon: LayoutDashboard,
    label: "Dashboard",
    redirectTo: urls.DASHBOARD,
  },
  {
    Icon: Tractor,
    label: "Tractors",
    redirectTo: urls.PUBLIC_ADMIN_MANAGE_TRACTORS,
  },
  {
    Icon: Unlink2,
    label: "Attachments",
    redirectTo: urls.PUBLIC_ADMIN_MANAGE_ATTACHMENTS,
  },
  {
    Icon: ShieldCheck,
    label: "Trained Operators",
    redirectTo: urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS,
  },
  {
    Icon: Handshake,
    label: "Dealers",
    redirectTo: urls.PUBLIC_ADMIN_MANAGE_DEALERS,
  },
];

const AdminSideBar = () => {
  return <BaseSideBar items={ADMIN_SIDEBAR_ITEMS} />;
};

export { AdminSideBar, ADMIN_SELLER_SHARED_SIDEBAR_ITEMS };
