"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["contact"] };

type Status = "idle" | "sending" | "sent" | "error";

export function Contact({ dict }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4500);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          intro={dict.intro}
        />

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass-strong rounded-2xl p-7 md:p-8 space-y-5"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label={dict.form.name} name="name" required />
                  <Field
                    label={dict.form.emailField}
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <Field label={dict.form.subject} name="subject" />
                <Field label={dict.form.message} name="message" required textarea />

                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-fg-faint">
                    {status === "error" ? (
                      <span className="text-maroon">{dict.form.error}</span>
                    ) : (
                      dict.form.disclaimer
                    )}
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-sm font-medium text-white bg-maroon hover:bg-maroon-strong border border-gold-soft transition-colors disabled:opacity-70 shrink-0"
                  >
                    {status === "sent" ? (
                      <>
                        <Check size={16} /> {dict.form.sent}
                      </>
                    ) : status === "sending" ? (
                      dict.form.sending
                    ) : (
                      <>
                        {dict.form.submit} <Send size={14} className="flip-rtl" />
                      </>
                    )}
                  </button>
                </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full rounded-md bg-bg-input border border-border text-fg placeholder-fg-faint px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold-soft transition";

  return (
    <label className="block">
      <span className="text-xs md:text-sm tracking-[0.18em] uppercase text-fg-subtle">
        {label}{" "}
        {required ? <span className="text-gold">*</span> : null}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`${baseClass} mt-2 resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={`${baseClass} mt-2`}
        />
      )}
    </label>
  );
}
