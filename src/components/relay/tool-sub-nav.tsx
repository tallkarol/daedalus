"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tools = [
  { value: "event", label: "Event Bundle" },
  { value: "woo", label: "WooCommerce Link Builder" },
  { value: "tracking", label: "GTM/UTM Link Builder" },
];

export function ToolSubNav({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="grid w-full grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-0">
        {tools.map((tool) => (
          <TabsTrigger key={tool.value} value={tool.value}>
            {tool.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
