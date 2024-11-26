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
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex items-center gap-2 bg-gray-100 p-4 rounded-md shadow-md"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Type your message..."
                  className="rounded-full px-4 py-2 border-gray-300 focus:ring focus:ring-blue-500 focus:outline-none w-2/3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          text="Send"
          loadingText="Sending..."
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all"
        />
      </form>
    </Form>
  );
};

export default ChatInput;
