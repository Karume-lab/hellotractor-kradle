"use client";
import React, { useEffect, useState } from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvier";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

interface BaseProvidersProps {
  children: React.ReactNode;
}

const BaseProviders: React.FC<BaseProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        {children}
        <Toaster richColors />
      </ReactQueryProvider>
    </ThemeProvider>
  );
};

export default BaseProviders;
