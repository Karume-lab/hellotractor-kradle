"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { T_SideBarItem } from "@/lib/types";

interface BaseSideBarProps {
  items: T_SideBarItem[];
}

const BaseSideBar: React.FC<BaseSideBarProps> = ({ items }) => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ Icon, redirectTo, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton asChild>
                    <Link href={redirectTo}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default BaseSideBar;
