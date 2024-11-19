"use client";
import { useSession } from "@/providers/SessionProvider";
import React from "react";

const Dashboard = () => {
  const { accountType } = useSession();
  return <div>{accountType?.label}</div>;
};

export default Dashboard;
