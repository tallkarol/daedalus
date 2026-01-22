"use client";

import Link from "next/link";
import { Calendar, ShoppingCart, Link as LinkIcon, ArrowRight, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    id: "event",
    title: "Event Bundle",
    description: "Generate calendar links for Google Calendar, Outlook, and ICS files.",
    href: "/tools/relay/event",
    icon: Calendar,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-900",
  },
  {
    id: "woo",
    title: "WooCommerce",
    description: "Create add-to-cart links with products, coupons, and UTM tracking.",
    href: "/tools/relay/woo",
    icon: ShoppingCart,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-900",
  },
  {
    id: "tracking",
    title: "UTM Builder",
    description: "Build tracked URLs with UTM parameters and custom query strings.",
    href: "/tools/relay/tracking",
    icon: LinkIcon,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-900",
  },
];

export default function RelayDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Relay Toolbox</h1>
            <p className="text-lg text-muted-foreground">
              Generate event bundles, WooCommerce links, and UTM tracking URLs.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.id}
              className="group transition-all hover:shadow-lg hover:border-primary/50"
            >
              <CardHeader>
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${tool.bgColor} ${tool.borderColor} border`}
                >
                  <Icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="mt-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={tool.href} className="flex items-center gap-2">
                    Open Tool
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Choose a tool above to get started generating links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Available Tools</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Links Generated</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
