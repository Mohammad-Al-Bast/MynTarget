import { SiteShell } from "@/components/site-shell";

import "../globals.css";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
