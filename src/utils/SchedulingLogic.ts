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

function daysBetween(start: Date, end: Date) {
  return Math.abs(dayjs(start).diff(dayjs(end), "day"));
}

function isDateAfterDate(dateToCheck: Date, referenceDate: Date) {
  return dayjs(dateToCheck).isAfter(dayjs(referenceDate), "day");
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

  sortedEssaysToWrite.forEach(({ institution, essayCount, deadline }) => {
    for (
      let currentEssay = 1;
      currentEssay <= Number(essayCount);
      currentEssay++
    ) {
      const daysUntilDeadline = daysBetween(startDate, deadline);

      if (writingTime > daysUntilDeadline) {
        outputEvents.push({
          title: `Write and Review ${institution} Essay ${currentEssay}`,
          start: startDate,
          end: deadline,
        });
      } else {
        const finishedWritingDate = addDays(startDate, writingTime);
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

        outputEvents.push({
          title: `Write ${institution} Essay ${currentEssay}`,
          start: startDate,
          end: finishedWritingDate,
        });

        let lastProcessedDate = finishedWritingDate;
        for (let i = 0; i < reviewSessionCount; i++) {
          if (isDateAfterDate(lastProcessedDate, deadline)) {
            break;
          }
          outputEvents.push({
            title: `Review ${institution} Essay ${currentEssay}`,
            start: lastProcessedDate,
            end: addDays(lastProcessedDate, reviewSessionLength),
          });
          lastProcessedDate = addDays(
            lastProcessedDate,
            reviewSessionLength + breakLength
          );
        }
      }
    }
  });
  return outputEvents;
}
