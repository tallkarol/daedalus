import Link from "next/link";
import { Calendar, ShoppingCart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    label: "Event Bundle",
    href: "/tools/relay?tool=event",
    icon: Calendar,
  },
  {
    label: "Woo Links",
    href: "/tools/relay?tool=woo",
    icon: ShoppingCart,
  },
  {
    label: "Tracking Links",
    href: "/tools/relay?tool=gtm",
    icon: BarChart3,
  },
];

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.href}
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link href={action.href}>
                <Icon className="h-3.5 w-3.5" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
