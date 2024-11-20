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
import { T_TractorSchema, tractorSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { urls } from "@/lib/urls";
import { createTractor } from "@/app/(pages)/(protected)/equipment/tractors/new/actions";
import EquipmentForm from "../CreateEditEquipmentForm";

const CreateEditTractorForm = () => {
  const router = useRouter();
  const form = useForm<T_TractorSchema>({
    resolver: zodResolver(tractorSchema),
    defaultValues: {
      name: "",
      description: "",
      condition: undefined,
      fuelCapacity: "",
      mileage: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createTractor,
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      router.push(urls.TRACTORS);
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

  const handleOnSubmit = async (values: T_TractorSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <EquipmentForm form={form} />
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
