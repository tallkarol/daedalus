"use client";

import Link from "next/link";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";

import { TrackingTool } from "@/components/relay/tracking-tool";
import { Button } from "@/components/ui/button";

export default function TrackingToolPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Button variant="ghost" asChild className="mb-2">
          <Link href="/tools/relay" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Relay Dashboard
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-100 p-2 dark:bg-green-950/20">
            <LinkIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">UTM Link Builder</h1>
            <p className="text-lg text-muted-foreground">
              Build tracked URLs with UTM parameters and custom query strings.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl">
        <TrackingTool
          onSave={() => {}}
          initialData={null}
        />
      </div>
    </div>
  );
}
