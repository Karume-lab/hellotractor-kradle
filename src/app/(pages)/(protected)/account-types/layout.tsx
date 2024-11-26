import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import SignOut from "@/components/auth/SignOutButton";
import { SharedLayout } from "@/layouts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { SessionProvider } from "@/providers/SessionProvider";
import { AccountTypeSwitcher } from "@/components";

export default async function AccountTypesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user) {
    redirect(urls.AUTH);
  }

  return (
    <SharedLayout>
      <SessionProvider session={session.session} user={session.user}>
        <div className="w-full">
          <nav className="border-b">
            <div>
              <AccountTypeSwitcher />
              {session.user.role === UserRole.ADMIN && (
                <Button asChild>
                  <Link href={urls.PUBLIC_ADMIN}>Admin Panel</Link>
                </Button>
              )}
              <SignOut children="Sign out" />
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </SessionProvider>
    </SharedLayout>
  );
}
