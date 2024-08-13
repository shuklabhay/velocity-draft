import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

function determineWritingTime(speed: number) {
  return Math.round(7 / speed);
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

function addDays(start: Date, toAdd: number) {
  return dayjs(start).add(toAdd, "days").toDate();
}

function daysUntil(start: Date, end: Date) {
  return dayjs(start).diff(dayjs(end), "day");
}

export function createWritingPlan({
  writerInfo: { name, speed, reviewSessionCount, startDate },
  tableData,
}: {
  writerInfo: WriterInfo;
  tableData: StrictTableItem[];
}) {
  const sortedEssaysToWrite = sortByDeadline(tableData);
  const writingTime = determineWritingTime(speed);

  const outputEvents: CalendarEvent[] = [];

  sortedEssaysToWrite.forEach(({ recipient, essayCount, deadline }) => {
    for (
      let currentEssay = 1;
      currentEssay <= Number(essayCount);
      currentEssay++
    ) {
      // Write Essay
      const finishedWritingDate = addDays(startDate, writingTime);
      const daysUntilDeadline = daysUntil(startDate, deadline);

      // clean this up, incorp this w/ logic below or wtv- do date check before making writing event so everything in order
      outputEvents.push({
        title: `Write ${recipient} Essay ${currentEssay}`,
        start: startDate,
        end: writingTime < daysUntilDeadline ? finishedWritingDate : deadline,
      });

      const reviewPeriodLength = Math.abs(
        dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
      );

      const breakLength = 1;
      const breakCount = reviewSessionCount - 1;
      const breaks =
        reviewPeriodLength >= reviewSessionCount + breakCount * breakLength;

      const reviewSessionLength = breaks
        ? Math.floor(reviewPeriodLength - breakCount / reviewSessionCount)
        : Math.floor(reviewPeriodLength / reviewSessionCount);

      if (reviewSessionLength >= 2) {
        let lastProcessedDate = finishedWritingDate;
        for (let i = 0; i < reviewSessionCount; i++) {
          outputEvents.push({
            title: `Review ${recipient} Essay ${currentEssay}`,
            start: lastProcessedDate,
            end: addDays(lastProcessedDate, reviewSessionLength),
          });
          lastProcessedDate = addDays(
            lastProcessedDate,
            reviewSessionLength + breakLength
          );
        }
      } else {
        // find how many 2 day review sessions can happen, create events
      }
    }
  });
  return outputEvents;
}
