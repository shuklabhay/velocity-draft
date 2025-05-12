import { Stack, useTheme } from "@mui/material";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import ResponsiveToolbar from "./ResponsiveToolbar";
import { CalendarEvent } from "../utils/types";
import ResponsiveEvent from "./ResponsiveEvent";
import { generatedColors } from "../utils/color";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from "react";

export default function ResponsiveCalendar({
  events,
  institutionsAppliedTo,
}: {
  events: CalendarEvent[];
  institutionsAppliedTo: string[];
}) {
  const localizer = dayjsLocalizer(dayjs);
  const theme = useTheme();

  function windowHeight(events: number) {
    return events * 165 + 215;
  }

  const minCalSize = windowHeight(2);

  const maxEventsOnDay = events.reduce((max: number, _, index, arr) => {
    const uniqueDays = new Set(
      arr.flatMap((event) => {
        const start = dayjs(event.start);
        const end = dayjs(event.end);
        const days: string[] = [];
        for (
          let d = start;
          d.isBefore(end) || d.isSame(end, "day");
          d = d.add(1, "day")
        ) {
          days.push(d.format("YYYY-MM-DD"));
        }
        return days;
      })
    );

    const maxOnAnyDay = Array.from(uniqueDays).reduce(
      (dayMax: number, date) => {
        const eventsOnThisDay = arr.filter(
          (event) =>
            (dayjs(date).isSame(dayjs(event.start), "day") ||
              dayjs(date).isAfter(dayjs(event.start), "day")) &&
            (dayjs(date).isSame(dayjs(event.end), "day") ||
              dayjs(date).isBefore(dayjs(event.end), "day"))
        ).length;
        return Math.max(dayMax, eventsOnThisDay);
      },
      0
    );

    return Math.max(max, maxOnAnyDay);
  }, 0);

  // Event styling
  const eventStyleGetter = (event: CalendarEvent, start: Date, end: Date) => {
    let color = theme.palette.primary.contrastText;
    let backgroundColor = theme.palette.primary.main;
    if (
      event.title.includes("Deadline") &&
      !(event.title.includes("Write") || event.title.includes("Review"))
    ) {
      backgroundColor = theme.palette.error.main;
    } else {
      const currenetInstitutionIndex = institutionsAppliedTo.findIndex(
        (institution) => event.institution == institution
      );
      const colorToUse =
        generatedColors[currenetInstitutionIndex % generatedColors.length];
      backgroundColor = colorToUse ? colorToUse : theme.palette.primary.main;
    }

    return {
      style: {
        backgroundColor,
        color,
      },
    };
  };

  const CustomResponsiveToolbar = (toolbarProps: any) => (
    <ResponsiveToolbar {...toolbarProps} calendarEvents={events} />
  );

  return (
    <Stack
      spacing={0}
      sx={{
        paddingBottom: 2,
        "& .rbc-month-view, .rbc-agenda-view, .rbc-agenda-table": {
          border: `2px solid ${theme.palette.calendarLineColor.main}`,
          borderRadius: 2,
        },
        "& .rbc-agenda-view .rbc-agenda-table": {
          border: "none",
        },
        "& .rbc-off-range-bg": {
          backgroundColor: `${theme.palette.calendarOffRangeColor.main}`,
        },
        "& .rbc-today": {
          backgroundColor: `${theme.palette.calendarTodayColor.main}`,
        },
        "& .rbc-agenda-time-cell": {
          display: "none",
        },
        "& .rbc-agenda-view .rbc-agenda-table th:nth-of-type(2)": {
          display: "none",
        },
        "& .rbc-agenda-view .rbc-agenda-table .rbc-agenda-row:not(:first-of-type)":
          {
            borderTop: `1px solid ${theme.palette.agendaLineColor.main}`,
          },
        "& .rbc-agenda-view .rbc-agenda-table td:not(:last-child)": {
          borderRight: `1px solid ${theme.palette.agendaLineColor.main}`,
        },
        "& .rbc-agenda-view .rbc-agenda-table td:not(:first-of-type)": {
          borderLeft: "none",
        },
      }}
    >
      <Calendar
        showAllEvents={true}
        localizer={localizer}
        events={events}
        style={{
          height: Math.max(minCalSize, windowHeight(maxEventsOnDay)),
          borderRadius: 50,
        }}
        components={{
          toolbar: CustomResponsiveToolbar,
          event: ResponsiveEvent,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </Stack>
  );
}
