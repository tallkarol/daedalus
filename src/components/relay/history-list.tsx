"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type HistoryItem = {
  id: string;
  label: string;
  timestamp: string;
  payload: string;
};

export function HistoryList({
  items,
  onSelect,
}: {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}) {
  if (items.length === 0) {
    return (
      <Card className="p-4 text-sm text-muted-foreground">
        No generated history yet.
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="text-sm font-semibold text-muted-foreground">
        History
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="justify-between"
            onClick={() => onSelect(item)}
          >
            <span className="text-left text-sm">{item.label}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(item.timestamp).toLocaleString()}
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
