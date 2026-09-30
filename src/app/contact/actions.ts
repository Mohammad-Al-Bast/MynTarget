"use server";

import { serviceOptions, site } from "@/lib/content";

export type Field = "name" | "email" | "phone" | "region" | "service" | "message";

export type EnquiryState = {
  status: "idle" | "invalid" | "sent" | "draft" | "error";
  errors?: Partial<Record<Field, string>>;
  values?: Record<string, string>;
  mailto?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the enquiry. If CONTACT_WEBHOOK_URL is configured (Formspree, Make, Zapier,
 * a CRM inbox...), the enquiry is posted there. Otherwise the visitor gets a prepared
 * email draft, so no lead is lost while a backend is not yet connected.
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    region: get("region"),
    service: get("service"),
    message: get("message"),
  };

  // Honeypot: bots fill every field.
  if (get("website")) return { status: "sent" };

  const errors: EnquiryState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a phone number we can reach.";
  if (!values.region) errors.region = "Which country or region are you in?";
  if (!serviceOptions.includes(values.service)) errors.service = "Choose the service you're interested in.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project helps us prepare.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, source: "myntarget.com" }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return { status: "sent" };
    } catch (err) {
      console.error("Enquiry webhook failed", err);
      return { status: "error", values, mailto: buildMailto(values) };
    }
  }

  return { status: "draft", values, mailto: buildMailto(values) };
}

function buildMailto(v: Record<string, string>) {
  const body = [
    `Name: ${v.name}`,
    `Company: ${v.company || "-"}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Region: ${v.region}`,
    `Service: ${v.service}`,
    "",
    v.message,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${v.service}`)}&body=${encodeURIComponent(body)}`;
}
