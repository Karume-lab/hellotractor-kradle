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
  // profiles
  PROFILE: "/profile",
  PROFILES: "/profiles",
  PROFILES_CREATION: "/profiles/creation",
  // explore
  EXPLORE: "/explore",
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
  PUBLIC_ADMIN_MANAGE_TASKS: "/admin/manage/tasks",
  API_ADMIN: "/api/data/admin",
};

export const publicPaths = new Set<string>([
  urls.AUTH,
  urls.GOOGLE_REDIRECT_URI,
  urls.LANDING_PAGE,
]);

export const publicApiPaths = new Set<string>([urls.API_TASKS]);

export function isPublicPath(path: string): boolean {
  if (publicPaths.has(path) || publicApiPaths.has(path)) return true;

  return Array.from(publicPaths).some((publicPath) =>
    path.startsWith(publicPath)
  );
}
