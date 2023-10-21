import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskActions from "./TaskActions";
import { styled } from "@mui/material/styles";

const StyledAccordion = styled(Accordion)({
  marginBottom: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
});

const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#f4f7fa",
  borderBottom: "1px solid #ccc",
});

const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#e0e7ec",
  padding: "0.5rem",
});

const TaskAccordion = ({ task, onUpdateLists }) => {
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={hasSubtasks ? <ExpandMoreIcon /> : null}
        aria-controls="panel-content"
        id="panel-header"
      >
        <TaskActions task={task} onUpdateLists={onUpdateLists}/>
      </StyledAccordionSummary>
      {hasSubtasks && (
        <StyledAccordionDetails>
          {task.subtasks.map((subtask) => (
            <TaskAccordion key={subtask.id} task={subtask} onUpdateLists={onUpdateLists}/>
          ))}
        </StyledAccordionDetails>
      )}
    </StyledAccordion>
  );
};

export default TaskAccordion;