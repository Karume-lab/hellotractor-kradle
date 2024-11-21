import { Header } from "@/components";
import { SharedLayout } from "@/layouts";
import { validateRequest } from "@/lib/lucia";
import { SessionProvider } from "@/providers/SessionProvider";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return session?.user ? (
    <SessionProvider session={session.session} user={session.user}>
      <SharedLayout>
        <Header />
        {children}
      </SharedLayout>
    </SessionProvider>
  ) : (
    <SharedLayout>
      <Header />
      {children}
    </SharedLayout>
  );
}
