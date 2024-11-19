import { TypeOf, z } from "zod";

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

export const sellerSchema = profileSchema.merge(
  z.object({
    // services: z.array(z.string()),
  })
);
export type T_SellerSchema = z.infer<typeof sellerSchema>;

export const buyerSchema = profileSchema.merge(
  z.object({
    // services: z.array(z.string()),
  })
);
export type T_BuyerSchema = z.infer<typeof buyerSchema>;

export const businessSchema = z.object({
  name: z.string(),
  slogan: z.string().optional(),
  bio: z.string().optional(),
  openingHours: z.string().optional(),
  services: z.array(z.string()),
});
export type T_BusinessSchema = z.infer<typeof businessSchema>;
