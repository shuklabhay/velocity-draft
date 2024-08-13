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

function hasSufficientContrast(color1: string, color2: string): boolean {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);
  const brighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (brighter + 0.05) / (darker + 0.05) >= 4.5; // 4.5:1 contrast ratio
}

function getRelativeLuminance(hexColor: string): number {
  const r = parseInt(hexColor.substring(1, 3), 16) / 255;
  const g = parseInt(hexColor.substring(3, 5), 16) / 255;
  const b = parseInt(hexColor.substring(5, 7), 16) / 255;
  const RsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const GsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const BsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * RsRGB + 0.7152 * GsRGB + 0.0722 * BsRGB;
}

function getRandomColor(): string {
  let color;
  do {
    const letters = "0123456789ABCDEF";
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (!hasSufficientContrast(color, "#FFFFFF"));
  return color;
}

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

  // there is a better way to do this
  const indexedColors = institutionsAppliedTo.map(() => getRandomColor());

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = theme.palette.primary.main;

    const institutionIndex = institutionsAppliedTo.findIndex((institution) =>
      event.title.includes(institution)
    );
    if (institutionIndex !== -1) {
      backgroundColor = indexedColors[institutionIndex];
    }

    if (event.title.includes("Deadline")) {
      backgroundColor = theme.palette.error.main;
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  console.log(maxEventsOnDay);
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
