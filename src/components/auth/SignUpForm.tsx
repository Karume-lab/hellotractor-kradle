"use client";
import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
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
import { signUpSchema, T_SignUpSchema } from "@/lib/schemas";
import { signUp } from "@/app/(pages)/auth/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import LoadingButton from "../core/LoadingButton";

const SignUpForm = () => {
  const form = useForm<T_SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOnSubmit = async (values: T_SignUpSchema) => {
    startTransition(async () => {
      const { message, success } = await signUp(values);
      if (success) {
        toast.success(message);
        form.reset();
        router.push(urls.ACCOUNT_TYPES);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Begin your journey ...</CardTitle>
        <CardDescription>Sign up to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password ..."
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
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
                      placeholder="Enter your password again ..."
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              disabled={isPending}
              text="Sign up"
              loadingText="Signing up"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
