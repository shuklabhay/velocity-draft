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

  const sortedTableData = tableData
    .map((item) => ({ ...item, deadline: dayjs(item.deadline).toDate() }))
    .sort((a, b) => dayjs(a.deadline).diff(dayjs(b.deadline)));

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

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function generateUID(): string {
  return (
    "velocitydraft-" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    "-" +
    Date.now().toString()
  );
}

export function generateICSContent(events: CalendarEvent[]): string {
  const now = new Date();
  const timestamp = dayjs(now).format("YYYYMMDDTHHmmss") + "Z";

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VelocityDraft//Essay Planning Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  events.forEach((event) => {
    if (
      !event.start ||
      !event.end ||
      isNaN(event.start.getTime()) ||
      isNaN(event.end.getTime())
    ) {
      console.error("Invalid date found for event:", event.title);
      return;
    }
    const startDate = dayjs(event.start).format("YYYYMMDD");
    const endDate = dayjs(event.end).format("YYYYMMDD");

    const summary = escapeICSText(event.title);
    const description = escapeICSText(`Institution: ${event.institution}`);
    const uid = generateUID();

    icsContent = icsContent.concat([
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${timestamp}`,
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      "SEQUENCE:0",
      "STATUS:CONFIRMED",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    ]);
  });

  icsContent.push("END:VCALENDAR");
  return icsContent.join("\r\n");
}

export function downloadICSFile(events: CalendarEvent[]): void {
  let startDate = new Date();
  if (events && events.length > 0 && events[0]) {
    startDate = events.reduce((earliest, event) => {
      return event.start < earliest ? event.start : earliest;
    }, events[0].start);
  }
  const startDateFormatted = dayjs(startDate).format("YYYY-MM-DD");

  const fileName = `velocitydraft-schedule-${startDateFormatted}.ics`;

  const icsContent = generateICSContent(events);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
