export enum CONSTANTS {
  SERVER_BASE = import.meta.env.VITE_APP_SERVER_BASE,
  AUTH_URL = import.meta.env.VITE_APP_SERVER_BASE_AUTH,
  USER_URL = import.meta.env.VITE_APP_SERVER_BASE_USER,
  DASHBOARD_URL = import.meta.env.VITE_APP_SERVER_BASE_DASHBOARD,
}

export declare enum TASK_STATUS {
  TODO = "todo",
  INPROGRESS = "in progress",
  COMPLETED = "completed",
  FAILED = "failed",
}
