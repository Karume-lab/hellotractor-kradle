"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/app/(pages)/auth/action";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";

interface SignOutProps {
  children: React.ReactNode;
}

const SignOut: React.FC<SignOutProps> = ({ children }) => {
  const { setAccountType } = useSession();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    try {
      queryClient.clear();
      setAccountType(null);
      await signOut();
    } catch (error) {}
  };

  return <Button onClick={handleSignOut}>{children}</Button>;
};

export default SignOut;
