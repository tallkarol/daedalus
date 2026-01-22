"use client";

import { useEffect, useMemo, useState } from "react";

import { buildCalendarLinks } from "@/core/relay/eventLinks";
import { buildIcs } from "@/core/relay/ics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { OutputField } from "@/components/relay/output-field";
import { toast } from "@/components/ui/use-toast";
import { EndMode, EventHistoryPayload } from "@/components/relay/relay-types";

const timezones = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
];

export function EventTool({
  onSave,
  initialData,
}: {
  onSave: (label: string, payload: EventHistoryPayload) => void;
  initialData?: EventHistoryPayload | null;
}) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [start, setStart] = useState(initialData?.start ?? "");
  const [timezone, setTimezone] = useState(
    initialData?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [allDay, setAllDay] = useState(initialData?.allDay ?? false);
  const [endMode, setEndMode] = useState<EndMode>(
    initialData?.endMode ?? "default"
  );
  const [end, setEnd] = useState(initialData?.end ?? "");
  const [durationMinutes, setDurationMinutes] = useState(
    initialData?.durationMinutes ?? 60
  );
  const [url, setUrl] = useState(initialData?.url ?? "");
  const [organizerName, setOrganizerName] = useState(
    initialData?.organizerName ?? ""
  );
  const [organizerEmail, setOrganizerEmail] = useState(
    initialData?.organizerEmail ?? ""
  );
  const [outputs, setOutputs] = useState<{
    google: string;
    outlook: string;
    ics: string;
  } | null>(null);

  const canGenerate = title.trim().length > 0 && start.length > 0;

  const helperText = allDay
    ? "All-day events store DTEND as the day after the end date (exclusive)."
    : "";

  const parsedStart = useMemo(() => {
    if (!start) return null;
    return new Date(start);
  }, [start]);

  function computeEnd(): Date | null {
    if (!parsedStart) return null;
    if (endMode === "specific" && end) {
      return new Date(end);
    }
    if (endMode === "duration") {
      return new Date(parsedStart.getTime() + durationMinutes * 60 * 1000);
    }
    return new Date(parsedStart.getTime() + 60 * 60 * 1000);
  }

  function validate() {
    if (!parsedStart) {
      toast({ title: "Missing start time" });
      return false;
    }
    const computedEnd = computeEnd();
    if (!computedEnd) return true;
    if (endMode === "specific") {
      if (computedEnd <= parsedStart) {
        toast({
          title: "End time must be after start time",
        });
        return false;
      }
    }
    return true;
  }

  function handleGenerate() {
    if (!validate() || !parsedStart) return;
    const computedEnd = computeEnd() ?? new Date(parsedStart.getTime() + 3600000);

    const links = buildCalendarLinks({
      title,
      description,
      location,
      start: parsedStart,
      timezone,
      allDay,
      end: computedEnd,
      url,
      organizerName,
      organizerEmail,
    });

    const icsEnd = allDay
      ? new Date(computedEnd.getTime() + 24 * 60 * 60 * 1000)
      : computedEnd;

    const ics = buildIcs({
      title,
      description,
      location,
      start: parsedStart,
      end: icsEnd,
      allDay,
      url,
      organizerName,
      organizerEmail,
    });

    setOutputs({ google: links.google, outlook: links.outlook, ics });
    onSave(title, {
      title,
      description,
      location,
      start,
      timezone,
      allDay,
      endMode,
      end,
      durationMinutes,
      url,
      organizerName,
      organizerEmail,
    });
  }

  function handleCopyAll() {
    if (!outputs) return;
    const bundle = `Google: ${outputs.google}\nOutlook: ${outputs.outlook}`;
    navigator.clipboard.writeText(bundle);
    toast({ title: "Copied", description: "All links copied." });
  }

  function handleDownload() {
    if (!outputs) return;
    const blob = new Blob([outputs.ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "event.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (!initialData) return;
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Start *</label>
            <Input
              type={allDay ? "date" : "datetime-local"}
              value={start}
              onChange={(event) => setStart(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Timezone</label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={allDay} onCheckedChange={setAllDay} />
            <div className="text-sm">All-day event</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ends</label>
            <Select value={endMode} onValueChange={(value) => setEndMode(value as EndMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">No end (60 min)</SelectItem>
                <SelectItem value="specific">Specific end</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {endMode === "specific" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">End</label>
              <Input
                type={allDay ? "date" : "datetime-local"}
                value={end}
                onChange={(event) => setEnd(event.target.value)}
              />
            </div>
          )}
          {endMode === "duration" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input
                type="number"
                min={15}
                value={durationMinutes}
                onChange={(event) =>
                  setDurationMinutes(Number(event.target.value) || 0)
                }
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Event URL</label>
            <Input value={url} onChange={(event) => setUrl(event.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Organizer Name</label>
            <Input
              value={organizerName}
              onChange={(event) => setOrganizerName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Organizer Email</label>
            <Input
              value={organizerEmail}
              onChange={(event) => setOrganizerEmail(event.target.value)}
            />
          </div>
        </div>
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        <Button onClick={handleGenerate} disabled={!canGenerate}>
          Generate
        </Button>
      </Card>

      {outputs && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Outputs</h2>
            <Button variant="outline" onClick={handleCopyAll}>
              Copy all links
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <OutputField label="Google Calendar" value={outputs.google} />
            <OutputField label="Outlook Web" value={outputs.outlook} />
          </div>
          <Card className="space-y-3 p-4">
            <div className="text-sm font-semibold text-muted-foreground">ICS</div>
            <pre className="max-h-64 overflow-auto rounded-md bg-muted p-3 text-xs">
              {outputs.ics}
            </pre>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(outputs.ics)}>
                Copy ICS
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                Download for Apple Calendar (.ics)
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
