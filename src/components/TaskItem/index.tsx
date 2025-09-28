import { Task } from "../../types/Task";
import * as Styles from "./styles";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return <Styles.Container>{task.name}</Styles.Container>;
};
