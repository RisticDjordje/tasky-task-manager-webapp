import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckBoxOutlined";
import { styled } from "@mui/material/styles";

const CountContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.05rem",
});

/**
 * Renders the count of completed tasks and a check circle icon.
 * @param {Object[]} tasks - An array of task objects.
 * @param {string} tasks[].name - The name of the task.
 * @param {boolean} tasks[].is_completed - Whether the task is completed or not.
 * @returns {JSX.Element} - The completed tasks count component.
 */
const CompletedTasksCount = ({ tasks }) => {
  let completedCount = 0;
  for (const task of tasks) {
    if (task.is_completed) {
      completedCount++;
    }
  }

  const allCompleted = completedCount === tasks.length && tasks.length > 0;

  return (
    <CountContainer>
      <span
        style={{ color: allCompleted ? "#4caf50" : "#000000" }}
      >{`${completedCount}/${tasks.length}`}</span>
      <CheckCircleIcon
        style={{ color: allCompleted ? "#4caf50" : "#000000" }}
      />
    </CountContainer>
  );
};

export default CompletedTasksCount;
