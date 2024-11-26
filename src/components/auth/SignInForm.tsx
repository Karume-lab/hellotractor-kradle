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
import LinkAsButton from "../core/LinkAsButton";
import { ContinueWithGoogleButton } from "..";
import Image from "next/image";

const SignInForm = () => {
  const form = useForm<T_SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOnSubmit = async (values: T_SignInSchema) => {
    startTransition(async () => {
      const { message, success } = await signIn(values);
      if (success) {
        toast.success(message);
        router.push(urls.ACCOUNT_TYPES);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between  p-6">
      {/* Left Section */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left w-full md:w-1/2 space-y-6">
        <Image
          src="/img/Core/Logos/HT_LOGO_RGB_Orange.png"
          alt="Logo"
          height={150}
          width={150}
          className="mb-4"
        />
        <p className="text-3xl font-bold text-gray-800">Welcome Back!</p>
        <p className="text-lg text-gray-600">
          Sign in to access your account and continue exploring amazing
          features.
        </p>
      </div>

      {/* Right Section */}
      <Card className="w-full md:w-1/2 max-w-lg bg-white shadow-xl rounded-lg p-6">
        <CardHeader className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-600">Enter your credentials below.</p>
        </CardHeader>
        <CardContent>
          {/* Google Sign-In Button */}
          <ContinueWithGoogleButton />

          {/* Divider */}
          <div className="my-4 flex items-center space-x-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-4"
            >
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Sign-In Button */}
              <LoadingButton
                type="submit"
                disabled={isPending}
                text="Sign in"
                loadingText="Signing in"
                className="w-full py-2 bg-primary text-white rounded-md shadow transition"
              />

              {/* Forgot Password Link */}
              <LinkAsButton
                variant={"link"}
                asChild
                text="Forgot your password? Reset it here."
                redirectTo={urls.RESET_PASSWORD}
                className="block text-center text-sm text-primary hover:underline"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignInForm;
