import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export default function ResponsiveDatePicker({
  label,
  value,
  renderAsError = false,
  minDate = dayjs(),
  onChange,
}: {
  label: string;
  value: dayjs.Dayjs | null;
  renderAsError: boolean;
  minDate: Dayjs;
  onChange: (e: any) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={value ? "" : label}
        onChange={onChange}
        value={value}
        minDate={minDate}
        slotProps={{
          textField: {
            fullWidth: true,
            error: renderAsError,
            InputLabelProps: {
              shrink: false,
              sx: {
                display: "block",
                "&.Mui-focused, &.MuiFormLabel-filled": {
                  display: "none",
                },
              },
            },
            InputProps: {
              sx: {
                "& .MuiInputBase-input": {
                  paddingTop: "16px",
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
