import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Scheduler() {
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

      <Typography>
        Hello [name], welcome to our application essay scheduler, VelocityDraft!
      </Typography>
      <Typography>Tell me a little more about yourself:</Typography>

      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly" }}
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
          sx={{ justifyContent: "space-evenly" }}
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
          sx={{ justifyContent: "space-evenly" }}
        >
          <Typography>When do you want to start?</Typography>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs("2022-04-17")} />
          </LocalizationProvider> */}
        </Stack>
      </Stack>

      <Typography>Which schools are you applying to?</Typography>
    </>
  );
}
