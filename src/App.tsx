import { useState } from "react";
import * as Styles from "./App.styles";
import { AddTaskArea } from "./components/AddTaskArea";
import { TaskArea } from "./components/TaskArea";
import { TaskListMock } from "./mocks/TaskList.mock";
import { Task } from "./types/Task";

const App = () => {
  const [taskList, setList] = useState<Task[]>(TaskListMock);

  const handleAddTask = (taskName: string) => {
    const newList = [...taskList];
    const newTask = taskCreator(taskName);
    newList.push(newTask);
    setList(newList);
  };

  const taskCreator = (taskName: string): Task => {
    return {
      name: taskName,
      done: false,
      created: new Date().toString(),
      id: Math.random(),
    };
  };

  return (
    <Styles.Container>
      <Styles.Area>
        <Styles.Header>Todo List</Styles.Header>

        <AddTaskArea onEnter={handleAddTask} />

        {taskList.map((task, index) => (
          <div key={index}>
            <TaskArea key={index} task={task} />
          </div>
        ))}
      </Styles.Area>
    </Styles.Container>
  );
};

export default App;
