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
          <div className="flex h-full min-h-screen">
            {/* Sidebar */}
            <div className="flex-shrink-0">
              <SideBar />
            </div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
              <SidebarTrigger />
              <AuthenticatedHeader />
              <div className="flex-grow">{children}</div>
            </main>
          </div>
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
