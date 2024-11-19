"use server";
import { KINDLY_WAIT } from "@/lib/constants";
import { googleOAuthClient } from "@/lib/google-o-auth";
import { lucia } from "@/lib/lucia";
import { messages } from "@/lib/message-template";
import prisma from "@/lib/prisma";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  T_ResetPassword,
  T_SignInSchema,
  T_SignUpSchema,
} from "@/lib/schemas";
import { urls } from "@/lib/urls";
import { generateCodeVerifier, generateState } from "arctic";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export const signUp = async (values: T_SignUpSchema) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return { message: "User already exists", success: false };
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        hashPassword: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      message: `Account created successfully, ${KINDLY_WAIT}`,
      success: true,
    };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};

export const signIn = async (values: T_SignInSchema) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!user || !user.hashPassword) {
      return { message: "Invalid email or password", success: false };
    }

    const doesPasswordMatch = await new Argon2id().verify(
      user.hashPassword,
      values.password
    );

    if (!doesPasswordMatch) {
      return { message: "Invalid email or password", success: false };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return {
      message: `Login success, ${KINDLY_WAIT}`,
      success: true,
    };
  } catch (error) {
    return { message: "Something went wrong", success: false };
  }
};

export const signOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect(urls.AUTH);
};

export const getGoogleOAuthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const isProduction = process.env.NODE_ENV === "production";
    const sameSiteValue = isProduction ? "none" : "lax";
    const secureFlag = isProduction;

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: sameSiteValue,
    });

    cookies().set("state", state, {
      httpOnly: true,
      secure: secureFlag,
      sameSite: sameSiteValue,
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      ["email"]
    );

    return { url: authUrl.toString(), success: true };
  } catch (error) {
    return {
      message: "Something went wrong. Please try again.",
      success: false,
    };
  }
};

export async function forgotPasswordAction(rawInput: unknown) {
  try {
    const { email } = forgotPasswordSchema.parse(rawInput);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const token = generateId(40);

      await prisma.passwordResetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        },
      });

      // TODO: Implement email sending logic
      // sendPasswordResetEmail(user.email, token);
      console.log(
        messages.PASSWORD_RESET(urls.FULL_RESET_PASSWORD_TOKEN(token))
      );
    }

    return {
      success: true,
      message: "If an account exists, a password reset link has been sent.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
export async function validatePasswordResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!resetToken) return null;

  return resetToken;
}

export async function resetPasswordAction(values: T_ResetPassword) {
  const { token, password } = resetPasswordSchema.parse(values);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      expiresAt: { gt: new Date() },
    },
    include: { user: true },
  });

  if (!resetToken) {
    return { success: false, message: "Invalid or expired token" };
  }

  const hashedPassword = await new Argon2id().hash(password);

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { hashPassword: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: resetToken.id },
  });

  return {
    success: true,
    message: `Password reset successfully. ${KINDLY_WAIT}`,
  };
}
