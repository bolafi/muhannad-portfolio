"use client";

import { useState } from "react";
import { Mail, Linkedin, MapPin, Send, Check } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Props = { dict: Dictionary["contact"] };

export function Contact({ dict }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          label={dict.label}
          title={dict.title}
          intro={dict.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="glass rounded-2xl p-7 md:p-8 space-y-5">
                <ContactItem
                  icon={<Mail size={16} />}
                  label={dict.labels.email}
                  value={dict.email}
                  href={`mailto:${dict.email}`}
                />
                <div className="hairline-gold h-px w-full" />
                <ContactItem
                  icon={<Linkedin size={16} />}
                  label={dict.labels.linkedin}
                  value={dict.linkedinDisplay}
                  href={dict.linkedin}
                  external
                />
                <div className="hairline-gold h-px w-full" />
                <ContactItem
                  icon={<MapPin size={16} />}
                  label={dict.labels.location}
                  value={dict.location}
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 glass rounded-2xl p-6">
                <p className="text-[10px] tracking-[0.26em] uppercase text-gold">
                  {dict.labels.office}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                  {dict.labels.officeBody}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
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

                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-fg-faint">{dict.form.disclaimer}</p>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-sm font-medium text-white bg-maroon hover:bg-maroon-strong border border-gold-soft transition-colors disabled:opacity-70 shrink-0"
                  >
                    {submitted ? (
                      <>
                        <Check size={16} /> {dict.form.sent}
                      </>
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
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-center gap-4">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-bg-elev border border-border-strong text-gold">
        {icon}
      </span>
      <div>
        <p className="text-[10px] tracking-[0.26em] uppercase text-fg-subtle">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-fg">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block group hover:text-fg"
      >
        {inner}
      </a>
    );
  }
  return inner;
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
      <span className="text-[10px] tracking-[0.26em] uppercase text-fg-subtle">
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
