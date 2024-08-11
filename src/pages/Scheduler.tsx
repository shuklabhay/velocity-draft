import * as React from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import ResponsiveDatePicker from "../components/ResponsiveDatePicker";
import ApplicationInfoTable from "../components/ApplicationInfoTable";
import ResponsiveCalendar from "../components/ResponsiveCalendar";

export default function Scheduler() {
  // Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  // Form Info
  const [writingSpeed, setWritingSpeed] = React.useState<number>();
  const [revisionLength, setRevisionLength] = React.useState<number>();
  const [startDate, setStartDate] = React.useState<Dayjs>();

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
            variant="h5"
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
          sx={{
            borderRadius: 5,
            borderTopWidth: 1,
          }}
        />
      </Stack>

      <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 2 }}>
        Hi [name], tell me a little more about yourself:
      </Typography>

      <div>
        <Grid container direction="column" sx={{ paddingBottom: 2 }}>
          <Grid item>
            <Typography variant="h5">
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                How fast
              </span>{" "}
              do you write? (1-5)
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              {!writingSpeed && (
                <InputLabel shrink={false}>Writing Speed</InputLabel>
              )}
              <Select
                value={String(writingSpeed)}
                onChange={(e) => {
                  setWritingSpeed(Number(e.target.value));
                }}
              >
                <MenuItem value={1}>1 (Slow)</MenuItem>
                <MenuItem value={2}>2 (Slow-Medium)</MenuItem>
                <MenuItem value={3}>3 (Medium)</MenuItem>
                <MenuItem value={4}>4 (Medium-Fast)</MenuItem>
                <MenuItem value={5}>5 (Fast)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="column" sx={{ paddingBottom: 2 }}>
          <Grid item>
            <Typography variant="h5">
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                How long
              </span>{" "}
              do you want to reivse each essay for?
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              {!revisionLength && (
                <InputLabel shrink={false}>Revision Length</InputLabel>
              )}
              <Select
                value={String(revisionLength)}
                onChange={(e) => {
                  setRevisionLength(Number(e.target.value));
                }}
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
        <Grid container direction="column" sx={{ paddingBottom: 2 }}>
          <Grid item>
            <Typography variant="h5">
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                When
              </span>{" "}
              do you want to start writing?
            </Typography>
          </Grid>
          <Grid item>
            <ResponsiveDatePicker
              label={"Start Date"}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container direction="column" sx={{ paddingBottom: 3 }}>
          <Grid item>
            <Typography variant="h5">
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                What
              </span>{" "}
              are you applying to?
            </Typography>
          </Grid>
          <Grid item>
            <ApplicationInfoTable />
          </Grid>
        </Grid>
      </div>

      <Divider
        aria-hidden="true"
        flexItem
        sx={{
          borderRadius: 5,
          borderTopWidth: 1,
        }}
      />

      <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 2 }}>
        Your plan:
      </Typography>

      <ResponsiveCalendar />
    </>
  );
}
