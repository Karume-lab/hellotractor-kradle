"use client";
import LoadingButton from "@/components/core/LoadingButton";
import { Form } from "@/components/ui/form";
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
import { createEditBuyerAccount } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import {
  buyerXProfileSchema,
  T_BuyerXProfileSchema,
} from "@/lib/combined-schemas";
import { profileDefault } from "@/lib/form-defaults";

const CreateEditBuyerForm = () => {
  const { isBuyer, setAccountType } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isBuyer()) {
      router.push(urls.EXPLORE);
    }
  }, [isBuyer, router]);

  const form = useForm<T_BuyerXProfileSchema>({
    resolver: zodResolver(buyerXProfileSchema),
    defaultValues: profileDefault,
  });

  const mutation = useMutation({
    mutationFn: createEditBuyerAccount,
    onSuccess: ({ message }) => {
      toast.success(message);
      setAccountType(ACCOUNT_TYPES_MAPPING["buyer"]);
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

  const handleOnSubmit = async (values: T_BuyerXProfileSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <CreateEditProfileForm form={form} />
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

export default CreateEditBuyerForm;
