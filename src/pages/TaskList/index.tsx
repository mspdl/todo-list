import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AddTaskArea } from "../../components/AddTaskArea";
import { TaskArea } from "../../components/TaskArea";
import {
  createTask,
  getAllTasks,
  updateTask,
} from "../../services/TaskService";
import { Task } from "../../types/Task";
import * as Styles from "./styles";

export const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const auth = getAuth();

  // ✅ Carregar tarefas somente após o login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadTasks();
      } else {
        setUserId(null);
        setTaskList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await getAllTasks();
      setTaskList(data);
    } finally {
      setLoading(false);
    }
  }

  const handleAddTask = async (taskName: string) => {
    if (!userId) return;
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

  if (!userId) {
    return (
      <Styles.Container>
        <Styles.Area>
          <Styles.Header>Todo List</Styles.Header>
          <p>Por favor, faça login para ver suas tarefas.</p>
        </Styles.Area>
      </Styles.Container>
    );
  }

  return (
    <Styles.Container>
      <Styles.Area>
        <Styles.Header>Todo List</Styles.Header>

        <AddTaskArea onEnter={handleAddTask} />

        {loading && <p>Carregando tarefas...</p>}

        {taskList
          .filter((task) => !task.deleted)
          .map((task, index) => (
            <TaskArea
              key={index}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
      </Styles.Area>
    </Styles.Container>
  );
};
