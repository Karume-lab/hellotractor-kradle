import { z } from "zod";
import { EquipmentCondition } from "@prisma/client";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type T_SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do no match",
    path: ["confirmPassword"],
  });
export type T_SignUpSchema = z.infer<typeof signUpSchema>;

export const createTaskSchema = z.object({
  title: z.string(),
});
export type T_CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const filterSchema = z.object({
  title: z.string().optional(),
});
export type T_FilterSchema = z.infer<typeof filterSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type T_ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do no match",
    path: ["confirmPassword"],
  });
export type T_ResetPassword = z.infer<typeof resetPasswordSchema>;

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  // profilePicture: z.string().optional(),
});
export type T_ProfileSchema = z.infer<typeof profileSchema>;

export const sellerSchema = z.object({
  businessOpeningHours: z.string().optional(),
  businessName: z.string().optional(),
  businessSlogal: z.string().optional(),
  businessBio: z.string().optional(),
  // services: z.array(z.string()),
});
export type T_SellerSchema = z.infer<typeof sellerSchema>;

export const buyerSchema = z.object({});
export type T_BuyerSchema = z.infer<typeof buyerSchema>;

export const equipmentSchema = z.object({
  name: z.string().min(1, "Equipment name is required"),
  description: z.string().optional(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .refine(
      (value) => {
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      },
      {
        message: "Price must be a valid number with up to 2 decimal places",
      }
    ),
  condition: z.nativeEnum(EquipmentCondition).optional(),
});

export type T_EquipmentSchema = z.infer<typeof equipmentSchema>;

export const tractorSchema = equipmentSchema.merge(
  z.object({
    mileage: z.string(),
    fuelCapacity: z.string(),
  })
);
export type T_TractorSchema = z.infer<typeof tractorSchema>;
