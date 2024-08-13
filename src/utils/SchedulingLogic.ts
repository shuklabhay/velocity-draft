import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: figure out why breaks dont generate
// TODO: find a way to stagger 'writing' so that closest deadlines will be written first;
//       so bascially (verify that the sortbydeadline is working)
// TODO: make every school's events a different color

// TODO: do some more bigbrain stuff, like if u only have 2 days for writing essay just
//       make one event for all of them, multiple events is only needed bc of the staggering stuff
function determineWritingTime(speed: number) {
  return Math.round(7 / speed);
}

function sortByDeadline(tableItems: StrictTableItem[]) {
  const sortedTableItems = [...tableItems];

  sortedTableItems.sort((a, b) => {
    return dayjs(a.deadline).diff(dayjs(b.deadline));
  });

  return sortedTableItems;
}

function addDays(start: Date, toAdd: number) {
  return dayjs(start).add(toAdd, "days").toDate();
}

function daysBetween(start: Date, end: Date) {
  return Math.abs(dayjs(start).diff(dayjs(end), "day"));
}

function isDateOnOrAfterDate(dateToCheck: Date, referenceDate: Date) {
  const dateIsAfter = dayjs(dateToCheck).isAfter(dayjs(referenceDate), "day");
  const dateIsOn = dayjs(dateToCheck).isSame(dayjs(referenceDate), "day");

  return dateIsAfter || dateIsOn;
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
  const deadlines: CalendarEvent[] = [];

  sortedEssaysToWrite.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      title: `${institution} Deadline`,
      start: deadline,
      end: deadline,
    });
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
          if (isDateOnOrAfterDate(lastProcessedDate, deadline)) {
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
  return [...deadlines, ...outputEvents];
}
