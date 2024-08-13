import * as React from "react";
import { Stack, useTheme } from "@mui/material";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import ResponsiveToolbar from "./ResponsiveToolbar";
import { CalendarEvent } from "../utils/types";
import ResponsiveEvent from "./ResponsiveEvent";

export default function ResponsiveCalendar(events: CalendarEvent[]) {
  const localizer = dayjsLocalizer(dayjs);
  const theme = useTheme();
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const minCalSize = 2 * 175 + 200;

  const maxEventsOnDay = events.reduce((max, event) => {
    let dayToCheck = dayjs(event.start);
    while (dayToCheck.isBefore(dayjs(event.end).add(1, "day"))) {
      const eventsOnThisDay = events.filter(
        (e) =>
          dayjs(e.start).isSameOrBefore(dayToCheck) &&
          dayjs(e.end).isSameOrAfter(dayToCheck)
      ).length;
      max = Math.max(max, eventsOnThisDay);
      dayToCheck = dayToCheck.add(1, "day");
    }
    return max;
  }, 0);

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = theme.palette.primary.main;
    if (event.title.includes("Deadline")) {
      backgroundColor = theme.palette.error.main;
    }
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <Stack spacing={0} sx={{ paddingBottom: 2 }}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{
          height: maxEventsOnDay < 2 ? minCalSize : maxEventsOnDay * 175 + 200,
          borderRadius: 50,
        }}
        components={{
          toolbar: ResponsiveToolbar,
          event: ResponsiveEvent,
        }}
        eventPropGetter={eventStyleGetter}
      />

      {/* add saving stuff here */}
    </Stack>
  );
}
