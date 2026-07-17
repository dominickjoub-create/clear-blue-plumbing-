"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * Mobile-only sticky call + WhatsApp bar. On phones this is the highest-intent
 * conversion path — one tap to call, one tap to WhatsApp — so it stays pinned to
 * the bottom once the visitor scrolls past the hero. It steps aside while the
 * quote form or contact section is on screen (they have their own CTAs).
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const inView = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      setShow(past && !inView("quote") && !inView("contact"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-ink-line bg-ink/95 px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={`tel:${site.phoneE164}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink-line bg-ink-raise/80 py-3 font-display text-sm font-bold uppercase tracking-wide text-chalk"
      >
        <PhoneIcon /> Call
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-[1.3] items-center justify-center gap-2 rounded-full bg-aqua py-3 font-display text-sm font-bold uppercase tracking-wide text-white"
        style={{ boxShadow: "0 8px 22px -8px rgba(30,134,232,0.7)" }}
      >
        <WhatsAppIcon /> WhatsApp us
      </a>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5c0-1 1-2 2-2h1.5c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 9c1 2 2.5 3.5 4.5 4.5l1.1-1c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V19c0 1-1 2-2 2C11 21 3 13 4 5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
