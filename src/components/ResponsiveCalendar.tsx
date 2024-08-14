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
import { usableColors } from "../utils/color";

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

  const eventStyleGetter = (event: CalendarEvent) => {
    let color = theme.palette.primary.contrastText;
    let backgroundColor = theme.palette.primary.main;
    if (
      event.title.includes("Deadline") &&
      !(event.title.includes("Write") || event.title.includes("Review"))
    ) {
      backgroundColor = theme.palette.error.main;
    } else {
      const match = event.title.match(
        /(Write|Review|Write and Review)\s+(.+?)\s+Essay\s+\d+/i
      );
      const extractedText = match ? match[2] : null;
      const currenetInstitutionIndex = institutionsAppliedTo.findIndex(
        (institution) => extractedText == institution
      );
      backgroundColor = usableColors[
        currenetInstitutionIndex % usableColors.length
      ]
        ? usableColors[currenetInstitutionIndex % usableColors.length]
        : theme.palette.primary.main;
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
        localizer={localizer}
        events={events}
        style={{
          height: Math.max(minCalSize, maxEventsOnDay * 145 + 200),
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
