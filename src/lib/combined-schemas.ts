import { z } from "zod";
import { buyerSchema, profileSchema, sellerSchema } from "./schemas";

export const buyerXProfileSchema = buyerSchema.merge(profileSchema);
export const sellerXProfileSchema = sellerSchema.merge(profileSchema);

export type T_BuyerXProfileSchema = z.infer<typeof buyerXProfileSchema>;
export type T_SellerXProfileSchema = z.infer<typeof sellerXProfileSchema>;
