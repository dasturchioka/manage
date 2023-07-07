import type { Dashboard } from "./Dashboard";

export interface User {
  id?: String;
  username: String;
  password: String;
  dashboards: Dashboard[];
}