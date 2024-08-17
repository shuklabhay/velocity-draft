import { CalendarEvent, StrictTableItem, StrictWriterInfo } from "./types";
import dayjs from "dayjs";

export function addDays(start: Date, toAdd: number) {
  return dayjs(start).add(toAdd, "days").toDate();
}

export function daysBetween(start: Date, end: Date) {
  return Math.abs(dayjs(start).diff(dayjs(end), "day"));
}

export function isDateOnOrAfterDate(dateToCheck: Date, referenceDate: Date) {
  const dateIsAfter = dayjs(dateToCheck).isAfter(dayjs(referenceDate), "day");
  const dateIsOn = dayjs(dateToCheck).isSame(dayjs(referenceDate), "day");

  return dateIsAfter || dateIsOn;
}

function isDateOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
  return start1 <= end2 && end1 >= start2;
}

function findBestStartDate(
  startDate: Date,
  deadline: Date,
  events: CalendarEvent[],
  writingLength: number
) {
  let bestStartDate = startDate;
  let minOverlapDays = Infinity;

  for (
    let testDate = startDate;
    testDate < deadline;
    testDate = addDays(testDate, 1)
  ) {
    let overlapDays = 0;
    for (const event of events) {
      if (
        event.title.startsWith("✍️ Write") &&
        isDateOverlap(
          testDate,
          addDays(testDate, writingLength - 1),
          event.start,
          event.end
        )
      ) {
        overlapDays++;
      }
    }

    if (overlapDays < minOverlapDays) {
      minOverlapDays = overlapDays;
      bestStartDate = testDate;
    }
    if (minOverlapDays === 0) {
      break;
    }
  }

  return bestStartDate;
}

export function createWritingPlan({
  writerInfo: { writingLength, reviewSessionCount, startDate },
  tableData,
}: {
  writerInfo: StrictWriterInfo;
  tableData: StrictTableItem[];
}) {
  const outputEvents: CalendarEvent[] = [];
  const deadlines: CalendarEvent[] = [];
  const maxReviewLength = 5;

  const sortedTableData = [...tableData].sort((a, b) =>
    dayjs(a.deadline).diff(dayjs(b.deadline))
  );

  sortedTableData.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      institution: "Deadline",
      title: `✉️ ${institution} Deadline`,
      start: deadline,
      end: deadline,
    });

    const daysUntilDeadline = daysBetween(startDate, deadline);
    const essayTag = Number(essayCount) == 1 ? "#1" : `#1-${essayCount}`;
    if (writingLength >= daysUntilDeadline) {
      outputEvents.push({
        institution: institution,
        title: `💨 Write and Review ${institution} ${essayTag}`,
        start: startDate,
        end: deadline,
      });
    } else {
      const essayCountNumber = Number(essayCount);
      const maxEssaysPerDay = essayCountNumber < 5 ? 2 : 3;
      let essayStartDate = startDate;

      let currentEssay = 1;
      while (currentEssay <= essayCountNumber) {
        let endEssay = Math.min(
          currentEssay + maxEssaysPerDay - 1,
          essayCountNumber
        );

        let bestStartDate = findBestStartDate(
          essayStartDate,
          deadline,
          outputEvents,
          writingLength
        );

        let finishedWritingDate = addDays(bestStartDate, writingLength);
        if (isDateOnOrAfterDate(finishedWritingDate, deadline)) {
          finishedWritingDate = deadline;
        }

        let writeTitle = `✍️ Write ${institution} #`;
        if (currentEssay === endEssay) {
          writeTitle += `${currentEssay}`;
        } else {
          writeTitle += `${currentEssay}-${endEssay}`;
        }

        outputEvents.push({
          institution: institution,
          title: writeTitle,
          start: bestStartDate,
          end: finishedWritingDate,
        });

        // Review
        let lastProcessedDate = finishedWritingDate;

        const reviewPeriodLength = Math.abs(
          dayjs(finishedWritingDate).diff(dayjs(deadline), "day")
        );
        const totalReviewSessionTime = reviewSessionCount * maxReviewLength;
        const totalBreakTime = Math.max(
          0,
          reviewPeriodLength - totalReviewSessionTime
        );
        const breakLength =
          reviewSessionCount > 1
            ? Math.max(1, Math.floor(totalBreakTime / (reviewSessionCount - 1)))
            : 0;

        for (let i = 0; i < reviewSessionCount; i++) {
          if (isDateOnOrAfterDate(lastProcessedDate, deadline)) {
            break;
          }

          let reviewEndDate = addDays(lastProcessedDate, maxReviewLength);

          if (dayjs(reviewEndDate).isAfter(dayjs(deadline))) {
            reviewEndDate = deadline;
          }

          let reviewTitle = `📝 Review ${institution} #`;
          for (let j = currentEssay; j <= endEssay; j++) {
            reviewTitle += `${j}, `;
          }
          reviewTitle = reviewTitle.slice(0, -2);

          outputEvents.push({
            institution: institution,
            title: reviewTitle,
            start: lastProcessedDate,
            end: reviewEndDate,
          });

          lastProcessedDate = addDays(
            lastProcessedDate,
            maxReviewLength + breakLength
          );
        }

        currentEssay = endEssay + 1;

        const remainingDays = daysBetween(lastProcessedDate, deadline);
        const staggerDistance =
          writingLength > 3 ? 2 : Math.max(1, Math.floor(remainingDays / 4));

        essayStartDate = addDays(essayStartDate, staggerDistance);
      }
    }
  });

  return [...deadlines, ...outputEvents];
}
