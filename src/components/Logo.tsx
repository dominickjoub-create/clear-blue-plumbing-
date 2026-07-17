import { site } from "@/lib/site";

/**
 * The Clear Blue Plumbing brand mark — a water droplet holding a pipe/wrench,
 * shown as a rounded tile so it sits cleanly on the dark UI. Uses the supplied
 * logo image when present (public/logo-mark.png); otherwise the inline SVG
 * droplet below stands in.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-content-center rounded-lg bg-white ring-1 ring-ink-line ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="h-[70%] w-[70%]" fill="none">
        {/* Droplet outline */}
        <path
          d="M24 5C24 5 10 20 10 30a14 14 0 0 0 28 0C38 20 24 5 24 5Z"
          fill="url(#cbpDrop)"
        />
        {/* Simple pipe elbow inside the drop */}
        <path
          d="M20 34V25a5 5 0 0 1 5-5h5"
          stroke="#0B1220"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="28.5" y="17.5" width="5.5" height="5" rx="1" fill="#0B1220" />
        <defs>
          <linearGradient id="cbpDrop" x1="10" y1="5" x2="38" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4FA9F5" />
            <stop offset="1" stopColor="#0C5FC0" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

/** Full lock-up: mark + stacked wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-display text-[0.95rem] font-extrabold tracking-tight text-chalk sm:text-[1.05rem]">
          Clear<span className="text-aqua">Blue</span>
        </span>
        <span className="mt-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.34em] text-aqua">
          Plumbing
        </span>
      </span>
    </span>
  );
}
