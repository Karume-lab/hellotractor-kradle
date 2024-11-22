"use client";
import React from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import { dealerSchema, T_DealerSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createEditDealer } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/core/LoadingButton";
import { Input } from "@/components/ui/input";

const CreateEditDealerForm = () => {
  const router = useRouter();
  const form = useForm<T_DealerSchema>({
    resolver: zodResolver(dealerSchema),
    defaultValues: {
      name: "",
      contacts: [],
    },
  });

  const mutation = useMutation({
    mutationFn: createEditDealer,
    onSuccess: ({ message, dealer }) => {
      toast.success(message);
      router.push(urls.PUBLIC_ADMIN_MANAGE_DEALERS_SETUP_SERVICES(dealer.id));
    },
    onError: (error: Error) => {
      toast.error("Something went wrong");
    },
  });

  const handleOnSubmit = (data: T_DealerSchema) => {
    const values = {
      name: data.name,
      contacts: data.contacts,
    };
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dealership Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter dealership name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          text="Create"
          loadingText="Creating"
          isLoading={mutation.isPending}
        />
      </form>
    </Form>
  );
};

export default CreateEditDealerForm;
