import { SharedLayout } from "@/layouts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SharedLayout>{children}</SharedLayout>;
}
