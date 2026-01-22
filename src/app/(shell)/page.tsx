import Link from "next/link";
import {
  Zap,
  BookOpen,
  Hammer,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Rocket,
  Activity,
  Clock,
  BarChart3,
  Layers,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "Relay",
    description: "Generate event bundles, WooCommerce links, and UTM tracking URLs.",
    href: "/tools/relay",
    icon: Zap,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500",
    hoverBg: "hover:bg-blue-600",
  },
  {
    title: "Documentation",
    description: "Read conventions, tool references, and best practices.",
    href: "/docs/overview",
    icon: BookOpen,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500",
    hoverBg: "hover:bg-purple-600",
  },
  {
    title: "Forge",
    description: "Plan and ship integrations with comprehensive tooling.",
    href: "/tools/forge",
    icon: Hammer,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500",
    hoverBg: "hover:bg-orange-600",
  },
];

const stats = [
  {
    label: "Tools Available",
    value: "3",
    trend: "+1 this month",
    icon: Sparkles,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    label: "Links Generated",
    value: "0",
    trend: "Get started",
    icon: Rocket,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    label: "Active Projects",
    value: "1",
    trend: "In progress",
    icon: Activity,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Clean Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back. Jump into the latest tools and documentation.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid - Clean Design */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-2 border-border hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`rounded-lg ${stat.bgColor} p-2`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Access - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Quick Access
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.href}
                    className="group border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-background border-2 border-border group-hover:border-primary/50 transition-colors">
                        <Icon className={`h-6 w-6 ${item.color} transition-transform group-hover:scale-110`} />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                      >
                        <Link href={item.href} className="flex items-center gap-2">
                          Open {item.title}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="border-2 border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest tool usage and generated links
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Start using the tools to see your activity history here.
                </p>
                <Button asChild>
                  <Link href="/tools/relay" className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="border-2 border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle>Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Tools</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Links Generated</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Projects</span>
                  <span className="font-semibold">1</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/docs/overview" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border bg-muted/30">
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Use Relay to generate calendar links and tracking URLs
                </p>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Check the docs for best practices and conventions
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Hammer className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Use Forge to plan and ship integrations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
