import { Task } from "@prisma/client";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}

export type T_AccountType =
  | "buyer"
  | "business"
  | "trainedOperator"
  | "dealer"
  | null;
