import { useState } from "react";
import { Task } from "../../types/Task";
import * as Styles from "./styles";

type TaskItemProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task, newName: string) => void;
};

export const TaskArea = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleToggle = () => {
    if (!isEditing) onToggle(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleInputBlur = () => {
    saveEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditedName(task.name);
      setIsEditing(false);
    }
  };

  const saveEdit = () => {
    const trimmed = editedName.trim();
    if (trimmed && trimmed !== task.name) {
      onEdit(task, trimmed);
    } else {
      setEditedName(task.name);
    }
    setIsEditing(false);
  };

  return (
    <Styles.Container done={task.done} onClick={handleToggle}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
      />

      {isEditing ? (
        <input
          autoFocus
          className="edit-input"
          value={editedName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <label>{task.name}</label>
      )}

      <span className="edit" onClick={handleEditClick}>
        ✏️
      </span>

      <span className="delete" onClick={handleDelete}>
        🗑️
      </span>
    </Styles.Container>
  );
};
