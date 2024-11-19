import { Task } from "@prisma/client";
import { ACCOUNT_TYPES_MAPPING } from "./constants";

export interface TasksPage {
  tasks: Task[];
  nextCursor: string | null;
}

export type T_Account_Type_Mapping_Value =
  | "buyer"
  | "seller"
  | "trainedOperator"
  | "dealer"
  | null;

export interface T_Account_Type_Mapping {
  value: T_Account_Type_Mapping_Value;
  label: string;
}

export type T_Account_Types_Mapping = typeof ACCOUNT_TYPES_MAPPING;
