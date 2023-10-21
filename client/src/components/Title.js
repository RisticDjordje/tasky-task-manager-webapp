import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
    backgroundColor: '#f4f7fa',
    padding: '1rem 2rem',
    margin: '2rem 0',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
});

const HomePageTitle = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <StyledPaper elevation={3}>
                <Typography variant="h4" component="h1" color="textPrimary">
                    Welcome to Your Task Manager
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Organize your tasks efficiently and boost your productivity.
                </Typography>
            </StyledPaper>
        </Box>
    );
};

export default HomePageTitle;