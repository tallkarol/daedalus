export type EventInput = {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  timezone: string;
  allDay: boolean;
  end?: Date | null;
  url?: string;
  organizerName?: string;
  organizerEmail?: string;
};

const CALENDAR_BASE = "https://calendar.google.com/calendar/render?action=TEMPLATE";
const OUTLOOK_BASE = "https://outlook.office.com/calendar/0/deeplink/compose";

function formatDateUTC(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
}

function formatAllDay(date: Date) {
  return date.toISOString().split("T")[0].replace(/-/g, "");
}

export function buildCalendarLinks(input: EventInput) {
  const start = input.allDay ? formatAllDay(input.start) : formatDateUTC(input.start);
  const endDate = input.end ?? new Date(input.start.getTime() + 60 * 60 * 1000);
  const end = input.allDay ? formatAllDay(endDate) : formatDateUTC(endDate);

  const details = [input.description, input.url].filter(Boolean).join("\n\n");
  const location = input.location ?? "";

  const googleParams = new URLSearchParams({
    text: input.title,
    details,
    location,
    dates: `${start}/${end}`,
  });

  const outlookParams = new URLSearchParams({
    subject: input.title,
    body: details,
    location,
    startdt: input.allDay
      ? `${input.start.toISOString().split("T")[0]}T00:00:00Z`
      : input.start.toISOString(),
    enddt: input.allDay
      ? `${endDate.toISOString().split("T")[0]}T00:00:00Z`
      : endDate.toISOString(),
  });

  return {
    google: `${CALENDAR_BASE}&${googleParams.toString()}`,
    outlook: `${OUTLOOK_BASE}?${outlookParams.toString()}`,
  };
}
