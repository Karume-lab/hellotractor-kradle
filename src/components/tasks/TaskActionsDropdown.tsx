import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { urls } from "@/lib/urls";

interface TaskActionsDropdownProps {
  taskId: string;
}

const TaskActionsDropdown: React.FC<TaskActionsDropdownProps> = ({
  taskId,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex">
        <DropdownMenuItem asChild>
          <Link href={urls.PUBLIC_TASKS_VIEW_EDIT(taskId)}>
            <Eye />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={urls.PUBLIC_TASKS_VIEW_EDIT(taskId)}>
            <Pencil />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteTaskDialog taskId={taskId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskActionsDropdown;
