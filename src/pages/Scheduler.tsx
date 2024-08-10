import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

export default function Scheduler() {
  // Hooks
  const theme = useTheme();
  let navigate = useNavigate();

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          disableRipple
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "transparent",
            width: 175,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "none",
            }}
          >
            VelocityDraft
          </Typography>
        </Button>
      </Stack>

      <Typography variant="h5">
        Hello [name], welcome to our application essay scheduler, VelocityDraft!
      </Typography>
      <Typography variant="h6">
        Tell me a little more about yourself:
      </Typography>

      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
        >
          <Typography>How fast do you write? (1-5)</Typography>
          <FormControl sx={{ width: 400 }}>
            <InputLabel>Writing Speed</InputLabel>
            <Select
            // value={}
            // onChange={}
            >
              <MenuItem value={1}>1 (Slowest)</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5 (Fastest)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
        >
          <Typography>
            How long do you want to reivse each essay for?
          </Typography>
          <FormControl sx={{ width: 400 }}>
            <InputLabel>Revision Length</InputLabel>
            <Select
            // value={}
            // onChange={}
            >
              <MenuItem value={1}>1 Day</MenuItem>
              <MenuItem value={2}>2 Days</MenuItem>
              <MenuItem value={3}>3 Days</MenuItem>
              <MenuItem value={4}>4 Days</MenuItem>
              <MenuItem value={5}>5 Days</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly", alignItems: "flex-start" }}
        >
          <Typography>When do you want to start?</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </Stack>
      </Stack>

      <Typography>Which schools are you applying to?</Typography>
    </>
  );
}
