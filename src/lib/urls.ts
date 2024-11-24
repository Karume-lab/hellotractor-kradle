import { URL_QUERY_STATES } from "./constants";

export const urls = {
  // landing page
  LANDING_PAGE: "/",
  //auth
  GOOGLE_REDIRECT_URI: "/api/auth/google/callback",
  GOOGLE_USER_INFO: "https://www.googleapis.com/oauth2/v1/userinfo",
  AUTH: "/auth",
  RESET_PASSWORD: "/auth/reset-password",
  RESET_PASSWORD_TOKEN: (token: string) => `/auth/reset-password/${token}`,
  FULL_RESET_PASSWORD_TOKEN: (token: string) =>
    `${process.env.NEXT_PUBLIC_URL}/auth/reset-password/${token}`,
  // account types
  ACCOUNT_TYPE: "/account-type",
  ACCOUNT_TYPES: "/account-types",
  CREATE_ACCOUNT_TYPE: "/account-types/create",
  CREATE_ACCOUNT_TYPE_FORM: (accountType: string) =>
    `create/form?account-type=${accountType}`,
  CREATE_PROFILE: (accountType: string) =>
    `/account-types/profile?account-type=${accountType}`,
  CREATE_SERVICES: "/account-types/create/set-up/services",
  // explore
  EXPLORE: "/explore",
  // dashboard
  DASHBOARD: "/dashboard",
  // tractors
  TRACTORS: "/equipment/tractors",
  // attachments
  ATTACHMENTS: "/equipment/attachments",
  VIEW_EDIT_TRACTOR: (tractorId: string) => `/equipment/tractors/${tractorId}`,
  CREATE_TRACTOR: "/equipment/tractors/create",
  CREATE_ATTACHMENT: "/equipment/attachments/create",
  API_TRACTORS: "/api/data/tractors",
  // inbox
  INBOX: "/inbox",
  INBOX_DETAIL: (inboxId: string) => `/inbox/${inboxId}`,
  API_INBOX: (inboxId: string) => `/api/data/inbox/${inboxId}`,
  // tasks
  PUBLIC_TASKS: "/tasks",
  PUBLIC_TASKS_VIEW_EDIT: (taskId: string) => `/tasks/${taskId}`,
  PUBLIC_TASKS_NEW: "/tasks/new",
  API_TASKS: "/api/data/tasks",
  API_TASK: (taskId: string) => `/api/data/tasks/${taskId}`,
  //users
  USER: (userId: string, profileId: string) =>
    `/api/data/users/${userId}/profiles/${profileId}`,
  // admin
  PUBLIC_ADMIN: "/admin",
  PUBLIC_ADMIN_MANAGE: "/admin/manage",
  PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS: "/admin/manage/trained-operators",
  PUBLIC_ADMIN_MANAGE_TRACTORS: "/admin/manage/tractors",
  PUBLIC_ADMIN_MANAGE_TRACTORS_CREATE: "/admin/manage/tractors/create",
  PUBLIC_ADMIN_MANAGE_ATTACHMENTS: "/admin/manage/attachments",
  PUBLIC_ADMIN_MANAGE_ATTACHMENTS_CREATE: "/admin/manage/attachments/create",
  PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_CREATE:
    "/admin/manage/trained-operators/create",
  PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_SETUP_CONTACT_INFO: (
    trainedOperatorId: string
  ) =>
    `/admin/manage/trained-operators/create/setup/contact-info?${URL_QUERY_STATES.trainedOperatorId}=${trainedOperatorId}`,
  PUBLIC_ADMIN_MANAGE_TRAINED_OPERATORS_SETUP_SERVICES: (
    trainedOperators: string
  ) =>
    `/admin/manage/trained-operators/create/setup/services?${URL_QUERY_STATES.trainedOperatorId}=${trainedOperators}`,
  PUBLIC_ADMIN_MANAGE_DEALERS: "/admin/manage/dealers",
  PUBLIC_ADMIN_MANAGE_DEALERS_CREATE: "/admin/manage/dealers/create",
  PUBLIC_ADMIN_MANAGE_DEALERS_SETUP_SERVICES: (dealerId: string) =>
    `/admin/manage/dealers/create/setup/services?${URL_QUERY_STATES.dealerId}=${dealerId}`,
  PUBLIC_ADMIN_MANAGE_TASKS: "/admin/manage/tasks",
  API_ADMIN: "/api/data/admin",
  // wishlist
  WISHLIST: "/wishlist",
  API_WISHLIST: "/api/data/wishlist",
};

export const publicPaths = new Set<string>([
  urls.AUTH,
  urls.GOOGLE_REDIRECT_URI,
  urls.LANDING_PAGE,
  urls.EXPLORE,
  urls.API_TRACTORS,
]);

export const publicApiPaths = new Set<string>([urls.API_TASKS]);

export function isPublicPath(path: string): boolean {
  if (publicPaths.has(path) || publicApiPaths.has(path)) return true;

  return Array.from(publicPaths).some((publicPath) =>
    path.startsWith(publicPath)
  );
}
