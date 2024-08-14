import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: fix +n more view on calender
// TODO: make case where time to finish = time to write also say write and review

// TODO: maybe just calculate all the times and stuff before going into each essay- also
//       allows 1 event for write&review every essay case then instead of 7 lol
// TODO: above should also helpfind a way to stagger 'writing' so that closest deadlines
// will be written earlier

// TODO: all the gh error stuff
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
      institution: institution,
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
          institution: institution,
          title: `Write and Review ${institution} Essay ${currentEssay}`,
          start: startDate,
          end: deadline,
        });
      } else {
        const finishedWritingDate = addDays(startDate, writingTime);
        const reviewPeriodLength = Math.abs(
          dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
        );

        const totalDays = daysBetween(startDate, deadline);
        const breakLength = Math.max(1, Math.floor(totalDays / 15));

        const breakCount = reviewSessionCount - 1;
        const potentialReviewSessionLength = Math.floor(
          reviewPeriodLength / reviewSessionCount
        );

        const totalTimeWithBreaks =
          reviewSessionCount * potentialReviewSessionLength +
          breakCount * breakLength;
        const breaks = reviewPeriodLength >= totalTimeWithBreaks;
        const reviewSessionLength = breaks
          ? Math.min(
              4,
              Math.floor(
                (reviewPeriodLength - breakCount * breakLength) /
                  reviewSessionCount
              )
            )
          : Math.min(4, potentialReviewSessionLength);
        outputEvents.push({
          institution: institution,
          title: `Write ${institution} Essay ${currentEssay}`,
          start: startDate,
          end: finishedWritingDate,
        });

        let lastProcessedDate = finishedWritingDate;
        for (let i = 0; i < reviewSessionCount; i++) {
          if (isDateOnOrAfterDate(lastProcessedDate, deadline)) {
            break;
          }
          let reviewEndDate = addDays(lastProcessedDate, reviewSessionLength);
          if (isDateOnOrAfterDate(reviewEndDate, deadline)) {
            reviewEndDate = addDays(deadline, -1);
          }

          outputEvents.push({
            institution: institution,
            title: `Review ${institution} Essay ${currentEssay}`,
            start: lastProcessedDate,
            end: reviewEndDate,
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
