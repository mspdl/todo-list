import { useState } from "react";
import { Task } from "../../types/Task";
import * as Styles from "./styles";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isChecked, setIsChecked] = useState(task.done);

  return (
    <Styles.Container
      done={isChecked}
      onClick={() => setIsChecked((prev) => !prev)}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
      <label>{task.name}</label>
    </Styles.Container>
  );
};
