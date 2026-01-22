"use client";

import { useMemo, useState } from "react";

import { ToolSubNav } from "@/components/relay/tool-sub-nav";
import { EventTool } from "@/components/relay/event-tool";
import { WooTool } from "@/components/relay/woo-tool";
import { TrackingTool } from "@/components/relay/tracking-tool";
import { HistoryList, HistoryItem } from "@/components/relay/history-list";
import {
  EventHistoryPayload,
  TrackingHistoryPayload,
  WooHistoryPayload,
} from "@/components/relay/relay-types";

const STORAGE_KEY = "daedalus-relay-history";

type RelayHistory = {
  event: HistoryItem[];
  woo: HistoryItem[];
  tracking: HistoryItem[];
};

const defaultHistory: RelayHistory = {
  event: [],
  woo: [],
  tracking: [],
};

function getHistory(): RelayHistory {
  if (typeof window === "undefined") return defaultHistory;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultHistory;
  try {
    return JSON.parse(raw) as RelayHistory;
  } catch {
    return defaultHistory;
  }
}

function saveHistory(history: RelayHistory) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export default function RelayPage() {
  const [activeTool, setActiveTool] = useState("event");
  const [history, setHistory] = useState<RelayHistory>(() => getHistory());
  const [selectedPayload, setSelectedPayload] = useState<string | null>(null);

  const selectedData = useMemo(() => {
    if (!selectedPayload) return null;
    return JSON.parse(selectedPayload) as
      | EventHistoryPayload
      | WooHistoryPayload
      | TrackingHistoryPayload;
  }, [selectedPayload]);

  function handleSave<T>(tool: keyof RelayHistory, label: string, payload: T) {
    const next = { ...history };
    const items = next[tool] ?? [];
    const newItem: HistoryItem = {
      id: `${Date.now()}`,
      label,
      timestamp: new Date().toISOString(),
      payload: JSON.stringify(payload),
    };
    next[tool] = [newItem, ...items].slice(0, 10);
    setHistory(next);
    saveHistory(next);
  }

  function handleSelect(item: HistoryItem) {
    setSelectedPayload(item.payload);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Relay Toolbox</h1>
        <p className="text-muted-foreground">
          Generate event bundles, WooCommerce links, and UTM tracking URLs.
        </p>
      </div>
      <ToolSubNav value={activeTool} onValueChange={setActiveTool} />
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {activeTool === "event" && (
            <EventTool
              onSave={(label, payload) => handleSave("event", label, payload)}
              initialData={selectedData as EventHistoryPayload | null}
            />
          )}
          {activeTool === "woo" && (
            <WooTool
              onSave={(label, payload) => handleSave("woo", label, payload)}
              initialData={selectedData as WooHistoryPayload | null}
            />
          )}
          {activeTool === "tracking" && (
            <TrackingTool
              onSave={(label, payload) => handleSave("tracking", label, payload)}
              initialData={selectedData as TrackingHistoryPayload | null}
            />
          )}
        </div>
        <HistoryList
          items={history[activeTool as keyof RelayHistory] ?? []}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
