import type { ServiceId } from "@/lib/site";

const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceIcon({ id }: { id: ServiceId }) {
  switch (id) {
    case "leaks":
      // Dripping droplet with a magnifier feel — leak detection
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3s5 6 5 9.5a5 5 0 0 1-10 0C7 9 12 3 12 3Z" />
          <path d="M12 21v0" />
        </svg>
      );
    case "geysers":
      // Water heater cylinder
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="3" width="12" height="18" rx="4" />
          <path d="M9 8h6" />
          <path d="M12 12v4" />
          <path d="M10.5 14.5 12 12l1.5 2.5" />
        </svg>
      );
    case "taps":
      // Tap / faucet with a drip
      return (
        <svg {...common} aria-hidden>
          <path d="M4 10h6V8a2 2 0 0 1 2-2h3" />
          <path d="M10 10v3a4 4 0 0 0 4 4" />
          <path d="M17 4h3M18.5 4v4" />
          <path d="M14 20v0" />
        </svg>
      );
    case "toilets":
      // Toilet
      return (
        <svg {...common} aria-hidden>
          <path d="M6 4h4v3H6z" />
          <path d="M5 9h13a0 0 0 0 1 0 0 6 6 0 0 1-6 6H9l-1.5 5" />
          <path d="M12 15v3" />
        </svg>
      );
    case "drains":
      // Drain grate
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M9 5.5v13M12 4v16M15 5.5v13" />
        </svg>
      );
    case "tanks":
      // Water tank / storage
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="6" width="14" height="14" rx="3" />
          <path d="M5 10h14" />
          <path d="M9 3v3M15 3v3" />
          <path d="M8 14c1.5 1.5 3 1.5 4 0s2.5-1.5 4 0" />
        </svg>
      );
    case "outdoor":
      // Outside tap / pipe to house
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20V9a3 3 0 0 1 3-3h6l3 3v11" />
          <path d="M2 20h20" />
          <path d="M9 12h4" />
          <path d="M18 12h3" />
        </svg>
      );
  }
}
