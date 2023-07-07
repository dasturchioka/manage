import type { Dashboard } from "./Dashboard";
import type { Task } from "./Task";

export interface Tasks {
  id?: String;
  dashboard: Dashboard;
  tasks: Task[];
  dashboardId: String;
}
