export enum CONSTANTS {
  SERVER_BASE = import.meta.env.VITE_APP_SERVER_BASE,
  AUTH_URL = import.meta.env.VITE_APP_SERVER_BASE_AUTH,
  USER_URL = import.meta.env.VITE_APP_SERVER_BASE_USER,
  DASHBOARD_URL = import.meta.env.VITE_APP_SERVER_BASE_DASHBOARD,
  TASKS_URL = import.meta.env.VITE_APP_SERVER_BASE_TASKS,
}

export enum TASK_STATUS {
  TODO = "todo", // 0
  INPROGRESS = "in progress", // 1
  COMPLETED = "completed", // 2
  FAILED = "failed", // 3
}

export enum PRIORITIES {
  LOW = 'low', // 0
  NORMAL = 'normal', // 1
  HIGH = 'high', // 2
  URGENT = 'urgent' // 3
}

