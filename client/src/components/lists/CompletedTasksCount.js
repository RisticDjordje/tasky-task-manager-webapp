import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckBoxOutlined";
import { styled } from "@mui/material/styles";

const CountContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.05rem",
});

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
