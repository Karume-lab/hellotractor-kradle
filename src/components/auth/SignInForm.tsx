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
import { signInSchema, T_SignInSchema } from "@/lib/schemas";
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
import { signIn } from "@/app/(pages)/auth/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import LoadingButton from "../core/LoadingButton";
import Link from "next/link";
import { Button } from "../ui/button";

const SignInForm = () => {
  const form = useForm<T_SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOnSubmit = async (values: T_SignInSchema) => {
    setIsDisabled(true);
    const res = await signIn(values);

    if (res.success) {
      toast.success(res.message);
      router.push(urls.ACCOUNT_TYPES);
    } else {
      toast.error(res.message);
    }
    setIsDisabled(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
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
            <LoadingButton
              type="submit"
              disabled={isDisabled}
              text="Sign in"
              loadingText="Signing in"
            />
            <Button variant={"link"} asChild>
              <Link href={urls.RESET_PASSWORD}>
                Forgot your password? Reset it here.
              </Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
