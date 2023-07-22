export interface Tasks {
  id?: string;
  name: string;
  description: string;
  status: number;
  subtasks: object[];
  priority: number;
  dashboardId?: string;
}
