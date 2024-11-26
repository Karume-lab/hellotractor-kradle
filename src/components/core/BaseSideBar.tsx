"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { T_SideBarItem } from "@/lib/types";
import Image from "next/image";

interface BaseSideBarProps {
  items: T_SideBarItem[];
}

const BaseSideBar: React.FC<BaseSideBarProps> = ({ items }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Image
                  src="/img/Core/Logos/HT_LOGO_RGB_Orange.png"
                  alt="logo"
                  width={150}
                  height={150}
                />
              </SidebarMenuItem>
              {items.map(({ Icon, redirectTo, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton>
                    <Link href={redirectTo} className="flex gap-2">
                      <Icon />
                      <span className="text-xs lg:text-sm text-center mt-1">
                        {label}
                      </span>
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
