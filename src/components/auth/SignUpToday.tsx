import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { urls } from "@/lib/urls";

interface SignUpTodayProps {}
const SignUpToday = React.forwardRef<HTMLAnchorElement, SignUpTodayProps>(
  (_, ref) => {
    return (
      <Button asChild>
        <Link href={urls.AUTH} ref={ref}>
          Sign up today!
        </Link>
      </Button>
    );
  }
);

SignUpToday.displayName = "SignUpToday";

export default SignUpToday;
