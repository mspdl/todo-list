import { useState } from "react";
import * as Styles from "./App.styles";
import { AddTaskArea } from "./components/AddTaskArea";
import { TaskArea } from "./components/TaskArea";
import { TaskListMock } from "./mocks/TaskList.mock";
import { TaskService } from "./service/TaskService";
import { Task } from "./types/Task";

const App = () => {
  const [taskList, setList] = useState<Task[]>(TaskListMock);

  const handleAddTask = (taskName: string) => {
    const newList = [...taskList];
    const newTask = TaskService.addTask(taskName);
    newList.push(newTask);
    setList(newList);
  };

  const handleToggleTask = (id: string) => {
    const newList = taskList.map((task) => {
      if (task.id === id) {
        return TaskService.toggleTask(task);
      }
      return task;
    });

    setList(newList);
  };

  const handleDeleteTask = (id: string) => {
    const newList = taskList.map((task) => {
      if (task.id === id) {
        return TaskService.deleteTask(task);
      }
      return task;
    });

    setList(newList);
  };

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
              />
            </div>
          ))}
      </Styles.Area>
    </Styles.Container>
  );
};

export default App;
