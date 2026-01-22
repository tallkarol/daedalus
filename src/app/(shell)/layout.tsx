import { PropsWithChildren } from "react";

import { AppShell } from "@/components/app-shell";

export default function ShellLayout({ children }: PropsWithChildren) {
  return <AppShell>{children}</AppShell>;
}
