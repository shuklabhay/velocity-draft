import { CalendarEvent, StrictTableItem, WriterInfo } from "./types";
import dayjs from "dayjs";

// TODO: above should also helpfind a way to stagger 'writing' so that closest deadlines
// will be written earlier

// TODO: save form info in a use state
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

  let currentEssayStartDate = dayjs(startDate);

  tableData.forEach(({ institution, essayCount, deadline }) => {
    deadlines.push({
      institution: "Deadline",
      title: `✉️ ${institution} Deadline`,
      start: deadline,
      end: deadline,
    });

    let daysUntilDeadline = daysBetween(
      currentEssayStartDate.toDate(),
      deadline
    );

    if (writingLength >= daysUntilDeadline) {
      currentEssayStartDate = dayjs(deadline).subtract(writingLength, "day");
      daysUntilDeadline = writingLength;
    }

    const totalWritingDays = Math.min(daysUntilDeadline, Number(essayCount));
    const baseEssaysPerDay = Math.floor(Number(essayCount) / totalWritingDays);
    const extraEssays = Number(essayCount) % totalWritingDays;

    let currentEssay = 1;

    for (let day = 0; day < totalWritingDays; day++) {
      const essaysToWriteToday = baseEssaysPerDay + (day < extraEssays ? 1 : 0);

      for (
        let i = 0;
        i < essaysToWriteToday && currentEssay <= Number(essayCount);
        i++
      ) {
        let finishedWritingDate = addDays(
          currentEssayStartDate.toDate(),
          writingLength
        );

        if (isDateOnOrAfterDate(finishedWritingDate, deadline)) {
          finishedWritingDate = addDays(deadline, -1);
          currentEssayStartDate = dayjs(finishedWritingDate).subtract(
            writingLength,
            "day"
          );
        }

        outputEvents.push({
          institution: institution,
          title: `✍️ Write ${institution} Essay ${currentEssay}`,
          start: currentEssayStartDate.toDate(),
          end: finishedWritingDate,
        });

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

        let lastProcessedDate = finishedWritingDate;
        for (let i = 0; i < reviewSessionCount; i++) {
          if (isDateOnOrAfterDate(lastProcessedDate, deadline)) {
            break;
          }
          let reviewEndDate = addDays(lastProcessedDate, reviewSessionLength);
          if (isDateOnOrAfterDate(reviewEndDate, deadline)) {
            reviewEndDate = deadline;
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

        currentEssay++;
      }
      currentEssayStartDate = currentEssayStartDate.add(1, "day");
    }
  });

  return [...deadlines, ...outputEvents];
}
