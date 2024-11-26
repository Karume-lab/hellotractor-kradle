import { googleOAuthClient } from "@/lib/google-o-auth";
import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface OAuthResponse {
  data: {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
  };
}

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      return new Response("Invalid request", { status: 400 });
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!codeVerifier || !savedState) {
      return new Response("Invalid Request", { status: 400 });
    }

    if (state !== savedState) {
      return new Response("Invalid request", { status: 400 });
    }

    const result = await googleOAuthClient.validateAuthorizationCode(
      code,
      codeVerifier
    );

    const oauthResponse = result as OAuthResponse;
    const accessToken = oauthResponse.data.access_token;

    if (!accessToken || typeof accessToken !== "string") {
      return new Response("Invalid access token", { status: 400 });
    }

    const googleResponse = await fetch(urls.GOOGLE_USER_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleData = (await googleResponse.json()) as {
      id: string;
      email: string;
    };

    let userId: string = "";

    const existingUser = await prisma.user.findUnique({
      where: {
        email: googleData.email,
      },
    });

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const user = await prisma.user.create({
        data: {
          email: googleData.email,
        },
      });
      userId = user.id;
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.error(error);
  }
  return redirect(urls.EXPLORE);
};
