"use client";

import LoadingButton from "@/components/core/LoadingButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import { useSession } from "@/providers/SessionProvider";
import { ACCOUNT_TYPES_MAPPING } from "@/lib/constants";
import { createEditBuyerAccount } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import { buyerSchema, T_BuyerSchema } from "@/lib/schemas";
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
import CreateEditContactForm from "./CreateEditContactForm";

const CreateEditBuyerForm = () => {
  const { isBuyer, setAccountType, accountTypes, setAccountTypes } =
    useSession();
  const router = useRouter();

  useEffect(() => {
    if (isBuyer) {
      router.push(urls.EXPLORE);
    }
  }, [isBuyer, router]);

  const form = useForm<T_BuyerSchema>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {},
  });

  const mutation = useMutation({
    mutationFn: createEditBuyerAccount,
    onSuccess: ({ message }) => {
      toast.success(message);
      setAccountType(ACCOUNT_TYPES_MAPPING["buyer"]);
      setAccountTypes([...accountTypes, ACCOUNT_TYPES_MAPPING["buyer"]]);
      router.push(urls.EXPLORE);
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

  const handleOnSubmit = (values: T_BuyerSchema) => {
    mutation.mutate(values);
  };

  return (
    <div className=" flex flex-col items-center h-screen w-full max-w-xl mx-auto p-4">
      {/* Step Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Step 4 of 4: Start Exploring!!!
        </h1>
        </div>
        <div className="w-full bg-gray-200 rounded-full">
          <div className="h-2 bg-primary rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
          {/* Create Account Button */}
          <div className="mt-6">
            <LoadingButton
              text="Start Exploring"
              loadingText="Creating"
              isLoading={mutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditBuyerForm;
