import { AuthenticatedHeader, Header } from "@/components";
import { SharedLayout } from "@/layouts";
import { validateRequest } from "@/lib/lucia";
import { SessionProvider } from "@/providers/SessionProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "@/components/core/SideBar";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return session?.user ? (
    <SidebarProvider>
      <SharedLayout>
        <SessionProvider session={session.session} user={session.user}>
          <AuthenticatedHeader />
          <SidebarTrigger />
          <SideBar />
          <main>
            <div>{children}</div>
          </main>
        </SessionProvider>
      </SharedLayout>
    </SidebarProvider>
  ) : (
    <SharedLayout>
      <Header />
      {children}
    </SharedLayout>
  );
}
