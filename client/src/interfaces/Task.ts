export type TaskStatus = "todo" | "in progress" | "completed" | "failed";

export interface Task {
  id: String;
  name: String;
  description: String;
  status: TaskStatus;
  subtasks: Object[];
  priority: String;
}
