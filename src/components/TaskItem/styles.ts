import styled from "styled-components";

type ContainerProps = {
  done: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: ${(props) => (props.done ? "#333" : "#20212c")};
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;

  input {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  label {
    color: ${(props) => (props.done ? "#777" : "#ccc")};
    text-decoration: ${(props) => (props.done ? "line-through" : "initial")};
  }
`;
