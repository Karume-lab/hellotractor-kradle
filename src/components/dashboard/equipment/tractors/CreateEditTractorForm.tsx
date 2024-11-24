"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import { createEditTractor } from "@/app/(pages)/(protected)/equipment/tractors/create/actions";
import CreateEditEquipmentFormFields from "../CreateEditEquipmentFormFields";
import {
  T_TractorXEquipmentSchema,
  tractorXEquipmentSchema,
} from "@/lib/combined-schemas";
import { equipmentDefaultValues } from "@/lib/form-defaults";
import React from "react";

interface CreateEditTractorFormProps {
  isFromAdmin?: boolean;
}

const CreateEditTractorForm: React.FC<CreateEditTractorFormProps> = ({
  isFromAdmin,
}) => {
  const router = useRouter();
  const form = useForm<T_TractorXEquipmentSchema>({
    resolver: zodResolver(tractorXEquipmentSchema),
    defaultValues: {
      ...equipmentDefaultValues,
      fuelCapacity: "",
      mileage: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createEditTractor,
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      router.push(
        isFromAdmin ? urls.PUBLIC_ADMIN_MANAGE_TRACTORS : urls.TRACTORS
      );
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

  const handleOnSubmit = async (values: T_TractorXEquipmentSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <CreateEditEquipmentFormFields form={form} />
        <FormField
          control={form.control}
          name="fuelCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tractor fuel capacity ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage</FormLabel>
              <FormControl>
                <Input placeholder="Enter tractor mileage ..." {...field} />
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

export default CreateEditTractorForm;
