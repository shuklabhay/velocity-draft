import { Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { NavigateAction, ToolbarProps, View } from "react-big-calendar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { downloadICSFile } from "../utils/planner";
import { CalendarEvent } from "../utils/types";

interface CustomToolbarProps extends ToolbarProps {
  calendarEvents?: CalendarEvent[];
}

export default function ResponsiveToolbar(props: CustomToolbarProps) {
  const { onNavigate, label, onView, calendarEvents } = props;
  const [currentView, setCurrentView] = useState<View>("month");

  useEffect(() => {
    onView(currentView);
  }, [currentView, onView]);

  function navigate(action: NavigateAction) {
    onNavigate(action);
  }

  const handleExport = () => {
    if (calendarEvents && calendarEvents.length > 0) {
      downloadICSFile(calendarEvents);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingBottom: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
      spacing={1}
    >
      <Grid item>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: "100%",
          }}
        >
          <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
            <Button
              onClick={() => setCurrentView("month")}
              variant={currentView == "month" ? "contained" : "outlined"}
              sx={{
                textTransform: "capitalize",
                flex: 1,
              }}
            >
              Calendar
            </Button>
            <Button
              onClick={() => setCurrentView("agenda")}
              variant={currentView == "agenda" ? "contained" : "outlined"}
              sx={{
                textTransform: "capitalize",
                flex: 1,
              }}
            >
              Agenda
            </Button>
          </Stack>
          <Button
            onClick={handleExport}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
            }}
            startIcon={<DownloadIcon />}
            disabled={calendarEvents && calendarEvents.length == 0}
          >
            Export Calendar (ics)
          </Button>
        </Stack>
      </Grid>

      <Grid item sx={{ width: { xs: "100%", md: "auto" } }}>
        <Typography variant="h4">{label}</Typography>
      </Grid>

      <Grid item>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => navigate("PREV")}
            sx={{ textTransform: "none", minWidth: "5%" }}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("TODAY")}
            sx={{ textTransform: "none" }}
          >
            Today
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("NEXT")}
            sx={{ textTransform: "none", minWidth: "5%" }}
          >
            <ArrowRightIcon />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
