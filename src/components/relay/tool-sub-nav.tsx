"use client";

import { Calendar, ShoppingCart, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tools = [
  { value: "event", label: "Event Bundle", icon: Calendar },
  { value: "woo", label: "WooCommerce", icon: ShoppingCart },
  { value: "tracking", label: "UTM Builder", icon: LinkIcon },
];

export function ToolSubNav({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <TabsTrigger
              key={tool.value}
              value={tool.value}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tool.label}</span>
              <span className="sm:hidden">{tool.label.split(" ")[0]}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
