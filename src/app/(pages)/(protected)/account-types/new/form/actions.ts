"use server";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import {
  buyerSchema,
  sellerSchema,
  T_BuyerSchema,
  T_SellerSchema,
} from "@/lib/schemas";

export const createSellerAccount = async (values: T_SellerSchema) => {
  const { user } = await validateRequest();

  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const validatedValues = sellerSchema.parse(values);

  await prisma.profile.update({
    data: {
      ...validatedValues,
    },
    where: {
      id: user.profile.id,
    },
  });

  await prisma.seller.create({
    data: {
      profileId: user.profile.id,
      ...values,
    },
  });

  return { message: "Account created successfully" };
};

export const createBuyerAccount = async (values: T_BuyerSchema) => {
  const { user } = await validateRequest();

  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const validatedValues = buyerSchema.parse(values);

  await prisma.profile.update({
    data: {
      ...validatedValues,
    },
    where: {
      id: user.profile.id,
    },
  });

  await prisma.buyer.create({
    data: {
      profileId: user.profile.id,
    },
  });

  return { message: "Account created successfully" };
};
