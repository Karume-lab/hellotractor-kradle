"use server";
import { T_AttachmentXEquipmentSchema } from "@/lib/combined-schemas";
import { validateRequest } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { attachmentSchema, equipmentSchema } from "@/lib/schemas";

interface T_AttachmentXEquipmentWithId extends T_AttachmentXEquipmentSchema {
  attachmentId?: string;
  equipmentId?: string;
}

export const createEditAttachment = async (
  values: T_AttachmentXEquipmentWithId,
  isEditing: boolean = false
) => {
  const { user } = await validateRequest();
  if (!user || !user.profile?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const attachmentValues = attachmentSchema.parse(values);
    const equipmentValues = equipmentSchema.parse(values);

    return await prisma.$transaction(async (tx) => {
      if (isEditing) {
        if (!values.attachmentId || !values.equipmentId) {
          throw new Error("Missing ID(s) for editing.");
        }

        const updatedEquipment = await tx.equipment.update({
          where: {
            id: values.equipmentId,
          },
          data: {
            ...equipmentValues,
          },
        });

        const updatedAttachment = await tx.attachment.update({
          where: {
            id: values.attachmentId,
          },
          data: {
            ...attachmentValues,
            equipmentId: updatedEquipment.id,
          },
        });

        return {
          message: "Attachment updated successfully",
          equipment: updatedEquipment,
          attachment: updatedAttachment,
        };
      } else {
        const equipment = await tx.equipment.create({
          data: {
            sellerId: user.profile?.seller?.id,
            ...equipmentValues,
          },
        });

        const attachment = await tx.attachment.create({
          data: {
            equipmentId: equipment.id,
            ...attachmentValues,
          },
        });

        return {
          message: "Attachment created successfully",
          equipment,
          attachment,
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
