"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Zap,
  Hammer,
  FileText,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const docsLinks = [
  {
    href: "/docs/overview",
    label: "Overview",
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    href: "/docs/relay",
    label: "Relay",
    icon: Zap,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    href: "/docs/forge",
    label: "Forge",
    icon: Hammer,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    href: "/docs/conventions",
    label: "Conventions",
    icon: FileText,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
  },
];

export default function DocsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="w-full shrink-0 md:w-64">
        <div className="sticky top-6 rounded-xl border-2 border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Documentation
            </div>
          </div>
          <Separator className="my-4" />
          <nav className="flex flex-col gap-2">
            {docsLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Button
                  key={link.href}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start gap-3 h-auto py-2.5",
                    isActive && "bg-secondary font-medium border border-border"
                  )}
                >
                  <Link href={link.href} className="flex items-center gap-3 w-full">
                    <div
                      className={cn(
                        "rounded-md p-1.5",
                        link.bgColor,
                        isActive && "ring-2 ring-primary/20"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", link.color)} />
                    </div>
                    <span>{link.label}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="rounded-xl border-2 border-border bg-card p-8 shadow-sm">
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
            {children}
          </article>
          <div className="mt-8 flex items-center justify-between rounded-lg border-2 border-dashed border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-4">
            <div className="text-sm text-muted-foreground">
              Found an issue? Help us improve the docs.
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="#" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Edit Page
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
