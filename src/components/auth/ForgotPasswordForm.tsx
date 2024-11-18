"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, T_ForgotPassword } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import LoadingButton from "../core/LoadingButton";
import { forgotPasswordAction } from "@/app/(pages)/auth/action";
import BackButton from "../core/BackButton";

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (values: T_ForgotPassword) => {
    setIsLoading(true);
    try {
      const result = await forgotPasswordAction(values);

      if (result.success) {
        toast.success("Password reset link sent", {
          description: "Check your email for further instructions",
        });
      } else {
        toast.error("Error", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Unexpected error", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-4">
              <BackButton variant="outline" />
              <LoadingButton
                type="submit"
                text="Send reset link"
                loadingText="Sending reset link"
                isLoading={isLoading}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
