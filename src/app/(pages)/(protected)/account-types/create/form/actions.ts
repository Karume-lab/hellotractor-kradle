"use server";

import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import {
  T_BuyerSchema,
  T_ProfileSchema,
  T_SellerSchema,
  T_ServiceSchema,
  T_TrainedOperatorSchema,
} from "@/lib/schemas";
import { UserRole } from "@prisma/client";

export const createEditSellerAccount = async (
  values: T_SellerSchema,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();

  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  if (isEditing) {
    const updatedSeller = await prisma.seller.update({
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
    const newSeller = await prisma.seller.create({
      data: {
        profileId: user.profile.id,
        ...values,
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
};

export const createEditBuyerAccount = async (
  values: T_BuyerSchema,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  if (isEditing) {
    const updatedBuyer = await prisma.buyer.update({
      where: {
        profileId: user?.profile?.id,
      },
      data: { ...values },
    });

    return {
      message: "Account updated successfully",
      buyer: updatedBuyer,
    };
  } else {
    const newBuyer = await prisma.buyer.create({
      data: {
        profileId: user.profile.id,
        ...values,
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
};

export const createEditTrainedOperator = async (
  values: T_TrainedOperatorSchema,
  id?: string,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();
  if (!user || user.role !== UserRole.ADMIN) {
    throw new Error("Unauthorized");
  }

  const transformedData = {
    ...values,
    services: values.services
      ? {
          create: values.services.map((service) => ({
            title: service.title,
            description: service.description || "",
            price: service.price,
          })),
        }
      : undefined,
  };

  if (isEditing && id) {
    const updatedTrainedOperator = await prisma.trainedOperator.update({
      where: {
        id: id,
      },
      data: transformedData,
    });

    return {
      message: "Account updated successfully",
      trainedOperator: updatedTrainedOperator,
    };
  } else {
    const newTrainedOperator = await prisma.trainedOperator.create({
      data: {
        ...transformedData,
      },
    });

    return {
      message: "Account created successfully",
      trainedOperator: newTrainedOperator,
    };
  }
};

export const createEditProfile = async (
  values: T_ProfileSchema,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  if (isEditing) {
    const updatedProfile = await prisma.profile.update({
      where: {
        userId: user?.id,
      },
      data: { ...values },
    });

    return {
      message: "Profile updated successfully",
      profile: updatedProfile,
    };
  } else {
    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        ...values,
      },
    });

    return {
      message: "Profile created successfully",
      profile: newProfile,
    };
  }
};

interface CreateTrainedOperatorServicesArgs {
  trainedOperatorId: string | null;
  services: T_ServiceSchema[];
}

export const createTrainedOperatorServices = async (
  args: CreateTrainedOperatorServicesArgs
) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const servicePromises = args.services.map(async (service) => {
    const serviceData: any = {
      title: service.title,
      description: service.description,
      price: service.price,

      certificates: service.certificates?.length
        ? service.certificates.map((certificate) => ({
            path: certificate.path,
            extension: certificate.extension,
            category: certificate.category,
            description: certificate.description,
          }))
        : undefined,
      ...(user?.profile?.trainedOperatorId
        ? { trainedOperatorId: user?.profile.trainedOperatorId }
        : {}),
    };

    const newService = await prisma.service.create({
      data: {
        trainedOperatorId: args.trainedOperatorId,
        ...serviceData,
      },
    });

    return {
      message: `Service ${newService.title} created successfully`,
      service: newService,
    };
  });

  const results = await Promise.all(servicePromises);

  return {
    message: `Processed ${results.length} services successfully.`,
    results,
  };
};
