import React from 'react';
import TextField from '@mui/material/TextField';

function TimeInput() {
  return (
    <TextField
    label="Time"
    type="time"
    InputLabelProps={{
        shrink: true,
    }}
    style={{ width: '100%' }}
    />
    
  );
}

export default TimeInput;
