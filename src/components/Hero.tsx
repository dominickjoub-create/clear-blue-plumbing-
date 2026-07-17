"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { PipeDrip } from "./PipeDrip";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section id="top" className="relative flex min-h-[68svh] items-center overflow-hidden pt-16 sm:min-h-[100svh]">
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 grid-veil" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(30, 134, 232,0.12), transparent 70%), radial-gradient(50% 60% at 85% 30%, rgba(30, 134, 232,0.07), transparent 70%)",
        }}
      />
      <PipeDrip />
      {/* Fade the field into the page bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        aria-hidden
        style={{ background: "linear-gradient(to top, #050A14, transparent)" }}
      />

      <div className="shell relative z-10 py-12 sm:py-24">
        <div className="max-w-3xl">
          <motion.div {...rise(0)} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-raise/70 px-4 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-chalk-dim">
              Trusted Local Plumber · {site.areaServed}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-tight text-chalk sm:text-6xl lg:text-7xl"
          >
            Need a reliable
            <br />
            <span className="relative inline-block text-aqua">
              plumber?
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 8 Q 80 2 150 7 T 298 5"
                  stroke="#1E86E8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-chalk-dim sm:text-xl"
          >
            Clear solutions, honest service.{" "}
            <span className="text-chalk">Leaks, burst geysers, blocked drains</span> and
            everything in between, fixed properly the first time by Brandon and the Clear
            Blue team.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href="#quote" className="btn-aqua text-base">
              <DropIcon /> Get a free quote
            </a>
            <a href={`tel:${site.phoneE164}`} className="btn-ghost text-base">
              Call {site.phoneDisplay}
            </a>
          </motion.div>

          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            {/* Emergency standby */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-raise/70 px-4 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-chalk-dim">
                On standby for emergencies
              </span>
            </span>

            {/* Trading hours */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-raise/70 px-4 py-1.5 backdrop-blur">
              <ClockIcon />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-chalk-dim">
                {site.hours.label}
              </span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-ink-line p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-aqua" />
        </div>
      </div>
    </section>
  );
}

function DropIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="text-aqua">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
