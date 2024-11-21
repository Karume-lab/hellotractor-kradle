import { z } from "zod";
import { attachmentSchema, equipmentSchema, tractorSchema } from "./schemas";

export const tractorXEquipmentSchema = tractorSchema.merge(equipmentSchema);
export type T_TractorXEquipmentSchema = z.infer<typeof tractorXEquipmentSchema>;

export const attachmentXEquipmentSchema =
  attachmentSchema.merge(equipmentSchema);
export type T_AttachmentXEquipmentSchema = z.infer<
  typeof attachmentXEquipmentSchema
>;
