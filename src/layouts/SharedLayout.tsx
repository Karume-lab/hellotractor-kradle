import { defaultMetadata } from "@/config/metadata";
import { PropsWithChildren } from "react";
import { geistSans, geistMono } from "@/config/fonts";
import "@/styles/globals.css";
import { BaseProviders } from "@/components";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
        <BaseProviders>
          <NuqsAdapter>{children}</NuqsAdapter>
        </BaseProviders>
      </body>
    </html>
  );
};

export default SharedLayout;
