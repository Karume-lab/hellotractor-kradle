"use client";
import React, { useEffect } from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import ServicesContainer from "../ServicesContainer";
import {
  T_ServiceSchema,
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

const CreateEditTrainedOperatorForm = () => {
  const { isTrainedOperator, setAccountType } = useSession();
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
    onSuccess: ({ message, trainedOperator }) => {
      toast.success(message);
      setAccountType(ACCOUNT_TYPES_MAPPING["trainedOperator"]);
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

  const handleOnServicesSave = (services: T_ServiceSchema[]) => {
    form.setValue("services", services);
    mutation.mutate({
      ...form.getValues(),
      services: services,
    });
  };

  return (
    <div>
      <ServicesContainer
        handleOnServicesSave={handleOnServicesSave}
        isSubmittingAll={mutation.isPending}
      />
    </div>
  );
};

export default CreateEditTrainedOperatorForm;
