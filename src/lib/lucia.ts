// auth.ts
import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { SITE_COOKIE_KEY } from "./constants";
import {
  UserRole,
  Buyer,
  Business,
  TrainedOperator,
  Profile,
} from "@prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

interface DatabaseUserAttributes {
  id: string;
  email: string | null;
  role: UserRole | null;
  profile:
    | (Profile & {
        buyer: Buyer | null;
        business: Business[];
        trainedOperator: TrainedOperator | null;
      })
    | null;
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: SITE_COOKIE_KEY,
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (databaseUserAttributes) => {
    return {
      id: databaseUserAttributes.id,
      email: databaseUserAttributes.email,
      role: databaseUserAttributes.role,
      profile: databaseUserAttributes.profile,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: Session | null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return { user: null, session: null };
    }

    const result = await lucia.validateSession(sessionId);
    if (result.session) {
      try {
        const userWithRelations = await prisma.user.findUnique({
          where: { id: result.user.id },
          include: {
            profile: {
              include: {
                buyer: true,
                business: true,
                trainedOperator: true,
              },
            },
          },
        });

        if (!userWithRelations) {
          return { user: null, session: result.session };
        }

        const user = {
          ...result.user,
          profile: userWithRelations.profile,
        };

        return { user, session: result.session };
      } catch (error) {
        console.error("Error fetching user with relations:", error);
        return { user: null, session: result.session };
      }
    }
    return { user: null, session: null };
  }
);
