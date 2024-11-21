"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { Monitor } from "lucide-react";
import SignUpToday from "../auth/SignUpToday";
import ThemeChanger from "./ThemeChanger";
import Image from "next/image";
import { Button } from "../ui/button";


const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex flex-row items-center  justify-between px-2">
      <Image
        src="/img/Core/Logos/HT_LOGO_RGB_Orange.png"
        alt="logo"
        width={150}
        height={150} />

      <NavigationMenu>
        <NavigationMenuList >
          <NavigationMenuItem>
            Browse
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row gap-4 items-center ">
      <SignUpToday />
      <ThemeChanger />
      </div>
    </header>
  );
};

export default Header;
