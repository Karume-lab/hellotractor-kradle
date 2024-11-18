"use client";
import ReactQueryProvider from "@/providers/ReactQueryProvier";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

interface BaseProvidersProps {
  children: React.ReactNode;
}
const BaseProviders: React.FC<BaseProvidersProps> = ({ children }) => {
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
