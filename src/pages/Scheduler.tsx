import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
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
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          disableRipple
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "transparent",
            width: 145,
            height: 45,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "none",
              paddingTop: "6px",
            }}
          >
            VelocityDraft
          </Typography>
        </Button>
        <Divider
          aria-hidden="true"
          flexItem
          sx={{ borderRadius: 5, borderWidthTop: 1 }}
        />
      </Stack>

      <Typography variant="h4" sx={{ paddingTop: 1 }}>
        Hi [name], tell me a little more about yourself:
      </Typography>

      <Stack spacing={1} sx={{ paddingRight: 4 }}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <Typography variant="h5">
              How{" "}
              <span style={{ color: theme.palette.primary.main }}>fast</span> do
              you write? (1-5)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <Typography variant="h5">
              How{" "}
              <span style={{ color: theme.palette.primary.main }}>long</span> do
              you want to reivse each essay for?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <Typography variant="h5">
              <span style={{ color: theme.palette.primary.main }}>When</span> do
              you want to start?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Start Date"}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Stack>

      <Typography variant="h5" sx={{ paddingLeft: 2 }}>
        Which <span style={{ color: theme.palette.primary.main }}>schools</span>{" "}
        are you applying to?
      </Typography>

      <Stack spacing={1} sx={{ paddingRight: 4 }}>
        <Grid container spacing={2} direction={"row"}>
          <Grid item xs={4}>
            <TextField label="School" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Essays" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Deadline"}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
