"use client";
import { useSession } from "@/providers/SessionProvider";
import React from "react";

const ExplorePage = () => {
  const { accountType } = useSession();
  return <div>{accountType?.label}</div>;
};

export default ExplorePage;
