import Link from "next/link";
import { Activity, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest generated content</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <Rocket className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold mb-2">No activity yet</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            Generate your first bundle in Relay to see your activity history
            here.
          </p>
          <Button asChild size="sm">
            <Link href="/tools/relay" className="gap-2">
              <Rocket className="h-4 w-4" />
              Generate in Relay
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
