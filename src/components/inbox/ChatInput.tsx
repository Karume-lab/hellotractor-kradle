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
import { useChat } from "@/providers/ChatProvider";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/providers/SessionProvider";
import { sendMessage } from "@/app/(pages)/(protected)/inbox/actions";
import { toast } from "sonner";

const ChatInput = () => {
  const { inbox, setMessages, messages, buyerId, sellerId } = useChat();

  const { user, accountType } = useSession();

  const form = useForm<T_MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
      buyerId: "",
      sellerId: "",
      replyToId: "",
      inboxId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: ({ message, messageObj }) => {
      form.reset();
      toast.success(message || "Message sent!");
      const newMessage = {
        ...messageObj,
        replyTo: null,
        replies: [],
        buyer: null,
        seller: null,
      };
      setMessages([...messages, newMessage]);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleOnSubmit = async (values: T_MessageSchema) => {
    const messageData = {
      content: values.content,
      inboxId: inbox?.id,
    } as T_MessageSchema;

    if (accountType?.value === "buyer" && user.profile?.buyer?.id) {
      messageData.buyerId = user.profile?.buyer?.id;
    } else if (accountType?.value === "seller" && user.profile?.seller?.id) {
      messageData.sellerId = user.profile?.seller?.id;
    }
    mutation.mutate(messageData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Type your message here ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" text="Send" loadingText="Sending" />
      </form>
    </Form>
  );
};

export default ChatInput;
