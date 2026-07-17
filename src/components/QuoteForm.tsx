"use client";

import { useEffect, useState } from "react";
import { services, propertyTypes, site, type ServiceId, type PropertyType } from "@/lib/site";
import { Reveal } from "./Reveal";

const valueProps = [
  "No obligation, no call-out fee to enquire",
  "Homes, businesses & estates welcome",
  site.hours.label,
];

export function QuoteForm() {
  const [picked, setPicked] = useState<Set<ServiceId>>(new Set());
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [property, setProperty] = useState<PropertyType>("Home");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ services?: string; name?: string; area?: string }>({});
  const [flash, setFlash] = useState<ServiceId | null>(null);

  // Let the Services section drop a service in here.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<ServiceId>).detail;
      setPicked((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setFlash(id);
      window.setTimeout(() => setFlash((f) => (f === id ? null : f)), 900);
    };
    window.addEventListener("cbp:add-service", handler);
    return () => window.removeEventListener("cbp:add-service", handler);
  }, []);

  function toggle(id: ServiceId) {
    const wasOn = picked.has(id);
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    // Clear a service's follow-up answer when it's deselected.
    if (wasOn) {
      setDetails((d) => {
        const nd = { ...d };
        delete nd[id];
        return nd;
      });
    }
  }

  function buildMessage() {
    const chosen = services.filter((s) => picked.has(s.id));
    const lines = [
      `Hi ${site.shortName} 💧`,
      "",
      "I'd like a quote for:",
      ...chosen.map((s) => {
        const d = details[s.id]?.trim();
        return d ? `• ${s.title}: ${d}` : `• ${s.title}`;
      }),
      "",
      `Name: ${name.trim()}`,
      `Area: ${area.trim()}`,
      `Property: ${property}`,
    ];
    if (notes.trim()) lines.push(`Details: ${notes.trim()}`);
    lines.push("", "Sent from your website");
    return lines.join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (picked.size === 0) next.services = "Pick at least one service.";
    if (!name.trim()) next.name = "Please add your name.";
    if (!area.trim()) next.area = "Which area are you in?";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="quote" className="relative scroll-mt-20 py-12 sm:py-20">
      {/* soft glow anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent"
      />
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Left: pitch */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="eyebrow">Free quote</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-chalk sm:text-5xl">
                Get your quote on{" "}
                <span className="text-aqua">WhatsApp</span>
              </h2>
              <p className="mt-5 max-w-md text-chalk-dim">
                Choose what you need and we&apos;ll build a WhatsApp message for you. Hit send
                and the Clear Blue team replies with a quote, quick and easy.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {valueProps.map((v) => (
                  <li key={v} className="flex items-center gap-3 text-sm text-chalk">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="panel p-6 shadow-lift sm:p-8">
              {/* Step 1 */}
              <fieldset>
                <legend className="flex items-center gap-2.5 font-display text-base font-bold text-chalk">
                  <Step n={1} /> Which services do you need?
                </legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {services.map((s) => {
                    const on = picked.has(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          on
                            ? "border-aqua bg-aqua text-white"
                            : "border-ink-line bg-ink text-chalk-dim hover:border-aqua/50 hover:text-chalk"
                        } ${flash === s.id ? "animate-pulse-ring" : ""}`}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>
                {errors.services && <ErrorText>{errors.services}</ErrorText>}

                {/* Follow-up questions for services that need a bit more detail */}
                {services.some((s) => picked.has(s.id) && s.ask) && (
                  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-ink-line bg-ink/40 p-4">
                    {services
                      .filter((s) => picked.has(s.id) && s.ask)
                      .map((s) => (
                        <label key={s.id} className="block">
                          <span className="mb-1.5 block text-[0.82rem] font-medium text-chalk-dim">
                            <span className="text-aqua">{s.title}:</span> {s.ask!.label}
                          </span>
                          <input
                            type="text"
                            value={details[s.id] ?? ""}
                            onChange={(e) =>
                              setDetails((d) => ({ ...d, [s.id]: e.target.value }))
                            }
                            placeholder={s.ask!.placeholder}
                            className={inputCls(false)}
                          />
                        </label>
                      ))}
                  </div>
                )}
              </fieldset>

              <div className="my-7 rule-aqua" />

              {/* Step 2 */}
              <fieldset>
                <legend className="flex items-center gap-2.5 font-display text-base font-bold text-chalk">
                  <Step n={2} /> Your details
                </legend>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" error={errors.name}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John"
                      autoComplete="name"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Area / Suburb" error={errors.area}>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Florida Park"
                      className={inputCls(!!errors.area)}
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Property type">
                    <div className="relative">
                      <select
                        value={property}
                        onChange={(e) => setProperty(e.target.value as PropertyType)}
                        className={`${inputCls(false)} appearance-none pr-10`}
                      >
                        {propertyTypes.map((p) => (
                          <option key={p} value={p} className="bg-ink text-chalk">
                            {p}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-chalk-faint"
                        width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Anything else?" optional>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="e.g. water is leaking through the ceiling, best time to visit, access is around the back…"
                      className={`${inputCls(false)} resize-none`}
                    />
                  </Field>
                </div>

              </fieldset>

              <button type="submit" className="btn-aqua mt-7 w-full !py-4 text-base">
                <WhatsAppIcon /> Send my request on WhatsApp
              </button>
              <p className="mt-3 text-center text-xs text-chalk-faint">
                Opens WhatsApp with your details ready to send. WhatsApp only ·{" "}
                <span className="font-mono">{site.phoneDisplay}</span>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg border bg-ink px-4 py-3 text-[0.95rem] text-chalk placeholder:text-chalk-faint outline-none transition-colors ${
    hasError ? "border-red-400/70" : "border-ink-line focus:border-aqua"
  }`;
}

function Field({
  label,
  children,
  error,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[0.82rem] font-medium text-chalk-dim">
        {label}
        {optional && <span className="text-chalk-faint">(optional)</span>}
      </span>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <span className="mt-1.5 block text-xs font-medium text-red-400">{children}</span>;
}

function Step({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aqua font-mono text-xs font-bold text-white">
      {n}
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
