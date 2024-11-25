"use client";
import React from "react";
import { urls } from "@/lib/urls";
import { toast } from "sonner";
import { T_TrainedOperatorSchema, trainedOperatorSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileDefaultValues } from "@/lib/form-defaults";

const CreateEditTrainedOperatorForm = () => {
  const router = useRouter();

  const form = useForm<T_TrainedOperatorSchema>({
    resolver: zodResolver(trainedOperatorSchema),
    defaultValues: {
      ...profileDefaultValues,
      services: [],
      contacts: [{ phoneNumber: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "contacts",
  });

  const mutation = useMutation({
    mutationFn: createEditTrainedOperator,
    onSuccess: ({ message, trainedOperator }) => {
      toast.success(message);
      router.push(urls.PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS);
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
        {/* Basic Information */}
        <FormField
          control={form.control}
          name="firstName"
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
          name="middleName"
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
          name="lastName"
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
          name="displayName"
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
          name="bio"
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

        {/* Contacts Section */}
        <div>
          <h2 className="text-lg font-semibold">Contacts</h2>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <FormField
                control={form.control}
                name={`contacts.${index}.phoneNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`contacts.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove Contact
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ phoneNumber: "", email: "" })}
            className="mt-4"
          >
            Add Contact
          </Button>
        </div>

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
