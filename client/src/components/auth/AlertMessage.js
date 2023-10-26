import React from "react";
import { Alert as MUIAlert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const AlertMessage = ({ open, message, severity, onClose, style }) => {
  if (!open) return null;

  return (
    <MUIAlert
      elevation={6}
      variant="filled"
      severity={severity}
      style={{ ...style }} // Applying style here
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </MUIAlert>
  );
};

export default AlertMessage;
