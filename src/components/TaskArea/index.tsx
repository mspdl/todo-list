import { Task } from "../../types/Task";
import * as Styles from "./styles";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

export const TaskArea = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = () => {
    onToggle(task.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
  e.stopPropagation();
  onDelete(task.id);
};

  return (
    <Styles.Container done={task.done} onClick={handleToggle}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
      />
      <label>{task.name}</label>
      <span className="delete" onClick={handleDelete}>
        delete
      </span>
    </Styles.Container>
  );
};
