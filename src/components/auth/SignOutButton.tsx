"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/app/(pages)/auth/action";
import { useQueryClient } from "@tanstack/react-query";

interface SignOutProps {
  children: React.ReactNode;
}

const SignOut: React.FC<SignOutProps> = ({ children }) => {
  const queryClient = useQueryClient();
  return (
    <Button
      onClick={() => {
        queryClient.clear();
        signOut();
      }}
    >
      {children}
    </Button>
  );
};

export default SignOut;
