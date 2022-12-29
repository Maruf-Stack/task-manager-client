import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <CircularProgress color="secondary" />
        </div>
    );
};

export default Loading;