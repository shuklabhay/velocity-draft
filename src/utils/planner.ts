import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: find a way to stagger 'writing' so that closest deadlines will be written earlier
// throughout all colleges, also stagger writing btwn essays in each college. earliest
// deadline = earliest done, later deadlines start later but ig still like have that # of
// review sessions. like one writing block and then reviewing over time while for another
// school theres a writing block after it and closer review sessions so over time theres a
// lot of review sessions happening but break+review lengths change/wtv. closer deadlines
// just supposed to have writing block happen then later further block- so every school
// everything isnt being written in one week. MAKE STAGGERING REAL

// TODO: all the gh error stuff

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
  writerInfo: { writingLength, reviewSessionCount, startDate },
  tableData,
}: {
  writerInfo: WriterInfo;
  tableData: StrictTableItem[];
}) {
  const outputEvents: CalendarEvent[] = [];
  const deadlines: CalendarEvent[] = [];
  const maxReviewLength = 5;

  // Deadline
  tableData.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      institution: "Deadline",
      title: `✉️ ${institution} Deadline`,
      start: deadline,
      end: deadline,
    });

    // Event Creator
    const daysUntilDeadline = daysBetween(startDate, deadline);
    const essayTag =
      Number(essayCount) == 1 ? "Essay 1" : `Essays 1-${essayCount}`;
    if (writingLength >= daysUntilDeadline) {
      // Write and Review
      outputEvents.push({
        institution: institution,
        title: `💨 Write and Review ${institution} ${essayTag}`,
        start: startDate,
        end: deadline,
      });
    } else {
      // on breaklen=0 case just generate one write and one review for 1-6 or wtv. make some
      // kidna like events to create for the for loop instead of iterating on essay coubt.
      // it wont always be max count bc like staggering or wtv will be write 1-2 on one
      // day 3-4 on other day
      for (
        let currentEssay = 1;
        currentEssay <= Number(essayCount);
        currentEssay++
      ) {
        // Write
        let finishedWritingDate = addDays(startDate, writingLength);
        if (isDateOnOrAfterDate(finishedWritingDate, deadline)) {
          finishedWritingDate = addDays(deadline, -1);
        }

        outputEvents.push({
          institution: institution,
          title: `✍️ Write ${institution} Essay ${currentEssay}`,
          start: startDate,
          end: finishedWritingDate,
        });

        // Review
        const reviewPeriodLength = Math.abs(
          dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
        );
        const reviewSessionLength = Math.min(
          maxReviewLength,
          Math.floor(reviewPeriodLength / reviewSessionCount)
        );

        const totalReviewTime = reviewSessionCount * reviewSessionLength;
        const totalBreakTime =
          daysBetween(finishedWritingDate, deadline) - totalReviewTime;
        const breakLength =
          reviewSessionCount > 1
            ? Math.max(1, Math.floor(totalBreakTime / (reviewSessionCount - 1)))
            : 0;

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
            title: `📝 Review ${institution} Essay ${currentEssay}`,
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
