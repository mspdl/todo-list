import { useEffect, useState } from "react";
import * as Styles from "./App.styles";
import { AddTaskArea } from "./components/AddTaskArea";
import { TaskArea } from "./components/TaskArea";
import { createTask, getAllTasks, updateTask } from "./services/TaskService";
import { Task } from "./types/Task";

const App = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  async function loadTasks() {
    const data = await getAllTasks();
    setTaskList(data);
  }

  const handleAddTask = async (taskName: string) => {
    await createTask(taskName);
    loadTasks();
  };

  const handleToggleTask = async (task: Task) => {
    await updateTask(task.id, { done: !task.done });
    loadTasks();
  };

  const handleDeleteTask = async (task: Task) => {
    await updateTask(task.id, { deleted: true });
    loadTasks();
  };

  const handleEditTask = async (task: Task, newTaskName: string) => {
    await updateTask(task.id, { name: newTaskName });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Styles.Container>
      <Styles.Area>
        <Styles.Header>Todo List</Styles.Header>

        <AddTaskArea onEnter={handleAddTask} />

        {taskList
          .filter((task) => !task.deleted)
          .map((task, index) => (
            <div key={index}>
              <TaskArea
                key={index}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            </div>
          ))}
      </Styles.Area>
    </Styles.Container>
  );
};

export default App;
