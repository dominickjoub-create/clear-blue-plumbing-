import { site } from "@/lib/site";

/**
 * The Clear Blue Plumbing brand mark — the droplet + pipe/wrench emblem from the
 * official logo, cropped out of the full lock-up and shown on a rounded white
 * tile so it sits cleanly on the dark UI.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid place-content-center overflow-hidden rounded-lg bg-white ring-1 ring-ink-line ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt={`${site.name} logo`}
        className="h-full w-full object-contain p-1"
      />
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
