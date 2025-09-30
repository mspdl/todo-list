import { Task } from "../../types/Task";
import * as Styles from "./styles";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
};

export const TaskArea = ({ task, onToggle }: TaskItemProps) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  return (
    <Styles.Container done={task.done} onClick={handleToggle}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <label>
        {task.name} - {task.id}
      </label>
    </Styles.Container>
  );
};
