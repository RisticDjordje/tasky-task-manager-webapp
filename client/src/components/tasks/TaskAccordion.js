import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskActions from "./TaskActions";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useApi } from "../../contexts/ApiProvider";


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
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: "#e0e7ec",
  padding: "0.7rem",
});

const TaskTitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flex: 1,
  cursor: "pointer", // Added for visual cue on hover
});

const TaskAccordion = ({ task, onUpdateLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [expanded, setExpanded] = useState(false);
  const [newSubtaskAdded, setNewSubtaskAdded] = useState(false);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const api = useApi();


  const handleCheckboxChange = async (taskId, newStatus) => {
    try {
      await api.patch("/tasks/" + taskId + "/update", {
        name: task.name,
        is_completed: newStatus,
        list_id: task.list_id,
        parent_id: task.parent_id,
      });
      onUpdateLists();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEditTask = async () => {
    if (newTaskName.trim().length === 0) {
      console.warn("Task name cannot be empty.");
      setNewTaskName(task.name);
      return;
    }

    try {
      await api.patch(`/tasks/${task.id}/update`, {
        name: newTaskName.trim(),
        list_id: task.list_id,
        parent_id: task.parent_id,
        is_completed: task.is_completed,
      });
      setIsEditing(false);
      onUpdateLists();
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };
  // Automatically expand the accordion when a new subtask is added
  useEffect(() => {
    if (newSubtaskAdded) {
      setExpanded(true);
      setNewSubtaskAdded(false); // Reset the flag
    }
  }, [newSubtaskAdded]);

  const onSubtaskAdded = () => {
    setNewSubtaskAdded(true);
  };

  return (
    <StyledAccordion expanded={expanded}>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }} />}
        onClick={(e) => e.stopPropagation()}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Checkbox
          checked={task.is_completed}
          onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
        />
        <TaskTitleContainer onClick={() => setIsEditing(true)}>
          {isEditing ? (
            <TextField
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onBlur={handleEditTask}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleEditTask();
                }
              }}
              fullWidth
              autoFocus
            />
          ) : (
            <Typography>{task.name}</Typography>
          )}
        </TaskTitleContainer>

        <TaskActions task={task} onUpdateLists={onUpdateLists} onSubtaskAdded={onSubtaskAdded} />
      </StyledAccordionSummary>
      {hasSubtasks && (
        <StyledAccordionDetails>
          {task.subtasks.map((subtask) => (
            <TaskAccordion key={subtask.id} task={subtask} onUpdateLists={onUpdateLists} />
          ))}
        </StyledAccordionDetails>
      )}
    </StyledAccordion>
  );
};

export default TaskAccordion;