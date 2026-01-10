import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React from 'react';

export default function Loading() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size={20} />
        </Box>
    );
}