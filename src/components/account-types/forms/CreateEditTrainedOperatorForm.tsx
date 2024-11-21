"use client";
import React, { useEffect } from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import {
  T_TrainedOperatorSchema,
  trainedOperatorSchema,
} from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createEditTrainedOperatorAccount } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import { ACCOUNT_TYPES_MAPPING } from "@/lib/constants";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/core/LoadingButton";

const CreateEditTrainedOperatorForm = () => {
  const { isTrainedOperator, setAccountType, accountTypes, setAccountTypes } =
    useSession();
  const router = useRouter();

  useEffect(() => {
    if (isTrainedOperator) {
      router.push(urls.DASHBOARD);
    }
  }, [isTrainedOperator, router]);

  const form = useForm<T_TrainedOperatorSchema>({
    resolver: zodResolver(trainedOperatorSchema),
    defaultValues: {
      services: [],
    },
  });

  const mutation = useMutation({
    mutationFn: createEditTrainedOperatorAccount,
    onSuccess: ({ message }) => {
      toast.success(message);
      setAccountType(ACCOUNT_TYPES_MAPPING["trainedOperator"]);
      setAccountTypes([
        ...accountTypes,
        ACCOUNT_TYPES_MAPPING["trainedOperator"],
      ]);
      router.push(urls.CREATE_SERVICES);
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

  const handleOnSubmit = (values: T_TrainedOperatorSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <LoadingButton
          text="Create a trained operator account"
          loadingText="Creating"
          isLoading={mutation.isPending}
        />
      </form>
    </Form>
  );
};

export default CreateEditTrainedOperatorForm;
