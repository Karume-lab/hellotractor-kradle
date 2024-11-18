"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, T_ResetPassword } from "@/lib/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/app/(pages)/auth/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "../core/LoadingButton";
import { useState } from "react";
import { urls } from "@/lib/urls";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<T_ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const handleOnSubmit = async (data: T_ResetPassword) => {
    setIsLoading(true);
    try {
      const result = await resetPasswordAction(data);

      if (result.success) {
        toast.success("Password reset successfully");
        router.push(urls.AUTH);
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          text="Reset Password"
          loadingText="Resetting..."
          className="w-full"
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
