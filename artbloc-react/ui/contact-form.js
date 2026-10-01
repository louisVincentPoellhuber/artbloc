"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const [state, setState] = useState("idle"); // idle | submitting | success | error

  if (!accessKey) {
    return <p className="rounded-2xl bg-parchment p-4 text-ink/70">{t("notConfigured")}</p>;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: bots tick the hidden field — silently drop them as "success".
    if (formData.get("botcheck")) {
      form.reset();
      setState("success");
      return;
    }

    const payload = Object.fromEntries(formData.entries());
    payload.access_key = accessKey;
    payload.subject = t("emailSubject"); // localized to the visitor's language
    payload.replyto = payload.email; // hitting "reply" reaches the sender
    payload.language = locale; // tag the email with FR/EN

    setState("submitting");
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error("submit failed");
      form.reset(); // success path only — values are kept on error
      setState("success");
    } catch {
      setState("error");
    }
  }

  const field =
    "min-h-11 rounded-xl border border-ink/15 bg-cream px-4 py-2 text-ink focus:border-coral focus:outline-none";

  return (
    <form data-testid="contact-form" onSubmit={onSubmit} className="flex flex-col gap-4" aria-busy={state === "submitting"}>
      {/* anti-spam honeypot (hidden from users + assistive tech) */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-ink/70">
          {t("firstName")}
          <input name="firstName" type="text" autoComplete="given-name" className={field} />
        </label>
        <label className="flex flex-col gap-1 text-sm text-ink/70">
          {t("lastName")}
          <input name="lastName" type="text" autoComplete="family-name" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-ink/70">
        {t("email")}
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink/70">
        {t("message")}
        <textarea name="message" rows={5} required className={field} />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="self-start rounded-full bg-coral px-7 py-3 font-medium text-cream transition hover:bg-coral-soft hover:text-ink disabled:opacity-60"
      >
        {state === "submitting" ? t("submitting") : t("submit")}
      </button>
      <p aria-live="polite" className="min-h-5 text-sm">
        {state === "success" ? <span className="text-teal">{t("success")}</span> : null}
        {state === "error" ? <span className="text-coral">{t("error")}</span> : null}
      </p>
    </form>
  );
}
