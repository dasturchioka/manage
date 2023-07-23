export interface Tasks {
  id?: string;
  name: string;
  description: string;
  status: number;
  subtasks: {
    task: string;
    done: boolean;
  }[];
  priority: number;
  dashboardId?: string;
}
