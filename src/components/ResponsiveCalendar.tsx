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
import "./calendarStyles.css";

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
    return events * 150 + 215;
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
    <Stack spacing={0} sx={{ paddingBottom: 2 }}>
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
