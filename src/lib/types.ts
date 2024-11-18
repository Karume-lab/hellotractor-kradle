import { Task } from "@prisma/client";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}
