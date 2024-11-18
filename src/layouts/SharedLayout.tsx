import { defaultMetadata } from "@/config/metadata";
import { PropsWithChildren } from "react";
import { geistSans, geistMono } from "@/config/fonts";
import "@/styles/globals.css";
import { BaseProviders } from "@/components";

export const metadata = defaultMetadata;

interface SharedLayoutProps extends PropsWithChildren {
  className?: string;
}

const SharedLayout = ({ children, className = "" }: SharedLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${className}`}
      >
        <BaseProviders>{children}</BaseProviders>
      </body>
    </html>
  );
};

export default SharedLayout;
