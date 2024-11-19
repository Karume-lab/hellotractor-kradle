import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import { SessionProvider } from "@/providers/SessionProvider";
import { UserRole } from "@prisma/client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  if (!session.user || session.user.role !== UserRole.ADMIN) {
    redirect(urls.PUBLIC_TASKS);
  }

  return (
    <SessionProvider session={session.session} user={session.user}>
      <div className="min-h-screen bg-background">
        <NuqsAdapter>{children}</NuqsAdapter>
      </div>
    </SessionProvider>
  );
}
