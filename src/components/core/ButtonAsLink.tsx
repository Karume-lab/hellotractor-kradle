import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Loader from "../ui/Loader";

interface ButtonAsLinkProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  redirectTo: string;
  children?: ReactNode;
  className?: string;
  text?: string;
  loadingText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const ButtonAsLink = React.forwardRef<HTMLButtonElement, ButtonAsLinkProps>(
  (
    {
      redirectTo,
      children,
      className,
      text,
      loadingText = "Loading",
      isLoading = false,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        asChild
        ref={ref}
        disabled={isLoading || disabled}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <Link href={redirectTo}>
          {isLoading ? (
            <>
              <Loader className="h-4 w-4" />
              <span>{loadingText}</span>
            </>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              <span>{text || children}</span>
            </>
          )}
        </Link>
      </Button>
    );
  }
);

ButtonAsLink.displayName = "ButtonAsLink";

export default ButtonAsLink;
