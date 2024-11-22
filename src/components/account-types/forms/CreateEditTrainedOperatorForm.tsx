"use client";
import React from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import { T_TrainedOperatorSchema, trainedOperatorSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createEditTrainedOperator } from "@/app/(pages)/(protected)/account-types/create/form/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/core/LoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const CreateEditTrainedOperatorForm = () => {
  const router = useRouter();

  const form = useForm<T_TrainedOperatorSchema>({
    resolver: zodResolver(trainedOperatorSchema),
    defaultValues: {
      services: [],
    },
  });

  const mutation = useMutation({
    mutationFn: createEditTrainedOperator,
    onSuccess: ({ message, trainedOperator }) => {
      toast.success(message);
      router.push(
        urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_SETUP_CONTACT_INFO(
          trainedOperator.id
        )
      );
    },
    onError: (error: Error) => {
      toast.error("Something went wrong");
    },
  });

  const handleOnSubmit = (values: T_TrainedOperatorSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"firstName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"middleName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter middle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"lastName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"displayName"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter display name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"bio"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your bio" {...field} />
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

export default CreateEditTrainedOperatorForm;
