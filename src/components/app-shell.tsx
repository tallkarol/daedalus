"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Hammer,
  Menu,
  Calendar,
  ShoppingCart,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const navSections = [
  {
    label: "Main",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/docs/overview", label: "Documentation", icon: BookOpen },
    ],
  },
  {
    label: "Tools",
    items: [
      {
        href: "/tools/relay",
        label: "Relay",
        icon: Zap,
        submenu: [
          { href: "/tools/relay", label: "Dashboard", icon: Zap },
          { href: "/tools/relay/event", label: "Event Bundle", icon: Calendar },
          { href: "/tools/relay/woo", label: "WooCommerce", icon: ShoppingCart },
          { href: "/tools/relay/tracking", label: "UTM Builder", icon: LinkIcon },
        ],
      },
      { href: "/tools/forge", label: "Forge", icon: Hammer },
    ],
  },
];

function NavLinks({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(() => {
    // Auto-expand relay menu if on relay pages
    if (pathname?.startsWith("/tools/relay")) {
      return ["/tools/relay"];
    }
    return [];
  });

  function toggleMenu(href: string) {
    setOpenMenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  }

  return (
    <nav className={cn("flex flex-col gap-4", isMobile && "mt-2")}>
      {navSections.map((section, index) => (
        <div key={section.label}>
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.label}
          </div>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              const hasSubmenu = !!item.submenu;
              const isOpen = openMenus.includes(item.href);
              const Icon = item.icon;

              if (hasSubmenu) {
                return (
                  <Collapsible
                    key={item.href}
                    open={isOpen}
                    onOpenChange={() => toggleMenu(item.href)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3",
                          isActive && "bg-secondary font-medium"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4 mt-1 space-y-1">
                      {item.submenu?.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        const SubIcon = subItem.icon;
                        return (
                          <Button
                            key={subItem.href}
                            asChild
                            variant={isSubActive ? "secondary" : "ghost"}
                            size="sm"
                            className={cn(
                              "w-full justify-start gap-3 pl-8",
                              isSubActive && "bg-secondary font-medium"
                            )}
                          >
                            <Link href={subItem.href}>
                              <SubIcon className="h-3.5 w-3.5" />
                              {subItem.label}
                            </Link>
                          </Button>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start gap-3",
                    isActive && "bg-secondary font-medium"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
          {index < navSections.length - 1 && (
            <Separator className="my-4" />
          )}
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden border-r border-border bg-card md:flex md:w-64 md:flex-col">
        <div className="flex h-14 items-center border-b border-border bg-card px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Daedalus</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>
        <div className="border-t border-border bg-card p-4">
          <ModeToggle />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header - Mobile */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-semibold">Daedalus</span>
                </Link>
              </div>
              <div className="p-4">
                <NavLinks isMobile />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="text-lg font-semibold">
            Daedalus
          </Link>
          <ModeToggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
