import { defaultMetadata } from "@/config/metadata";
import { PropsWithChildren } from "react";
import { geistSans, geistMono } from "@/config/fonts";
import "@/styles/globals.css";

export const metadata = defaultMetadata;

interface RootLayoutProps extends PropsWithChildren {
  className?: string;
}

const RootLayout = ({ children, className = "" }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${className}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
