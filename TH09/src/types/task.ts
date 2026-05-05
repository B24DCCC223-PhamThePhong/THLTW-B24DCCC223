export type TaskStatus = "todo" | "inprogress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  status: TaskStatus;
}