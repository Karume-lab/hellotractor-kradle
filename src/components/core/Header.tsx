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
import { Check, Monitor } from "lucide-react";
import { Button } from "../ui/button";
import SignUpToday from "../auth/SignUpToday";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Monitor />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li onClick={() => setTheme("system")}>
                {theme === "system" && <Check size={5} />}
                <Button>System</Button>
              </li>
            </ul>
            <ul>
              <li onClick={() => setTheme("dark")}>
                {theme === "dark" && <Check size={5} />}
                <Button>Dark</Button>
              </li>
            </ul>
            <ul>
              <li onClick={() => setTheme("light")}>
                {theme === "light" && <Check size={5} />}
                <Button>Light</Button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <SignUpToday />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Header;
