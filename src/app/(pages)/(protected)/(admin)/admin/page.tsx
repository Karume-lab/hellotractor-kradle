import { LinkAsButton } from "@/components";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/urls";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div>Admin</div>
      <Button asChild>
        <Link href={urls.PUBLIC_ADMIN_MANAGE_TASKS}>Tasks</Link>
      </Button>

      <LinkAsButton
        redirectTo={urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS}
        text="Trained Operators"
      />
    </>
  );
};

export default Dashboard;
