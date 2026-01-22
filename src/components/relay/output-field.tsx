"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export function OutputField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    toast({ title: "Copied", description: `${label} copied to clipboard.` });
  }

  return (
    <Card className="flex flex-col gap-2 p-4">
      <div className="text-sm font-semibold text-muted-foreground">{label}</div>
      <div className="break-all rounded-md bg-muted p-2 text-sm font-mono">
        {value}
      </div>
      <Button variant="outline" size="sm" onClick={handleCopy}>
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
    </Card>
  );
}
