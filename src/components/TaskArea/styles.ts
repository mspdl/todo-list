import styled from "styled-components";

type ContainerProps = {
  done: boolean;
};

export const Container = styled.div<ContainerProps>`
  align-items: center;
  background-color: ${(props) => (props.done ? "#333" : "#20212c")};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  margin-bottom: 10px;
  padding: 10px;

  input {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  .edit-input {
    flex: 1;
  }

  label {
    flex: 1;
    color: ${(props) => (props.done ? "#777" : "#ccc")};
    text-decoration: ${(props) => (props.done ? "line-through" : "initial")};
  }

  .edit,
  .delete {
    margin-left: 8px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .edit:hover,
  .delete:hover {
    opacity: 1;
  }
`;
