import Link from "next/link";
import { PropsWithChildren } from "react";
import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navSections = [
  {
    label: "Dashboard",
    items: [
      { href: "/", label: "Overview" },
      { href: "/docs/overview", label: "Docs" },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/tools/relay", label: "Relay" },
      { href: "/tools/forge", label: "Forge" },
    ],
  },
];

function NavLinks() {
  return (
    <nav className="flex flex-col gap-4">
      {navSections.map((section, index) => (
        <div key={section.label}>
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            {section.label}
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {section.items.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className="justify-start"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
          {index < navSections.length - 1 && (
            <Separator className="my-3" />
          )}
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 flex flex-col gap-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="text-lg font-semibold">
              Daedalus
            </Link>
          </div>
          <ModeToggle />
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="rounded-lg border bg-background p-4">
            <NavLinks />
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
