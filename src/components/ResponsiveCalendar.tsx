import * as React from "react";
import { Stack, useTheme } from "@mui/material";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import ResponsiveToolbar from "./ResponsiveToolbar";
import { CalendarEvent } from "../utils/types";
import ResponsiveEvent from "./ResponsiveEvent";
import { usableColors } from "../utils/color";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function ResponsiveCalendar({
  events,
  institutionsAppliedTo,
}: {
  events: CalendarEvent[];
  institutionsAppliedTo: string[];
}) {
  const localizer = dayjsLocalizer(dayjs);
  const theme = useTheme();
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  function windowHeight(events: number) {
    return events * 165 + 215;
  }

  const minCalSize = windowHeight(2);

  const maxEventsOnDay = events.reduce((max, event) => {
    const eventsOnThisDay = events.filter((e) => {
      const start = dayjs(e.start);
      const end = dayjs(e.end);
      return (
        start.isSame(dayjs(event.start), "day") ||
        (start.isBefore(dayjs(event.start), "day") &&
          end.isAfter(dayjs(event.start), "day"))
      );
    }).length;

    max = Math.max(max, eventsOnThisDay);
    return max;
  }, 0);

  const eventStyleGetter = (event: CalendarEvent) => {
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
        usableColors[currenetInstitutionIndex % usableColors.length];
      backgroundColor = colorToUse ? colorToUse : theme.palette.primary.main;
    }

    return {
      style: {
        backgroundColor,
        color,
      },
    };
  };

  return (
    <Stack
      spacing={0}
      sx={{
        paddingBottom: 2,
        "& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view": {
          border: `1px solid ${theme.palette.calendarLineColor.main}`,
          borderRadius: 2,
        },
        "& .rbc-month-view .rbc-month-row + .rbc-month-row": {
          borderTop: `1px solid ${theme.palette.calendarLineColor.main}`,
        },
        "& .rbc-month-view .rbc-day-bg + .rbc-day-bg, & .rbc-time-view .rbc-time-gutter + .rbc-time-gutter":
          {
            borderLeft: `1px solid ${theme.palette.calendarLineColor.main}`,
          },
        "& .rbc-month-view .rbc-header, & .rbc-time-view .rbc-time-header": {
          borderBottom: `1px solid ${theme.palette.calendarLineColor.main}`,
        },
        "& .rbc-month-view .rbc-header + .rbc-header, & .rbc-time-view .rbc-time-header + .rbc-time-header":
          {
            borderLeft: `1px solid ${theme.palette.calendarLineColor.main}`,
          },
        "& .rbc-off-range-bg": {
          backgroundColor: `${theme.palette.calendarOffRangeColor.main}`,
        },
        "& .rbc-today": {
          backgroundColor: `${theme.palette.calendarTodayColor.main}`,
        },
        "& .rbc-agenda-view .rbc-agenda-table .rbc-agenda-row + .rbc-agenda-row":
          {
            borderTop: `1px solid ${theme.palette.agendaLineColor.main}`,
          },
        "& .rbc-agenda-view .rbc-agenda-table td": {
          borderLeft: `1px solid ${theme.palette.agendaLineColor.main}`,
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
          toolbar: ResponsiveToolbar,
          event: ResponsiveEvent,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </Stack>
  );
}
