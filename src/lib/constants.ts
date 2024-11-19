import { T_Account_Type_Mapping } from "./types";

export const PAGE_SIZE = 10;

export const SITE_COOKIE_KEY = "hellotractor-kradle-auth-cookie";
export const LOCAL_STORAGE_KEY = "hellotractor-kradle-local-storage-key";
export const KINDLY_WAIT = "kindly wait as we redirect you";

export const QUERY_KEYS = {
  tasks: "tasks",
};
export const ACCOUNT_TYPES_MAPPING: Record<
  Exclude<T_Account_Type_Mapping["value"], null>,
  T_Account_Type_Mapping
> = {
  buyer: { value: "buyer", label: "Buyer" },
  seller: { value: "seller", label: "Seller" },
  business: { value: "business", label: "Business" },
  trainedOperator: { value: "trainedOperator", label: "Trained Operator" },
  dealer: { value: "dealer", label: "Dealer" },
};
export const URL_STATES = {
  accountType: "account-type",
};
