"use client";

import { services, type ServiceId } from "@/lib/site";
import { ServiceIcon } from "./ServiceIcons";
import { Reveal } from "./Reveal";

/** Fired when a service card's "Add to quote" is clicked; QuoteForm listens. */
export function addServiceToQuote(id: ServiceId) {
  window.dispatchEvent(new CustomEvent<ServiceId>("cbp:add-service", { detail: id }));
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-12 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
                Every plumbing job,
                <br className="hidden sm:block" /> handled properly.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-chalk-dim">
              Tap a service to drop it straight into your WhatsApp quote below.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.07}>
              <article className="group relative flex h-full flex-col overflow-hidden panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aqua/50 hover:shadow-lift">
                {/* corner glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-aqua/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-line bg-ink text-aqua transition-colors duration-300 group-hover:border-aqua/50">
                    <ServiceIcon id={s.id} />
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-chalk-faint">
                    {s.short}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-chalk">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-chalk-dim">{s.blurb}</p>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[0.82rem] text-chalk-dim">
                      <span className="text-aqua">▹</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => addServiceToQuote(s.id)}
                  className="mt-6 inline-flex items-center gap-1.5 self-start font-mono text-[0.72rem] font-bold uppercase tracking-wider text-aqua transition-transform hover:translate-x-0.5"
                >
                  Add to quote
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
