"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { createTaskSchema, T_CreateTaskSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useCreateTaskMutation } from "./mutations";
import {
  InfiniteData,
  QueryFilters,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { TasksPage } from "@/lib/types";
import { toast } from "sonner";
import LoadingButton from "../core/LoadingButton";
import { urls } from "@/lib/urls";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";

interface CreateEditTaskProps {
  task?: Task;
}
const CreateEditTask: React.FC<CreateEditTaskProps> = ({ task }) => {
  const form = useForm<T_CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
    },
  });

  const queryClient = useQueryClient();
  const mutation = useCreateTaskMutation();

  const router = useRouter();
  const handleOnSubmit = async (values: T_CreateTaskSchema) => {
    mutation.mutate(values, {
      onSuccess: async (newTask) => {
        form.reset();
        const queryFilter: QueryFilters = { queryKey: [QUERY_KEYS.tasks] };

        await queryClient.cancelQueries(queryFilter);
        queryClient.setQueriesData<InfiniteData<TasksPage, string | null>>(
          queryFilter,
          (oldData) => {
            const firstPage = oldData?.pages[0];

            if (firstPage) {
              return {
                pageParams: oldData.pageParams,
                pages: [
                  {
                    tasks: [newTask, ...firstPage.tasks],
                    nextCursor: firstPage.nextCursor,
                  },
                  ...oldData.pages.slice(1),
                ],
              };
            }
          }
        );

        queryClient.invalidateQueries({
          queryKey: queryFilter.queryKey,
          predicate(query) {
            return !query.state.data;
          },
        });

        toast.success("Task created successfully");
        router.push(urls.PUBLIC_TASKS);
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your task title ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            disabled={mutation.isPending}
            text="Create"
            loadingText="Creating"
          />
        </form>
      </Form>
    </>
  );
};

export default CreateEditTask;
