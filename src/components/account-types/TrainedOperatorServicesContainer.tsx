"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { urls } from "@/lib/urls";
import { parseAsString, useQueryState } from "nuqs";
import { URL_QUERY_STATES } from "@/lib/constants";
import { createTrainedOperatorServices } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import ServicesContainer from "./ServicesContainer";

const DealerServicesContainer = ({}) => {
  const [trainedOperatorId] = useQueryState(
    URL_QUERY_STATES.trainedOperatorId,
    parseAsString
  );

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createTrainedOperatorServices,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push(urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS);
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

  return <ServicesContainer mutation={mutation} id={trainedOperatorId} />;
};

export default DealerServicesContainer;
