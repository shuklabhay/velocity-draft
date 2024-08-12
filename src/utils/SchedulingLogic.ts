import { StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

function determineWritingTime(speed: number) {
  return Math.round(7 / speed);
}

function isEnoughTime(startDate: Date, timeToComplete: number, deadline: Date) {
  const startDateDayjs = dayjs(startDate);
  const deadlineDayjs = dayjs(deadline);

  const timeToDeadline = Math.abs(startDateDayjs.diff(deadlineDayjs, "days"));
  return timeToDeadline > timeToComplete;
}

function sortByDeadline(tableItems: StrictTableItem[]) {
  const sortedTableItems = [...tableItems];

  sortedTableItems.sort((a, b) => {
    const deadlineA = dayjs(a.deadline);
    const deadlineB = dayjs(b.deadline);
    return deadlineA.diff(deadlineB);
  });

  return sortedTableItems;
}

export function createWritingPlan({
  writerInfo,
  essaysToWrite,
}: {
  writerInfo: WriterInfo;
  essaysToWrite: StrictTableItem[];
}) {
  const sortedEssaysToWrite = sortByDeadline(essaysToWrite);
  const timeToWrite = determineWritingTime(writerInfo.speed);

  sortedEssaysToWrite.forEach((tableItem, i) => {
    // Determine review session lengths, factor into timeToComplete

    // if lots of time space out, if not a lot of time stack onto each other. minimum len=1
    // fail if more than 2 sessions on one day

    if (isEnoughTime(writerInfo.startDate, timeToWrite, tableItem.deadline)) {
      console.log("hiii");
    } else {
      // create WRITE&REVIEW block
    }
  });

  // get distance between starting date and deadline - revision period
  // determine how long to write (const)
  // make events for writing and revision period- optimize for
  // FIGURE OUT how to have staggered writing dates so all schools arent written in one day
  // Stagger writing multiple essays, then have reviewing periods for all of them
  // probably schools with later starting dates start 1-2 days off or whatever
}
