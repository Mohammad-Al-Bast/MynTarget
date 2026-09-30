import { ArrowUp, ArrowUpRight, EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { Mark } from "@/components/logo";
import { nav, services, site } from "@/lib/content";

const linkClass = "w-fit text-band-ink/75 transition-colors hover:text-band-ink";

export function SiteFooter() {
  return (
    <footer className="bg-band text-band-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="MYN Target home" className="inline-flex items-center gap-3">
              <Mark className="w-10 [&_.mark-body]:bg-band-ink [&_.mark-dots]:bg-band-accent" />
              <span className="display text-2xl leading-none tracking-[-0.02em]">
                MYN <span className="text-band-accent">TARGET</span>
              </span>
            </Link>
            <p className="mt-6 max-w-[34ch] leading-relaxed text-band-ink/70">
              Creative marketing and media for brands with somewhere to go.
            </p>
            <p className="mt-6 text-sm text-band-ink/50">{site.regions.join("  /  ")}</p>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore" className="lg:col-span-2">
            <h2 id="footer-explore" className="text-sm font-medium text-band-ink/50">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="text-sm font-medium text-band-ink/50">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/studio" className={linkClass}>
                  The MYN studio
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-band-ink/50">Get in touch</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <EnvelopeSimple aria-hidden="true" className="size-4 text-band-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Phone aria-hidden="true" className="size-4 text-band-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <WhatsappLogo aria-hidden="true" className="size-4 text-band-accent" />
                  WhatsApp
                  <ArrowUpRight aria-hidden="true" weight="bold" className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-band-ink/15 py-6 text-sm text-band-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MYN Target. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-band-ink">
              Privacy policy
            </Link>
            <a href="#main" className="inline-flex items-center gap-1.5 transition-colors hover:text-band-ink">
              Back to top
              <ArrowUp aria-hidden="true" weight="bold" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
