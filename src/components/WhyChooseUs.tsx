import { Reveal } from "./Reveal";
import { whyChooseUs, site } from "@/lib/site";

export function WhyChooseUs() {
  return (
    <section id="why" className="relative scroll-mt-20 py-12 sm:py-20">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          {/* Left: pitch */}
          <div>
            <Reveal>
              <p className="eyebrow">Why choose us</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
                Work you can{" "}
                <span className="text-aqua">trust</span>, done right the first time.
              </h2>
              <p className="mt-5 max-w-md text-chalk-dim">
                A hands-on plumber who takes pride in every job, quotes upfront and leaves
                the work neat, dry and sorted, from a dripping tap to a burst geyser.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge label="Honest & Reliable" />
                <Badge label="5.0 ★ on Google" />
                <Badge label="Fast Response" />
              </div>
            </Reveal>
          </div>

          {/* Right: pillars */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <div className="group panel h-full p-6 transition-colors duration-300 hover:border-aqua/40">
                  <span className="font-mono text-sm font-bold text-aqua/70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-chalk">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chalk-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Offer strip */}
      <div className="shell mt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-dashed border-aqua/50 bg-aqua/[0.06] p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-aqua">
                  {site.offer.badge}
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold text-chalk sm:text-3xl">
                  {site.offer.headline}
                </p>
                <p className="mt-1 text-sm text-chalk-dim">{site.offer.note}</p>
              </div>
              <a href="#quote" className="btn-aqua shrink-0">
                Get a quote
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-raise/60 px-3.5 py-1.5 text-xs font-medium text-chalk-dim">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="m5 13 4 4L19 7"
          stroke="#1E86E8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}
