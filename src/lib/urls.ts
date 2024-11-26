import { URL_QUERY_STATES } from "./constants";

export const urls = {
  // landing page
  LANDING_PAGE: "/",
  HOME: "/",
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
  // sellers
  SELL: "/sell",
  API_SELLER_TRACTORS: "/api/data/tractors?specific-user=true",
  API_SELLER_ATTACHMENTS: "/api/data/attachments?specific-user=true",
  // explore
  EXPLORE: "/explore",
  // dashboard
  DASHBOARD: "/dashboard",
  // tractors
  TRACTORS: "/equipment/tractors",
  API_TRACTORS: "/api/data/tractors",
  // attachments
  ATTACHMENTS: "/equipment/attachments",
  VIEW_EDIT_TRACTOR: (tractorId: string) => `/equipment/tractors/${tractorId}`,
  CREATE_TRACTOR: "/equipment/tractors/create",
  CREATE_ATTACHMENT: "/equipment/attachments/create",
  API_ATTACHMENTS: "/api/data/attachments",
  // inbox
  INBOX: "/inbox",
  INBOX_DETAIL: (inboxId: string) => `/inbox/${inboxId}`,
  API_INBOX: (inboxId: string) => `/api/data/inboxes/${inboxId}`,
  API_INBOXES: "/api/data/inboxes",
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
  API_ADMIN: "/api/data/admin",
  // wishlist
  WISHLIST: "/wishlist",
  API_WISHLIST: "/api/data/wishlist",
  // trained operators
  API_TRAINED_OPERATORS: "/api/data/trained-operators",
  // dealers
  API_DEALERS: "/api/data/dealers",
};

export const publicPaths = new Set<string>([
  urls.AUTH,
  urls.GOOGLE_REDIRECT_URI,
  urls.LANDING_PAGE,
  urls.EXPLORE,
  urls.API_TRACTORS,
]);

export const publicApiPaths = new Set<string>([
  urls.API_ATTACHMENTS,
  urls.API_DEALERS,
  urls.API_TRACTORS,
  urls.API_TRAINED_OPERATORS,
]);

export function isPublicPath(path: string): boolean {
  if (publicPaths.has(path) || publicApiPaths.has(path)) return true;

  return Array.from(publicPaths).some((publicPath) =>
    path.startsWith(publicPath)
  );
}

export const NAV_LINKS = [
  {
    label: "EXPLORE",
    link: urls.EXPLORE,
  },
];
