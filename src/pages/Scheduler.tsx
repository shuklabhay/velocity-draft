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
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ResponsiveDatePicker from "../components/ResponsiveDatePicker";
import ApplicationTable from "../components/ApplicationTable";
import ResponsiveCalendar from "../components/ResponsiveCalendar";
import {
  CalendarEvent,
  StrictTableItem,
  StrictWriterInfo,
} from "../utils/types";
import { useEffect, useState } from "react";
import { addDays, createWritingPlan } from "../utils/planner";
import { isRowEntirelyEmpty, isTableReadyToCreateEvents } from "../utils/table";
import { useFormContext } from "../components/FormContext";
import AppBar from "../components/AppBar";

export default function Scheduler() {
  // Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const [writingPlan, setWritingPlan] = useState<CalendarEvent[]>([]);

  const [renderWritingLengthError, setRenderWritingLengthError] =
    useState(false);
  const [renderSessionCountError, setRenderSessionCountError] = useState(false);
  const [renderStartDateError, setRenderStartDateError] = useState(false);

  // Form Info
  const { writerInfo, setWriterInfo, tableData, setTableData } =
    useFormContext();
  const institutionsAppliedTo = tableData.map((item) => item.institution);

  // Error handling
  useEffect(() => {
    if (writerInfo.name.length === 0) {
      navigate("/");
    }
  }, [writerInfo.name, navigate]);

  useEffect(() => {
    const isTableDataNotEmpty = tableData.some(
      (row) => !isRowEntirelyEmpty(row)
    );

    if (isTableDataNotEmpty) {
      setRenderWritingLengthError(!writerInfo.writingLength);
      setRenderSessionCountError(!writerInfo.reviewSessionCount);
      setRenderStartDateError(!writerInfo.startDate);
    } else {
      setRenderWritingLengthError(false);
      setRenderSessionCountError(false);
      setRenderStartDateError(false);
    }
  }, [writerInfo, tableData]);

  // Generate calendar events
  useEffect(() => {
    // Strict type checks
    const isWriterInfoStrict =
      writerInfo.writingLength &&
      writerInfo.reviewSessionCount &&
      writerInfo.startDate;
    const isTableDataStrict = isTableReadyToCreateEvents(tableData);

    if (isWriterInfoStrict && isTableDataStrict) {
      const strictWriterInfo = writerInfo as StrictWriterInfo;
      const strictTableData = tableData as StrictTableItem[];
      setWritingPlan(
        createWritingPlan({
          writerInfo: strictWriterInfo,
          tableData: strictTableData,
        })
      );
    }
  }, [writerInfo, tableData]);

  if (writerInfo.name.length !== 0) {
    return (
      <>
        <AppBar />

        <Typography variant="h4" sx={{ paddingTop: 7, paddingBottom: 2 }}>
          Hi{" "}
          <span
            style={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
            }}
          >
            {writerInfo.name},
          </span>{" "}
          tell me a little more about yourself:
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
                  How long
                </span>{" "}
                do you want to write each essay for? (1-5 days)
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth error={renderWritingLengthError}>
                {!writerInfo.writingLength && (
                  <InputLabel shrink={false}>Writing Length</InputLabel>
                )}
                <Select
                  value={String(writerInfo.writingLength)}
                  onChange={(e) => {
                    setWritingLength(Number(e.target.value));
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
                  How many
                </span>{" "}
                revision sessions do you want (time permitting)?
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth error={renderSessionCountError}>
                {!writerInfo.reviewSessionCount && (
                  <InputLabel shrink={false}>Review sessions</InputLabel>
                )}
                <Select
                  value={String(writerInfo.reviewSessionCount)}
                  onChange={(e) => {
                    setReviewSessionCount(Number(e.target.value));
                  }}
                >
                  <MenuItem value={1}>1 Session</MenuItem>
                  <MenuItem value={2}>2 Sessions</MenuItem>
                  <MenuItem value={3}>3 Sessions</MenuItem>
                  <MenuItem value={4}>4 Sessions</MenuItem>
                  <MenuItem value={5}>5 Sessions</MenuItem>
                  <MenuItem value={6}>6 Sessions</MenuItem>
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
              <Stack direction="row" spacing={1}>
                <ResponsiveDatePicker
                  label={"Start Date"}
                  minDate={dayjs()}
                  renderAsError={renderStartDateError}
                  value={
                    writerInfo.startDate ? dayjs(writerInfo.startDate) : null
                  }
                  onChange={(newValue) => setStartDate(newValue.toDate())}
                />
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={
                    writerInfo.startDate &&
                    dayjs(writerInfo.startDate).isSame(dayjs(), "day")
                  }
                  onClick={() => {
                    setStartDate(dayjs().toDate());
                  }}
                >
                  Today
                </Button>
              </Stack>
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
              <ApplicationTable
                minDate={
                  writerInfo.startDate
                    ? addDays(writerInfo.startDate, 1)
                    : addDays(dayjs().toDate(), 1)
                }
                tableData={tableData}
                setTableData={setTableData}
              />
            </Grid>
          </Grid>
        </div>

        <Divider
          flexItem
          sx={{
            borderRadius: 5,
            borderTopWidth: 1,
          }}
        />

        <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 2 }}>
          Your plan:
        </Typography>

        <ResponsiveCalendar
          events={writingPlan ? writingPlan : []}
          institutionsAppliedTo={
            institutionsAppliedTo ? institutionsAppliedTo : []
          }
        />
      </>
    );
  }
}
