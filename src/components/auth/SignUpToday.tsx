import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { urls } from "@/lib/urls";

interface SignUpTodayProps {}
const SignUpToday: React.FC<SignUpTodayProps> = ({}) => {
  return (
    <Button asChild>
      <Link href={urls.AUTH}>Sign up today!</Link>
    </Button>
  );
};

export default SignUpToday;
