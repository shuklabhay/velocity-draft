import * as React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import {
  Calendar,
  dayjsLocalizer,
  NavigateAction,
  ToolbarProps,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import CalendarToolbar from "./CalendarToolbar";

export default function ResponsiveCalendar() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const events = [
    {
      title: "heyyy",
      start: dayjs("2024-08-11").toDate(),
      end: dayjs("2024-08-13").toDate(),
    },
    {
      title: "heyyy",
      start: dayjs("2024-08-11").toDate(),
      end: dayjs("2024-08-13").toDate(),
    },
    {
      title: "heyyy",
      start: dayjs("2024-08-11").toDate(),
      end: dayjs("2024-08-13").toDate(),
    },
  ];

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

  return (
    <Stack spacing={0} sx={{ paddingBottom: 2 }}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: maxEventsOnDay * 125 + 175 }}
        components={{
          toolbar: CalendarToolbar,
        }}
      />

      {/* add saving stuff here */}
    </Stack>
  );
}
