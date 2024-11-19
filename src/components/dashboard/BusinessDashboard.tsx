"use client";
import LoadingButton from "@/components/core/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { businessSchema, T_BusinessSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const BusinessForm = () => {
  const router = useRouter();

  const form = useForm<T_BusinessSchema>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      slogan: "",
      bio: "",
      openingHours: "",
      services: [],
    },
  });

  const handleOnSubmit = (values: T_BusinessSchema) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slogan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Slogan</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business slogan" {...field} />
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
              <FormLabel>Business Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell us about your business" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openingHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening Hours</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your business opening hours"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          text="Create Business Profile"
          loadingText="Creating..."
        />
      </form>
    </Form>
  );
};

export default BusinessForm;
