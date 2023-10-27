import React from "react";
import { Alert as MUIAlert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Renders an alert message with a close button.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the alert message is open or not.
 * @param {string} props.message - The message to display in the alert.
 * @param {string} props.severity - The severity of the alert (error, warning, info, success).
 * @param {function} props.onClose - The function to call when the close button is clicked.
 * @param {Object} props.style - The style object to apply to the alert.
 * @returns {JSX.Element|null} The JSX element to render or null if the alert is not open.
 */
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
