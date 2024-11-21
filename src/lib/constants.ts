import { T_Account_Type_Mapping } from "./types";

export const PAGE_SIZE = 10;

export const SITE_COOKIE_KEY = "hellotractor-kradle-auth-cookie";
export const LOCAL_STORAGE_KEY = "hellotractor-kradle-local-storage-key";
export const KINDLY_WAIT = "kindly wait as we redirect you";

export const QUERY_KEYS = {
  tasks: "tasks",
  tractors: "tractors",
};

export const ACCOUNT_TYPES_MAPPING: Record<
  Exclude<T_Account_Type_Mapping["value"], null>,
  T_Account_Type_Mapping
> = {
  buyer: { value: "buyer", label: "Buyer" },
  seller: { value: "seller", label: "Seller" },
  trainedOperator: { value: "trainedOperator", label: "Trained Operator" },
  dealer: { value: "dealer", label: "Dealer" },
};

export const URL_STATES = {
  accountType: "account-type",
};

export const MAX_FILE_SIZE = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;
export const MAX_FILE_SIZE_STRING = `${MAX_FILE_SIZE}mb`;
export const MAX_UPLOAD_FILES_NUMBER = 2;
