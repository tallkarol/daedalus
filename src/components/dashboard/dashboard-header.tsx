import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  version?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function DashboardHeader({
  title,
  subtitle,
  version = "v0.1",
  ctaLabel = "Open Relay",
  ctaHref = "/tools/relay",
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Monolith • {version}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="lg" className="gap-2">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
