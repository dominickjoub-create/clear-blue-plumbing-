import { Logo } from "./Logo";
import { site, services } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-ink-line">
      {/* tagline strip */}
      <div className="bg-aqua">
        <div className="shell flex items-center justify-center gap-3 py-3.5 text-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" aria-hidden className="shrink-0">
            <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
          </svg>
          <p className="font-display text-[0.8rem] font-extrabold uppercase tracking-[0.15em] text-white sm:text-sm">
            {site.tagline}
          </p>
        </div>
      </div>

      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-chalk-dim">{site.description.split(".")[0]}.</p>
            <a href="#quote" className="btn-aqua mt-6 !py-3 text-sm">
              Book your plumber
            </a>
          </div>

          <nav aria-label="Services">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-sm text-chalk-dim transition-colors hover:text-aqua">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href={`tel:${site.phoneE164}`} className="text-chalk-dim transition-colors hover:text-aqua">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-chalk-dim transition-colors hover:text-aqua">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk-dim transition-colors hover:text-aqua"
                >
                  {site.address.display}
                </a>
              </li>
              <li className="text-chalk-dim">{site.hours.label}</li>
              <li className="text-chalk-dim">{site.hours.note}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-chalk-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Clear solutions · Blue reliability · Flowing trust</p>
        </div>
      </div>
    </footer>
  );
}
