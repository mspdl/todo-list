import * as Styles from "./styles";

export const AddTaskArea = () => {
  return (
    <Styles.Container>
      <div className="image">➕</div>
      <input type="text" placeholder="Add Task" />
    </Styles.Container>
  );
};
