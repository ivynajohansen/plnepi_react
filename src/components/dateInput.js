import React from 'react';
import TextField from '@mui/material/TextField';

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function DateInput({isDatePickerDisabled}) {

  return (
    <TextField
      label="Date"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      style={{ width: '100%' }}
      disabled={isDatePickerDisabled}
    />
  );
}

export default DateInput;
