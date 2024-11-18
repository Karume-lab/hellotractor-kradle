"use client";
import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TasksTableActionsDropdown from "./TasksTableActionsDropdown";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

export const tasksColumns: ColumnDef<Task>[] = [
  {
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span>Title</span>
        <ArrowUpDownIcon />
      </Button>
    ),
    accessorKey: "title",
  },
  {
    header: "Actions",
    cell: ({ row }) => <TasksTableActionsDropdown taskId={row.original.id} />,
  },
];
