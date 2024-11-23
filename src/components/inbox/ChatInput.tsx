"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { messageSchema, T_MessageSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import LoadingButton from "../core/LoadingButton";

const ChatInput = () => {
  const form = useForm<T_MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleOnSubmit = (values: T_MessageSchema) => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Type your message here ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton text="Send" loadingText="Sending" />
      </form>
    </Form>
  );
};

export default ChatInput;
