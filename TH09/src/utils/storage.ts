import type { Task } from "../types/task";

const KEY = "tasks";

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Học React",
    description: "Ôn lại hook",
    deadline: "2026-05-10",
    priority: "high",
    tags: ["react"],
    status: "todo"
  },
  {
    id: "2",
    title: "Làm Kanban",
    description: "Drag drop",
    deadline: "2026-05-08",
    priority: "medium",
    tags: ["project"],
    status: "inprogress"
  },
  {
    id: "3",
    title: "Nộp bài",
    description: "Submit LMS",
    deadline: "2026-05-06",
    priority: "high",
    tags: ["deadline"],
    status: "done"
  }
];

export const getTasks = (): Task[] => {
  const data = localStorage.getItem(KEY);
  if (!data) {
    localStorage.setItem(KEY, JSON.stringify(sampleTasks));
    return sampleTasks;
  }
  return JSON.parse(data);
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};