"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-ink-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <a href="#top" aria-label={`${site.name} — home`}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-chalk-dim transition-colors hover:text-aqua"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.phoneE164}`}
            className="btn-ghost hidden !px-4 !py-2.5 !text-[0.78rem] lg:inline-flex"
          >
            {site.phoneDisplay}
          </a>
          <a href="#quote" className="btn-aqua !gap-1.5 !px-3.5 !py-2.5 !text-[0.78rem]">
            <span className="hidden sm:inline-flex">
              <DropIcon />
            </span>
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get a quote</span>
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-chalk md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-line bg-ink/95 backdrop-blur-md md:hidden ${
          open ? "max-h-96" : "max-h-0 border-transparent"
        } transition-all duration-300`}
      >
        <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-display text-lg font-bold text-chalk transition-colors hover:bg-ink-raise hover:text-aqua"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-aqua mt-2"
          >
            WhatsApp {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}

function DropIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
    </svg>
  );
}
