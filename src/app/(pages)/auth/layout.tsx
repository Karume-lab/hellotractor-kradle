import { SharedLayout } from "@/layouts";
import { validateRequest } from "@/lib/lucia";
import { urls } from "@/lib/urls";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (session) {
    redirect(urls.EXPLORE);
  }

  return <SharedLayout>{children}</SharedLayout>;
}
