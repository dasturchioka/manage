import type { Tasks } from "./Tasks";

export interface Dashboard {
  id?: String;
  name: String;
  tasks?: Tasks;
  userId?: String;
}
