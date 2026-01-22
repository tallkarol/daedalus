import { Link as LinkIcon, BookOpen, Hammer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DashboardHeader,
  ToolCard,
  QuickActions,
  RecentActivity,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Strip */}
      <DashboardHeader
        title="Daedalus"
        subtitle="Tools for building link and navigation elements."
        version="v0.1"
        ctaLabel="Open Relay"
        ctaHref="/tools/relay"
      />

      <Separator />

      {/* Primary Tool Tiles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          title="Relay"
          description="Generate event bundles, Woo links, and tracking URLs."
          icon={LinkIcon}
          primaryButton={{
            label: "Open Relay",
            href: "/tools/relay",
          }}
          secondaryButton={{
            label: "Docs",
            href: "/docs/relay",
          }}
        />
        <ToolCard
          title="Docs"
          description="Conventions and usage notes for the suite."
          icon={BookOpen}
          primaryButton={{
            label: "Browse Docs",
            href: "/docs/overview",
          }}
        />
        <ToolCard
          title="Forge"
          description="Plan and ship integrations with comprehensive tooling."
          icon={Hammer}
          badge="Coming soon"
          variant="disabled"
          primaryButton={{
            label: "Coming soon",
            href: "/tools/forge",
            disabled: true,
          }}
        />
      </div>

      {/* Main Content Grid - 2 columns on desktop */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content area - left side */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
        </div>

        {/* Activity panel - right rail */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
