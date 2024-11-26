import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { urls } from "@/lib/urls";
import { SharedLayout } from "@/layouts";
import { SessionProvider } from "@/providers/SessionProvider";
import { AuthenticatedHeader } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "@/components/core/SideBar";

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
      <SessionProvider session={session.session} user={session.user}>
        <SidebarProvider>
          <SidebarTrigger />
          {/* Sidebar */}
          <div className="flex-shrink-0">
            <SideBar />
          </div>
          <div className="w-full">
            <AuthenticatedHeader />
            <main>{children}</main>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </SharedLayout>
  );
}
