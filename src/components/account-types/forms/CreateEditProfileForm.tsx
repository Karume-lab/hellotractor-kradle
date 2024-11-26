"use client";
import { createEditProfile } from "@/app/(pages)/auth/action";
import LoadingButton from "@/components/core/LoadingButton";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ACCOUNT_TYPES_MAPPING, URL_QUERY_STATES } from "@/lib/constants";
import { profileDefaultValues } from "@/lib/form-defaults";
import { profileSchema, T_ProfileSchema } from "@/lib/schemas";
import { urls } from "@/lib/urls";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateEditProfileForm = () => {
  const form = useForm<T_ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...profileDefaultValues,
    },
  });

  const router = useRouter();
  const [accountType] = useQueryState(URL_QUERY_STATES.accountType, parseAsString);

  const validAccountType =
    accountType &&
    ACCOUNT_TYPES_MAPPING[accountType as keyof typeof ACCOUNT_TYPES_MAPPING];

  if (!validAccountType) {
    router.push(urls.CREATE_ACCOUNT_TYPE);
    return;
  }


  const mutation = useMutation({
    mutationFn: createEditProfile,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push(urls.CREATE_ACCOUNT_TYPE_FORM(accountType));
    },
    onError: (error: Error) => {
      if (error.message === "Unauthorized") {
        toast.error(error.message);
        router.push(urls.AUTH);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleOnSubmit = (values: T_ProfileSchema) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Step Progress Bar */}
      <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Step 3 of 4: Profile Details
        </h1>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Step 3 of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full">
          <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter first name"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Middle Name Field */}
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter middle name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display Name Field */}
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter display name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your bio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Save Button */}
          <div className="mt-6">
            <LoadingButton
              text="Save"
              loadingText="Saving"
              isLoading={mutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditProfileForm;
