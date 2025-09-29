import { useState } from "react";
import * as Styles from "./styles";

type AddTaskAreaProps = {
  onEnter: (taskName: string) => void;
};

export const AddTaskArea = ({ onEnter }: AddTaskAreaProps) => {
  const [inputTaskName, setInputTaskName] = useState<string>("");

  const handleKeyUp = (e: KeyboardEvent) => {
    console.log(e.code);
    if (e.code === "Enter" && inputTaskName !== "") {
      onEnter(inputTaskName);
      setInputTaskName("");
    }
  };

  return (
    <Styles.Container>
      <div className="image">➕</div>
      <input
        type="text"
        placeholder="Add Task"
        value={inputTaskName}
        onChange={(e) => setInputTaskName(e.target.value)}
        onKeyUp={(e) => handleKeyUp(e as unknown as KeyboardEvent)}
      />
    </Styles.Container>
  );
};
