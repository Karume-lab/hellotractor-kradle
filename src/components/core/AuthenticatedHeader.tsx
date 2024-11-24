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
import { Monitor } from "lucide-react";
import SignUpToday from "../auth/SignUpToday";
import ThemeChanger from "./ThemeChanger";
import Image from "next/image";
import { Button } from "../ui/button";
import { urls } from "@/lib/urls";
import AccountTypeSwitcher from "../auth/AccountTypeSwitcher";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import SignOut from "../auth/SignOutButton";
import { useSession } from "@/providers/SessionProvider";

const AuthenticatedHeader = () => {
  const { user } = useSession();

  return (
    <header className="flex flex-row items-center  justify-between px-2">
      <Image
        src="/img/Core/Logos/HT_LOGO_RGB_Orange.png"
        alt="logo"
        width={150}
        height={150}
      />

      <nav className="border-b">
        <div className="container mx-auto py-4 flex justify-end gap-x-4">
          <AccountTypeSwitcher />
          {user.role === UserRole.ADMIN && (
            <Button asChild>
              <Link href={urls.PUBLIC_ADMIN}>Admin Panel</Link>
            </Button>
          )}
          <SignOut children="Sign out" />
        </div>
      </nav>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Browse</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex flex-row gap-4 items-center">
        <ThemeChanger />
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
