"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";

interface BackButtonProps extends ButtonProps {
  backText?: string;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const router = useRouter();

  return (
    <Button {...props} onClick={router.back} type="button">
      {props.backText ?? "Go Back"}
    </Button>
  );
};

export default BackButton;
