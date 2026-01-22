import { PropsWithChildren } from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const docsLinks = [
  { href: "/docs/overview", label: "Overview" },
  { href: "/docs/relay", label: "Relay" },
  { href: "/docs/forge", label: "Forge" },
  { href: "/docs/conventions", label: "Conventions" },
];

export default function DocsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="w-full shrink-0 md:w-52">
        <div className="rounded-lg border bg-background p-4">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Documentation
          </div>
          <Separator className="my-3" />
          <nav className="flex flex-col gap-2 text-sm">
            {docsLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <article className="prose max-w-none dark:prose-invert">
          {children}
        </article>
        <div className="mt-6 text-sm text-muted-foreground">
          <Link href="#" className="underline">
            Edit this page
          </Link>
        </div>
      </div>
    </div>
  );
}
