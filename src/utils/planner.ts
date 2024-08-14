import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: above should also helpfind a way to stagger 'writing' so that closest deadlines
// will be written earlier
// TODO: get name thing working, redirect to home page if no name is entered

// TODO: all the gh error stuff
function determineWritingTime(speed: number) {
  return Math.round(7 / speed);
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
  writerInfo: { speed, reviewSessionCount, startDate },
  tableData,
}: {
  writerInfo: WriterInfo;
  tableData: StrictTableItem[];
}) {
  const writingTime = determineWritingTime(speed);

  const outputEvents: CalendarEvent[] = [];
  const deadlines: CalendarEvent[] = [];

  const maxReviewLength = 5;

  tableData.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      institution: "Deadline",
      title: `${institution} Deadline`,
      start: deadline,
      end: deadline,
    });

    const daysUntilDeadline = daysBetween(startDate, deadline);

    if (writingTime >= daysUntilDeadline) {
      outputEvents.push({
        institution: institution,
        title: `Write and Review ${institution} Essays 1-${essayCount}`,
        start: startDate,
        end: deadline,
      });
    } else {
      for (
        let currentEssay = 1;
        currentEssay <= Number(essayCount);
        currentEssay++
      ) {
        const finishedWritingDate = addDays(startDate, writingTime);
        const reviewPeriodLength = Math.abs(
          dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
        );
        const potentialReviewSessionLength = Math.floor(
          reviewPeriodLength / reviewSessionCount
        );
        const reviewSessionLength = Math.min(
          maxReviewLength,
          potentialReviewSessionLength
        );
        const totalReviewPeriodLength = daysBetween(
          finishedWritingDate,
          deadline
        );

        const totalReviewTime = reviewSessionCount * reviewSessionLength;
        const totalBreakTime = totalReviewPeriodLength - totalReviewTime;
        const breakLength =
          reviewSessionCount > 1
            ? Math.max(1, Math.floor(totalBreakTime / (reviewSessionCount - 1)))
            : 0;

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
