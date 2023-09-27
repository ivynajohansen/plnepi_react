import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import './../css/datetimepicker.css';


function TimeInput({time, setTime}) {
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="Time"
          value={time}
          onChange={handleTimeChange}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
          style={{ width: '100%' }}
          InputLabelProps={{ className: 'MuiInputLabel-shrink' }}
        />
     </DemoContainer>
    </LocalizationProvider>
    
  );
}

export default TimeInput;
