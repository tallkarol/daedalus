"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  MapPin,
  FileText,
  Clock,
  Globe,
  Link as LinkIcon,
  User,
  Mail,
  Sparkles,
  Download,
  Copy,
  CheckCircle2,
} from "lucide-react";

import { buildCalendarLinks } from "@/core/relay/eventLinks";
import { buildIcs } from "@/core/relay/ics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
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
      {/* Basic Information Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950/20">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Basic information about your event</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Event Title <span className="text-destructive">*</span>
              </label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g., Team Meeting"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location
              </label>
              <Input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g., Conference Room A"
                className="h-10"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Description
              </label>
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add event description..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date & Time Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950/20">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>Date & Time</CardTitle>
              <CardDescription>When does your event occur?</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Start Time <span className="text-destructive">*</span>
              </label>
              <Input
                type={allDay ? "date" : "datetime-local"}
                value={start}
                onChange={(event) => setStart(event.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Timezone
              </label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="h-10">
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
            <div className="flex items-center gap-3 rounded-lg border p-3 md:col-span-2">
              <Switch checked={allDay} onCheckedChange={setAllDay} />
              <div>
                <div className="text-sm font-medium">All-day event</div>
                <div className="text-xs text-muted-foreground">
                  Event spans the entire day
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                End Mode
              </label>
              <Select
                value={endMode}
                onValueChange={(value) => setEndMode(value as EndMode)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default (60 min)</SelectItem>
                  <SelectItem value="specific">Specific end time</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {endMode === "specific" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  End Time
                </label>
                <Input
                  type={allDay ? "date" : "datetime-local"}
                  value={end}
                  onChange={(event) => setEnd(event.target.value)}
                  className="h-10"
                />
              </div>
            )}
            {endMode === "duration" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  min={15}
                  value={durationMinutes}
                  onChange={(event) =>
                    setDurationMinutes(Number(event.target.value) || 0)
                  }
                  className="h-10"
                />
              </div>
            )}
          </div>
          {helperText && (
            <div className="rounded-md bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">{helperText}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Information Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-950/20">
              <LinkIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Links and organizer details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                Event URL
              </label>
              <Input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com/event"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-muted-foreground" />
                Organizer Name
              </label>
              <Input
                value={organizerName}
                onChange={(event) => setOrganizerName(event.target.value)}
                placeholder="John Doe"
                className="h-10"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Organizer Email
              </label>
              <Input
                type="email"
                value={organizerEmail}
                onChange={(event) => setOrganizerEmail(event.target.value)}
                placeholder="organizer@example.com"
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex items-center justify-end gap-3">
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          size="lg"
          className="min-w-[140px]"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Links
        </Button>
      </div>

      {/* Outputs Section */}
      {outputs && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-semibold">Generated Links</h2>
            </div>
            <Button variant="outline" onClick={handleCopyAll}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <OutputField label="Google Calendar" value={outputs.google} />
            <OutputField label="Outlook Web" value={outputs.outlook} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                ICS File
              </CardTitle>
              <CardDescription>
                Download for Apple Calendar, Outlook, or other calendar apps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border bg-muted/30 p-4">
                <pre className="max-h-64 overflow-auto text-xs leading-relaxed">
                  {outputs.ics}
                </pre>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(outputs.ics)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy ICS
                </Button>
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download .ics File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
