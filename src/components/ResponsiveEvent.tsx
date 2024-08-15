import { Typography } from "@mui/material";
import { CalendarEvent } from "../utils/types";

export default function ResponsiveEvent({ event }: { event: CalendarEvent }) {
  return (
    <Typography sx={{ paddingTop: "2px", fontSize: "14px" }}>
      {event.title}
    </Typography>
  );
}
