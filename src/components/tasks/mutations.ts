import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { createTask, deleteTask } from "./actions";
import { usePathname, useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/lib/constants";
import { TasksPage } from "@/lib/types";
import { urls } from "@/lib/urls";

export const useCreateTaskMutation = () => {
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create a task. Kindly try again");
    },
  });

  return mutation;
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async (deletedTask) => {
      const queryFilter: QueryFilters = { queryKey: [QUERY_KEYS.tasks] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<TasksPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              tasks: page.tasks.filter((p) => p.id !== deletedTask.id),
            })),
          };
        }
      );
      toast.success("Task deleted.");
      if (pathname === urls.API_TASK(deletedTask.id)) {
        router.push(urls.USER("", ""));
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete. Kindly try again");
    },
  });

  return mutation;
};
