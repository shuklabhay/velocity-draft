import dayjs from "dayjs";
import { Event } from "react-big-calendar";

export interface TableItem {
  recipient: string;
  essayCount: string;
  deadline: dayjs.Dayjs | null;
}

export interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
}
