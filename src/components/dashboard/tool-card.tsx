import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  primaryButton: {
    label: string;
    href: string;
    disabled?: boolean;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
  badge?: string;
  variant?: "default" | "disabled";
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  primaryButton,
  secondaryButton,
  badge,
  variant = "default",
}: ToolCardProps) {
  const isDisabled = variant === "disabled" || primaryButton.disabled;

  return (
    <Card
      className={`h-full transition-all ${
        isDisabled
          ? "opacity-60"
          : "hover:shadow-lg hover:border-primary/50"
      }`}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 ${
              isDisabled
                ? "border-muted bg-muted"
                : "border-primary/20 bg-primary/10"
            }`}
          >
            <Icon
              className={`h-6 w-6 ${
                isDisabled ? "text-muted-foreground" : "text-primary"
              }`}
            />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          asChild={!isDisabled}
          disabled={isDisabled}
          className="w-full"
          size="lg"
        >
          {isDisabled ? (
            <span>{primaryButton.label}</span>
          ) : (
            <Link href={primaryButton.href}>{primaryButton.label}</Link>
          )}
        </Button>
        {secondaryButton && !isDisabled && (
          <Button asChild variant="ghost" className="w-full" size="sm">
            <Link href={secondaryButton.href}>{secondaryButton.label}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
