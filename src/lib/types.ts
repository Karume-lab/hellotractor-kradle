import { Task } from "@prisma/client";
import { ACCOUNT_TYPES_MAPPING } from "./constants";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}

export interface T_AccountType {
  value: "buyer" | "seller" | "trainedOperator" | "dealer" | null;
  label: string;
}

export type T_Account_Types_Mapping = typeof ACCOUNT_TYPES_MAPPING;
