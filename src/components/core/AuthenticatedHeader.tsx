"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { urls } from "@/lib/urls";
import AccountTypeSwitcher from "../auth/AccountTypeSwitcher";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import SignOut from "../auth/SignOutButton";
import { useSession } from "@/providers/SessionProvider";
import { SidebarTrigger } from "../ui/sidebar";

const AuthenticatedHeader = () => {
  const { user } = useSession();

  return (
    <header className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center">
        <SidebarTrigger />
      </div>

      <nav className="flex items-center gap-x-4">
        <AccountTypeSwitcher />
        {user.role === UserRole.ADMIN && (
          <Button asChild>
            <Link href={urls.PUBLIC_ADMIN}>Admin Panel</Link>
          </Button>
        )}
        <SignOut children="Sign out" />
      </nav>
    </header>
  );
};

export default AuthenticatedHeader;
