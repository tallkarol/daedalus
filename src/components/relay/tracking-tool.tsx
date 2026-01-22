"use client";

import { useEffect, useState } from "react";

import { buildTrackingLink } from "@/core/relay/trackingLinks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Destination URL *</label>
          <Input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="UTM Source"
            value={utmSource}
            onChange={(event) => setUtmSource(event.target.value)}
          />
          <Input
            placeholder="UTM Medium"
            value={utmMedium}
            onChange={(event) => setUtmMedium(event.target.value)}
          />
          <Input
            placeholder="UTM Campaign"
            value={utmCampaign}
            onChange={(event) => setUtmCampaign(event.target.value)}
          />
          <Input
            placeholder="UTM Content"
            value={utmContent}
            onChange={(event) => setUtmContent(event.target.value)}
          />
          <Input
            placeholder="UTM Term"
            value={utmTerm}
            onChange={(event) => setUtmTerm(event.target.value)}
          />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium">Additional query params</div>
          {extra.map((row, index) => (
            <div key={`${row.key}-${index}`} className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Key"
                value={row.key}
                onChange={(event) =>
                  handleExtraChange(index, "key", event.target.value)
                }
              />
              <Input
                placeholder="Value"
                value={row.value}
                onChange={(event) =>
                  handleExtraChange(index, "value", event.target.value)
                }
              />
            </div>
          ))}
          <Button variant="outline" onClick={addRow}>
            Add param
          </Button>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Link text</label>
          <Input
            value={linkText}
            onChange={(event) => setLinkText(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleGenerate} disabled={!canGenerate}>
            Generate
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Card>
      {output && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Outputs</h2>
          <OutputField label="Tracked URL" value={output.url} />
          {output.html && <OutputField label="HTML" value={output.html} />}
        </div>
      )}
    </div>
  );
}
