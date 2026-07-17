# Clear Blue Plumbing — Website

A fast, mobile-first marketing site for **Clear Blue Plumbing**, built with Next.js. Dark,
water-inspired brand identity (deep blue-black + clear blue + white) with an interactive 3D
**dripping-water hero** and a WhatsApp-based quote request flow.

## Highlights

- 💧 **Interactive 3D dripping water** hero (Three.js) — glowing droplets fall, trail and
  spawn ripples where they land, with pointer parallax. Scales down on mobile, pauses
  off-screen, and is skipped under `prefers-reduced-motion`.
- 📱 **Mobile-first** and fully responsive.
- 💬 **WhatsApp quote form** — pick services + enter details, and it opens WhatsApp with a
  pre-filled message ready to send.
- 🔍 **SEO-ready** — full metadata, Open Graph/Twitter cards, `Plumber` JSON-LD
  (trading area, 5.0★ Google rating), `sitemap.xml`, `robots.txt`, and a web manifest.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) for the dripping-water field
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## Editing business details

All business content — phone, email, service area, services, hours, rating, offer — lives in
one file: [`src/lib/site.ts`](src/lib/site.ts). Update it there and every section, the SEO
metadata, and the WhatsApp link update together.

> **Before going live:** replace the **placeholder** phone / WhatsApp numbers and service
> area in `site.ts` with the real ones (WhatsApp uses international format, e.g.
> `27610000000`), and set the real domain in `site.url` and the Facebook page URL.

## Brand assets

- Full logo lock-up: `public/logo-full.png` (used for Open Graph / social preview).
- The header/footer wordmark is drawn in code (`src/components/Logo.tsx`) so it stays crisp
  on the dark UI. Drop a `public/logo-mark.png` in and swap it into `LogoMark` if you prefer
  the exact emblem.
- Customer testimonials in `src/components/Testimonials.tsx` are the real Google reviews.
