import { TableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// if not enough time  have one event from start to deadline titled WRITE&REVIEWESSAY- make it red or sth too ig
function isEnoughTime(startDate: Date, timeToWrite: number, deadline: Date) {
  const startDateDayjs = dayjs(startDate);
  const deadlineDayjs = dayjs(deadline);

  const timeToDeadline = Math.abs(startDateDayjs.diff(deadlineDayjs, "days"));
  return timeToDeadline > timeToWrite;
}

export function createWritingPlan({
  writerInfo,
  applicationInfo,
}: {
  writerInfo: WriterInfo;
  applicationInfo: TableItem;
}) {
  // get distance between starting date and deadline - 1
  // determine how long to write
  // determine how long & how much to review after wrting how to space it out
  // FIGURE OUT how to have staggered writing dates so all schools arent written in one day
  // probably schools with later starting dates start 1-2 days off or whatever
}
