"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const [state, setState] = useState("idle"); // idle | submitting | success | error

  if (!endpoint) {
    return <p className="rounded-2xl bg-parchment p-4 text-ink/70">{t("notConfigured")}</p>;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setState("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad response");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const field = "rounded-xl border border-ink/15 bg-cream px-4 py-2 text-ink";

  return (
    <form data-testid="contact-form" onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-ink/70">
          {t("firstName")}
          <input name="firstName" type="text" className={field} />
        </label>
        <label className="flex flex-col gap-1 text-sm text-ink/70">
          {t("lastName")}
          <input name="lastName" type="text" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm text-ink/70">
        {t("email")}
        <input name="email" type="email" required className={field} />
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink/70">
        {t("message")}
        <textarea name="message" rows={5} className={field} />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="self-start rounded-full bg-coral px-7 py-3 font-medium text-cream transition hover:bg-coral-soft hover:text-ink disabled:opacity-60"
      >
        {t("submit")}
      </button>
      {state === "submitting" ? <p className="text-ink/70">{t("submitting")}</p> : null}
      {state === "success" ? <p className="text-teal">{t("success")}</p> : null}
      {state === "error" ? <p className="text-coral">{t("error")}</p> : null}
    </form>
  );
}
