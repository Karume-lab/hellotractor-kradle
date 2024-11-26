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
    <SharedLayout>
      <SessionProvider session={session.session} user={session.user}>
        <SidebarProvider>
          <SideBar />
          <main className="w-full">
            <SidebarTrigger />
            <AuthenticatedHeader />
            <div>{children}</div>
          </main>
        </SidebarProvider>
      </SessionProvider>
    </SharedLayout>
  ) : (
    <SharedLayout>
      <Header />
      {children}
    </SharedLayout>
  );
}
