import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "text" | "band-primary" | "band-outline" | "on-accent";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-ink hover:text-paper",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  // For use on the navy brand band.
  "band-primary": "bg-accent text-accent-ink hover:bg-band-ink hover:text-band",
  "band-outline": "border border-band-ink/60 text-band-ink hover:bg-band-ink hover:text-band",
  // For use on the accent-blue CTA block.
  "on-accent": "bg-accent-ink text-accent hover:bg-band hover:text-band-ink",
  text: "px-0! h-auto! text-ink underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-ink",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-12 shrink-0 items-center gap-3 whitespace-nowrap px-6 text-[0.95rem] font-medium transition-colors duration-300 active:translate-y-px",
        styles[variant],
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        weight="bold"
        className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
