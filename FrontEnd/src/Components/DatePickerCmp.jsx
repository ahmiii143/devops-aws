import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const DatePickerCmp = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
      <DatePicker
        label="Select Date"
        value={value}
        onChange={onChange}
        TextFieldComponent={(props) => (
          <TextField {...props} variant="standard" />
        )}
        sx={{ left: "60%" }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerCmp;
