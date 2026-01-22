const CRLF = "\r\n";

function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatUtc(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0].replace(/-/g, "");
}

export type IcsInput = {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  url?: string;
  organizerName?: string;
  organizerEmail?: string;
};

export function buildIcs({
  title,
  description,
  location,
  start,
  end,
  allDay,
  url,
  organizerName,
  organizerEmail,
}: IcsInput) {
  const uid = `${Date.now()}@daedalus`;
  const dtstamp = formatUtc(new Date());
  const dtstart = allDay ? `VALUE=DATE:${formatDate(start)}` : formatUtc(start);
  const dtend = allDay ? `VALUE=DATE:${formatDate(end)}` : formatUtc(end);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Daedalus//Relay//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    allDay ? `DTSTART;${dtstart}` : `DTSTART:${dtstart}`,
    allDay ? `DTEND;${dtend}` : `DTEND:${dtend}`,
    `SUMMARY:${escapeText(title)}`,
  ];

  if (description) {
    lines.push(`DESCRIPTION:${escapeText(description)}`);
  }
  if (location) {
    lines.push(`LOCATION:${escapeText(location)}`);
  }
  if (url) {
    lines.push(`URL:${escapeText(url)}`);
  }
  if (organizerName && organizerEmail) {
    lines.push(
      `ORGANIZER;CN=${escapeText(organizerName)}:MAILTO:${organizerEmail}`
    );
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join(CRLF);
}
