import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Providers>
        <SiteHeader />
        <main id="main" className="flex-1 pt-[85px]">
          {children}
        </main>
        <SiteFooter />
      </Providers>
    </div>
  );
}
