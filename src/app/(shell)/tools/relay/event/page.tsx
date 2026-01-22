"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

import { EventTool } from "@/components/relay/event-tool";
import { Button } from "@/components/ui/button";

export default function EventToolPage() {
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
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-950/20">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Event Bundle Generator</h1>
            <p className="text-lg text-muted-foreground">
              Create calendar links for Google Calendar, Outlook, and ICS files.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl">
        <EventTool
          onSave={() => {}}
          initialData={null}
        />
      </div>
    </div>
  );
}
