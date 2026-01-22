"use client";

import { Clock, History as HistoryIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type HistoryItem = {
  id: string;
  label: string;
  timestamp: string;
  payload: string;
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function HistoryList({
  items,
  onSelect,
}: {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">History</CardTitle>
          </div>
          <CardDescription>Your generated links will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <HistoryIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No history yet. Generate your first link to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HistoryIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">History</CardTitle>
        </div>
        <CardDescription>
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item, index) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-none px-4 py-3 h-auto hover:bg-muted/50"
                onClick={() => onSelect(item)}
              >
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm mb-1 line-clamp-1">
                    {item.label}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(item.timestamp)}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
