import Image from "next/image";

import { cn } from "@/lib/cn";
import { clients, type Service } from "@/lib/content";

/** The visual for a service: a photo, the client identities we've touched, or typography. */
export function ServiceVisual({
  service,
  className,
  priority,
}: {
  service: Service;
  className?: string;
  priority?: boolean;
}) {
  const v = service.visual;
  return (
    <div className={cn("relative overflow-hidden bg-paper-2", className)}>
      {v.kind === "image" && (
        <Image
          src={v.image.src}
          alt={v.image.alt}
          fill
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-cover"
        />
      )}
      {v.kind === "logos" && (
        // Identities arranged on the diamond's axes so they read inside the diamond crop too.
        <div className="absolute inset-0 bg-black">
          {clients.slice(0, 4).map((c, i) => (
            <div
              key={c.alt}
              className="absolute size-[30%] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${[50, 26, 74, 50][i]}%`, top: `${[26, 50, 50, 74][i]}%` }}
            >
              <Image src={c.src} alt={c.alt} fill className="object-contain" sizes="160px" />
            </div>
          ))}
        </div>
      )}
      {v.kind === "type" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent text-center text-accent-ink">
          {v.words.map((w) => (
            <span key={w} className="display text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.05]">
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
