import { Event } from "react-big-calendar";

export interface WriterInfo {
  name: string;
  speed: number;
  reviewSessionCount: number;
  startDate: Date;
}

export interface TableItem {
  institution: string;
  essayCount: string;
  deadline: Date | null;
}

export interface StrictTableItem {
  institution: string;
  essayCount: string;
  deadline: Date;
}

export interface WritingPlan {
  plan: CalendarEvent[];
}

export interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
}
