import { z } from "zod";
import {
  buyerSchema,
  profileSchema,
  sellerSchema,
  trainedOperatorSchema,
} from "./schemas";

export const buyerXProfileSchema = buyerSchema.merge(profileSchema);
export type T_BuyerXProfileSchema = z.infer<typeof buyerXProfileSchema>;

export const sellerXProfileSchema = sellerSchema.merge(profileSchema);
export type T_SellerXProfileSchema = z.infer<typeof sellerXProfileSchema>;

export const trainedOperatorXProfileSchema =
  trainedOperatorSchema.merge(profileSchema);
export type T_TrainedOperatorXProfileSchema = z.infer<
  typeof trainedOperatorXProfileSchema
>;
