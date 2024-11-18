import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import SignOut from "@/components/auth/SignOutButton";
import { SessionProvider } from "@/providers/SessionProvider";
import { SharedLayout } from "@/layouts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";

export default async function ProtectedLayout({
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
      <SessionProvider value={session}>
        <div className="min-h-screen bg-background">
          <nav className="border-b">
            <div className="container mx-auto py-4 flex justify-end gap-x-4">
              <SignOut children="Sign out" />
              {session.user.role === UserRole.ADMIN && (
                <Button asChild>
                  <Link href={urls.PUBLIC_ADMIN}>Admin Panel</Link>
                </Button>
              )}
            </div>
          </nav>
          <main className="container mx-auto py-4">{children}</main>
        </div>
      </SessionProvider>
    </SharedLayout>
  );
}
