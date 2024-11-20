"use server";
import {
  T_BuyerXProfileSchema,
  T_SellerXProfileSchema,
} from "@/lib/combined-schemas";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { buyerSchema, profileSchema, sellerSchema } from "@/lib/schemas";
import { Buyer, Seller } from "@prisma/client";

interface SellerActionResponse {
  message: string;
  seller: Seller;
}

export const createEditSellerAccount = async (
  values: T_SellerXProfileSchema,
  isEditing: boolean = false
): Promise<SellerActionResponse> => {
  const { user } = await validateRequest();

  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const profileValues = profileSchema.parse(values);
  const sellerValues = sellerSchema.parse(values);

  return await prisma.$transaction(async (tx) => {
    const updatedProfile = await tx.profile.update({
      data: {
        ...profileValues,
      },
      where: {
        id: user?.profile?.id,
      },
    });

    if (isEditing) {
      const updatedSeller = await tx.seller.update({
        where: {
          profileId: user?.profile?.id,
        },
        data: {},
        include: {
          profile: true,
        },
      });

      return {
        message: "Account updated successfully",
        seller: updatedSeller,
      };
    } else {
      const newSeller = await tx.seller.create({
        data: {
          profileId: user?.profile?.id!,
          ...sellerValues,
        },
        include: {
          profile: true,
        },
      });

      return {
        message: "Account created successfully",
        seller: newSeller,
      };
    }
  });
};

interface BuyerActionResponse {
  message: string;
  buyer: Buyer;
}

export const createEditBuyerAccount = async (
  values: T_BuyerXProfileSchema,
  isEditing: boolean = false
): Promise<BuyerActionResponse> => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const buyerValues = buyerSchema.parse(values);
  const profileValues = profileSchema.parse(values);

  return await prisma.$transaction(async (tx) => {
    const updatedProfile = await tx.profile.update({
      data: {
        ...profileValues,
      },
      where: {
        id: user?.profile?.id,
      },
    });

    if (isEditing) {
      const updatedBuyer = await tx.buyer.update({
        where: {
          profileId: user?.profile?.id,
        },
        data: {},
        include: {
          profile: true,
        },
      });

      return {
        message: "Account updated successfully",
        buyer: updatedBuyer,
      };
    } else {
      const newBuyer = await tx.buyer.create({
        data: {
          profileId: user?.profile?.id!,
          ...buyerValues,
        },
        include: {
          profile: true,
        },
      });

      return {
        message: "Account created successfully",
        buyer: newBuyer,
      };
    }
  });
};
