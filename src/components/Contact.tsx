import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Contact() {
  const cards = [
    {
      label: "Call or WhatsApp",
      value: site.phoneDisplay,
      href: `tel:${site.phoneE164}`,
      icon: <PhoneIcon />,
    },
    {
      label: "Email us",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon />,
    },
    {
      label: "Service area",
      value: site.address.display,
      href: site.address.mapsUrl,
      icon: <PinIcon />,
      external: true,
    },
    {
      label: "Follow on Facebook",
      value: "Tips, updates & more",
      href: site.facebook,
      icon: <FacebookIcon />,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 py-12 sm:py-20">
      <div className="shell">
        <div className="panel overflow-hidden">
          <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-aqua/10 blur-3xl"
            />
            <div className="relative">
              <Reveal>
                <p className="eyebrow">Get in touch</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
                  Let&apos;s get it <span className="text-aqua">flowing again.</span>
                </h2>
                <p className="mt-4 max-w-sm text-chalk-dim">
                  Phone, WhatsApp or email, whatever&apos;s easiest. For burst pipes and
                  geyser emergencies, just call, we&apos;ll respond fast.
                </p>

                <dl className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">
                      Hours
                    </dt>
                    <dd className="text-sm text-chalk">{site.hours.label}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chalk-faint">
                      Emergencies
                    </dt>
                    <dd className="flex items-center gap-2 text-sm text-chalk">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
                      </span>
                      {site.hours.note}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="relative flex flex-col gap-3">
              {cards.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-ink-line bg-ink/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-aqua/50"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-aqua/12 text-aqua transition-colors group-hover:bg-aqua group-hover:text-white">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-chalk-faint">
                        {c.label}
                      </span>
                      <span className="block truncate font-display text-[0.95rem] font-bold text-chalk sm:text-lg">
                        {c.value}
                      </span>
                    </span>
                    <svg
                      className="ml-auto hidden shrink-0 text-chalk-faint transition-transform group-hover:translate-x-1 group-hover:text-aqua sm:block"
                      width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-aqua mt-2 w-full !py-4"
                >
                  <WhatsAppIcon /> Message on WhatsApp
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5c0-1 1-2 2-2h1.5c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1.1L8 9c1 2 2.5 3.5 4.5 4.5l1.1-1c.3-.3.7-.4 1.1-.3l3 .8c.5.1.8.5.8 1V19c0 1-1 2-2 2C11 21 3 13 4 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.5-1.5H17V.5C16.7.4 15.7.3 14.6.3 12.3.3 10.8 1.7 10.8 4.2V6H8v3h2.8v9h3.2V9Z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
