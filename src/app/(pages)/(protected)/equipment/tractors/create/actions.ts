"use server";
import { T_TractorXEquipmentSchema } from "@/lib/combined-schemas";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { equipmentSchema, tractorSchema } from "@/lib/schemas";

interface T_TractorXEquipmentWithId extends T_TractorXEquipmentSchema {
  attachmentId?: string;
  equipmentId?: string;
}

export const createEditTractor = async (
  values: T_TractorXEquipmentWithId,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const tractorValues = tractorSchema.parse(values);
    const equipmentValues = equipmentSchema.parse(values);

    return await prisma.$transaction(async (tx) => {
      if (isEditing) {
        if (!values.equipmentId || !values.equipmentId) {
          throw new Error("Missing ID(s) for editing.");
        }

        const updatedEquipment = await tx.equipment.update({
          where: {
            id: values.equipmentId,
          },
          data: { ...equipmentValues },
        });

        const updatedTractor = await tx.tractor.update({
          where: {
            id: values.attachmentId,
          },
          data: {
            ...tractorValues,
            equipmentId: updatedEquipment.id,
          },
        });

        return {
          message: "Tractor updated successfully",
          equipment: updatedEquipment,
          attachment: updatedTractor,
        };
      } else {
        const equipment = await tx.equipment.create({
          data: {
            sellerId: user.profile?.seller?.id,
            ...equipmentValues,
          },
        });

        const tractor = await tx.tractor.create({
          data: {
            equipmentId: equipment.id,
            ...tractorValues,
          },
        });

        return {
          message: "Tractor created successfully",
          equipment,
          attachment: tractor,
        };
      }
    });
  } catch (error) {
    console.error("Attachment creation/edit error:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      error,
    };
  }
};
