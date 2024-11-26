// BaseSideBar.tsx
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
                <Link href={redirectTo} key={label}>
                  <SidebarMenuItem>
                    <div className="flex flex-col items-center gap-1">
                      <Icon size={64} />
                      <span>{label}</span>
                    </div>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default BaseSideBar;
