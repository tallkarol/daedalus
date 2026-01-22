"use client";

import { useEffect, useState } from "react";
import {
  Link as LinkIcon,
  Target,
  Plus,
  X,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Code,
} from "lucide-react";

import { buildTrackingLink } from "@/core/relay/trackingLinks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { OutputField } from "@/components/relay/output-field";
import { TrackingHistoryPayload } from "@/components/relay/relay-types";

export function TrackingTool({
  onSave,
  initialData,
}: {
  onSave: (label: string, payload: TrackingHistoryPayload) => void;
  initialData?: TrackingHistoryPayload | null;
}) {
  const [destination, setDestination] = useState(
    initialData?.destination ?? ""
  );
  const [utmSource, setUtmSource] = useState(initialData?.utmSource ?? "");
  const [utmMedium, setUtmMedium] = useState(initialData?.utmMedium ?? "");
  const [utmCampaign, setUtmCampaign] = useState(
    initialData?.utmCampaign ?? ""
  );
  const [utmContent, setUtmContent] = useState(
    initialData?.utmContent ?? ""
  );
  const [utmTerm, setUtmTerm] = useState(initialData?.utmTerm ?? "");
  const [extra, setExtra] = useState(
    initialData?.extra ?? [{ key: "", value: "" }]
  );
  const [linkText, setLinkText] = useState(initialData?.linkText ?? "");
  const [output, setOutput] = useState<{ url: string; html: string } | null>(
    null
  );

  const canGenerate = destination.trim().length > 0;

  useEffect(() => {
    if (!initialData || !output) return;
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  function handleExtraChange(
    index: number,
    field: "key" | "value",
    value: string
  ) {
    setExtra((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addRow() {
    setExtra((prev) => [...prev, { key: "", value: "" }]);
  }

  function handleGenerate() {
    const result = buildTrackingLink({
      destination,
      utm: {
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        content: utmContent,
        term: utmTerm,
      },
      extra,
      linkText,
    });
    setOutput(result);
    onSave(destination, {
      destination,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      extra,
      linkText,
    });
  }

  function handleReset() {
    setDestination("");
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
    setUtmContent("");
    setUtmTerm("");
    setExtra([{ key: "", value: "" }]);
    setLinkText("");
    setOutput(null);
  }

  function removeRow(index: number) {
    if (extra.length > 1) {
      setExtra((prev) => prev.filter((_, idx) => idx !== index));
    }
  }

  return (
    <div className="space-y-6">
      {/* Destination URL */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950/20">
              <LinkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Destination URL</CardTitle>
              <CardDescription>The URL you want to track</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              URL <span className="text-destructive">*</span>
            </label>
            <Input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="https://example.com/page"
              className="h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* UTM Parameters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-950/20">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>UTM Parameters</CardTitle>
              <CardDescription>Standard Google Analytics tracking parameters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                UTM Source
              </label>
              <Input
                placeholder="newsletter"
                value={utmSource}
                onChange={(event) => setUtmSource(event.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                UTM Medium
              </label>
              <Input
                placeholder="email"
                value={utmMedium}
                onChange={(event) => setUtmMedium(event.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                UTM Campaign
              </label>
              <Input
                placeholder="summer-sale"
                value={utmCampaign}
                onChange={(event) => setUtmCampaign(event.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                UTM Content
              </label>
              <Input
                placeholder="button-click"
                value={utmContent}
                onChange={(event) => setUtmContent(event.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                UTM Term
              </label>
              <Input
                placeholder="keyword"
                value={utmTerm}
                onChange={(event) => setUtmTerm(event.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Parameters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-950/20">
              <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Additional Parameters</CardTitle>
              <CardDescription>Custom query parameters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {extra.map((row, index) => (
              <div
                key={`${row.key}-${index}`}
                className="flex gap-3 rounded-lg border p-4"
              >
                <div className="flex-1 grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Key
                    </label>
                    <Input
                      placeholder="param_name"
                      value={row.key}
                      onChange={(event) =>
                        handleExtraChange(index, "key", event.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Value
                    </label>
                    <Input
                      placeholder="param_value"
                      value={row.value}
                      onChange={(event) =>
                        handleExtraChange(index, "value", event.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>
                {extra.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={addRow} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Parameter
          </Button>
        </CardContent>
      </Card>

      {/* Link Text */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-950/20">
              <Code className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle>HTML Output</CardTitle>
              <CardDescription>Optional link text for HTML generation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Code className="h-4 w-4 text-muted-foreground" />
              Link Text
            </label>
            <Input
              value={linkText}
              onChange={(event) => setLinkText(event.target.value)}
              placeholder="Click here"
              className="h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={!canGenerate}
          size="lg"
          className="min-w-[140px]"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Link
        </Button>
      </div>

      {/* Outputs Section */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-semibold">Generated Link</h2>
          </div>
          <div className="space-y-3">
            <OutputField label="Tracked URL" value={output.url} />
            {output.html && <OutputField label="HTML Code" value={output.html} />}
          </div>
        </div>
      )}
    </div>
  );
}
