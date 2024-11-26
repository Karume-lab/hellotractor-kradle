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
import Image from "next/image";

interface BaseSideBarProps {
  items: T_SideBarItem[];
}

const BaseSideBar: React.FC<BaseSideBarProps> = ({ items }) => {
  return (
    <Sidebar>
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
                  <SidebarMenuButton asChild>
                    <Link
                      href={redirectTo}
                      className="flex flex-col items-center gap-1 h-fit lg:gap-0"
                    >
                      <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
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
