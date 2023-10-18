import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditColumn = ({ onEdit }) => {
  return (
    <IconButton color="primary" onClick={onEdit}>
      <EditIcon />
    </IconButton>
  );
};

export default EditColumn;
