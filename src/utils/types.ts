import { Event } from "react-big-calendar";

export interface WriterInfo {
  name: string;
  writingLength: number | null;
  reviewSessionCount: number | null;
  startDate: Date | null;
}

export interface StrictWriterInfo {
  name: string;
  writingLength: number;
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

export interface CalendarEvent extends Event {
  institution: string;
  title: string;
  start: Date;
  end: Date;
}
