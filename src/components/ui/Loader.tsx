import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <Loader2 className={cn("mx-auto animate-spin", className)} />;
};

export default Loader;
