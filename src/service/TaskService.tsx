import { Task } from "../types/Task";

const currentDate = new Date().toISOString();

export const TaskService = {
  addTask(newTaskName: string): Task {
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: newTaskName,
      done: false,
      created: currentDate,
    };
  },
  toggleTask(task: Task): Task {
    return { ...task, done: !task.done, updated: currentDate };
  }
};
