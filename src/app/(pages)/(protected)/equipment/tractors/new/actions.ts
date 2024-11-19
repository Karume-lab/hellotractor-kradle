"use server";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { T_TractorSchema, tractorSchema } from "@/lib/schemas";

export const createTractor = async (values: T_TractorSchema) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  const validatedValues = tractorSchema.parse(values);

  return await prisma.$transaction(async (prisma) => {
    const equipment = await prisma.equipment.create({
      data: {
        name: validatedValues.name,
        description: validatedValues.description,
        price: validatedValues.price,
        condition: validatedValues.condition,
      },
    });

    await prisma.tractor.create({
      data: {
        mileage: validatedValues.mileage,
        fuelCapacity: validatedValues.fuelCapacity,
        equipmentId: equipment.id,
      },
    });

    return { message: "Tractor created successfully" };
  });
};
