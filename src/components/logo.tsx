import Link from "next/link";

import { cn } from "@/lib/cn";

/** The MYN symbol, drawn from the real logo as two masked layers so it recolours per theme. */
export function Mark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-block aspect-[146/151]", className)}>
      <span className="relative block size-full">
        <span className="mark-layer mark-body" />
        <span className="mark-layer mark-dots" />
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="MYN Target home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Mark className="w-8 transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
      <span className="display text-[1.15rem] leading-none tracking-[-0.02em]">
        MYN <span className="text-accent-text">TARGET</span>
      </span>
    </Link>
  );
}
