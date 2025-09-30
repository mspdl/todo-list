import { Task } from "../types/Task";

export const TaskService = {
  addTask(newTaskName: string): Task {
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: newTaskName,
      done: false,
      created: new Date().toISOString(),
    };
  },
};
