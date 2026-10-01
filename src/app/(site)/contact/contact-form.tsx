"use client";

import { ArrowUpRight, Check, EnvelopeSimple, WarningCircle, WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useActionState } from "react";

import { sendEnquiry, type EnquiryState, type Field } from "./actions";
import { cn } from "@/lib/cn";
import { serviceOptions, site } from "@/lib/content";

const initial: EnquiryState = { status: "idle" };

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(sendEnquiry, initial);

  if (state.status === "sent") {
    return (
      <div role="status" className="border border-line bg-paper-2 p-10">
        <span className="diamond grid size-14 place-items-center bg-accent text-accent-ink">
          <Check weight="bold" className="size-6" aria-hidden="true" />
        </span>
        <h2 className="display mt-8 text-4xl">Thank you. We&apos;ve got it.</h2>
        <p className="mt-4 max-w-[44ch] text-lg text-muted">
          Our team will review your enquiry and get back to you shortly.
        </p>
      </div>
    );
  }

  if ((state.status === "draft" || state.status === "error") && state.mailto) {
    return (
      <div role="status" className="border border-line bg-paper-2 p-10">
        {state.status === "error" && (
          <p className="mb-6 flex items-center gap-2 text-accent-text">
            <WarningCircle aria-hidden="true" className="size-5" /> We couldn&apos;t send that automatically.
          </p>
        )}
        <h2 className="display text-4xl">Your enquiry is ready.</h2>
        <p className="mt-4 max-w-[46ch] text-lg text-muted">
          Send it from your email app, or message us on WhatsApp. Either way, it reaches our team directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={state.mailto} className="inline-flex h-12 items-center gap-3 bg-accent px-6 font-medium text-accent-ink transition-colors hover:bg-ink hover:text-paper">
            <EnvelopeSimple aria-hidden="true" weight="bold" className="size-4" /> Open email draft
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-3 border border-ink/80 px-6 font-medium transition-colors hover:bg-ink hover:text-paper">
            <WhatsappLogo aria-hidden="true" weight="bold" className="size-4" /> WhatsApp
          </a>
        </div>
        <p className="mt-6 text-sm text-muted">
          Or email us directly at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <Input name="name" label="Full name" autoComplete="name" required defaultValue={v.name} error={err.name} />
      <Input name="company" label="Company or brand" autoComplete="organization" defaultValue={v.company} />
      <Input name="email" label="Email" type="email" autoComplete="email" required defaultValue={v.email} error={err.email} />
      <Input name="phone" label="Phone" type="tel" autoComplete="tel" required defaultValue={v.phone} error={err.phone} />
      <Input name="region" label="Country or region" autoComplete="country-name" required defaultValue={v.region} error={err.region} />

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="text-sm font-medium">
          Interested in <span aria-hidden="true" className="text-accent-text">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={v.service ?? (defaultService && serviceOptions.includes(defaultService) ? defaultService : "")}
          aria-invalid={!!err.service}
          aria-describedby={err.service ? "service-error" : undefined}
          className={fieldClass(!!err.service)}
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ErrorText id="service-error" message={err.service} />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">
          Tell us about your project <span aria-hidden="true" className="text-accent-text">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={v.message}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={cn(fieldClass(!!err.message), "h-auto py-3")}
        />
        <ErrorText id="message-error" message={err.message} />
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          We only use your details to reply. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-3 bg-accent px-7 font-medium text-accent-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send enquiry"}
          <ArrowUpRight aria-hidden="true" weight="bold" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

function fieldClass(invalid: boolean) {
  return cn(
    "h-12 w-full border bg-paper px-4 text-ink outline-none transition-colors focus:border-accent focus-visible:outline-2 focus-visible:outline-accent",
    invalid ? "border-danger" : "border-ink/30",
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-danger">
      {message}
    </p>
  );
}

function Input({
  name,
  label,
  error,
  required,
  ...rest
}: {
  name: Field | "company";
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span aria-hidden="true" className="text-accent-text">*</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(!!error)}
        {...rest}
      />
      <ErrorText id={`${name}-error`} message={error} />
    </div>
  );
}
