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
import { generateRandomColor } from "../utils/color";

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

  const minCalSize = 2 * 145 + 200;

  const maxEventsOnDay = events.reduce((max, event) => {
    const eventsOnThisDay = events.filter((e) =>
      dayjs(e.start).isSame(dayjs(event.start), "day")
    ).length;
    max = Math.max(max, eventsOnThisDay);
    return max;
  }, 0);

  if (institutionsAppliedTo) {
  }
  const indexedColors = institutionsAppliedTo.map(() => generateRandomColor());

  const eventStyleGetter = (event: CalendarEvent) => {
    const currenetInstitutionIndex = institutionsAppliedTo.findIndex(
      (institution) => event.title.includes(institution)
    );
    let backgroundColor = indexedColors[currenetInstitutionIndex]
      ? indexedColors[currenetInstitutionIndex]
      : theme.palette.primary.main;

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
          height: maxEventsOnDay < 2 ? minCalSize : maxEventsOnDay * 145 + 200,
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
