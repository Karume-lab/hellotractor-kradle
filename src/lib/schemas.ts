import { z } from "zod";

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
