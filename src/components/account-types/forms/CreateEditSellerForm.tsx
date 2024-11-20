"use client";
import LoadingButton from "@/components/core/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  sellerXProfileSchema,
  T_SellerXProfileSchema,
} from "@/lib/combined-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import { useSession } from "@/providers/SessionProvider";
import { ACCOUNT_TYPES_MAPPING } from "@/lib/constants";
import CreateEditProfileForm from "./CreateEditProfileForm";
import { createEditSellerAccount } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import { profileDefault } from "@/lib/form-defaults";

const CreateEditSellerForm = () => {
  const { isSeller, setAccountType } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isSeller()) {
      router.push(urls.DASHBOARD);
    }
  }, [isSeller, router]);
  const form = useForm<T_SellerXProfileSchema>({
    resolver: zodResolver(sellerXProfileSchema),
    defaultValues: {
      ...profileDefault,
      businessName: "",
      businessSlogal: "",
      businessBio: "",
      businessOpeningHours: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createEditSellerAccount,
    onSuccess: ({ message }) => {
      toast.success(message);
      setAccountType(ACCOUNT_TYPES_MAPPING["seller"]);
      router.push(urls.DASHBOARD);
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

  const handleOnSubmit = async (values: T_SellerXProfileSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <CreateEditProfileForm form={form} />
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessSlogal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Slogan</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business slogan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessBio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about your business" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessOpeningHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Opening Hours</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your business opening hours"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          text="Create"
          loadingText="Creating"
          isLoading={mutation.isPending}
        />
      </form>
    </Form>
  );
};

export default CreateEditSellerForm;
