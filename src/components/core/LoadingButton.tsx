import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loader from "../ui/Loader";

interface LoadingButtonProps extends ButtonProps {
  text?: string;
  loadingText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      text,
      loadingText = "Loading",
      isLoading = false,
      className,
      children,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading}
        className={cn("flex items-center gap-2 w-full", className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader className="h-4 w-4" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            <span>{text}</span>
          </>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
