import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function DateInput({isDatePickerDisabled, date, setDate}) {

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label="Date" 
          value={date}
          onChange={handleDateChange}
          disabled={isDatePickerDisabled}
          format="DD/MM/YYYY"
          InputLabelProps={{ className: 'MuiInputLabel-shrink' }}
        />
    </LocalizationProvider>
  );
}

export default DateInput;
