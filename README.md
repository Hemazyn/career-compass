# 🧭 Career Compass

**Don't guess your future. Map it.**

Career guidance for Nigerian students — from choosing a stream at JSS3, to JAMB subject combinations, to post-NYSC career pivots. Built because ~70% of students make these decisions blind and discover locked doors too late.

## The problem

```
JSS3 → SSS1     Stream chosen by parents/peer pressure, not aptitude
SSS3 → JAMB     Wrong subject combination = automatic disqualification
UTME → Uni      Course chosen by cutoff marks, not interest
Uni → NYSC      4 years studying something never chosen
Post-NYSC       "What now?" with zero career identity
```

## Features

### 1. 🎯 Reverse Path Engine (`/careers/[slug]`)
Pick a dream career and trace it **backwards**: career → licensing → university course → realistic cutoffs → UTME subject combination → O'Level requirements (including sittings rules) → the SSS stream you must choose at JSS3. Plus salary reality in NGN and Plan B routes if the direct path fails.

### 2. 🧭 Career Path Quiz (`/quiz`)
18-question assessment grounded in the RIASEC (Holland Codes) interest model, adapted for Nigerian JSS3 students. Recommends the Science / Art / Commercial stream that fits your career path — with a fit percentage — and crucially shows **which doors each stream opens AND closes**. Results shareable to WhatsApp.

### 3. 🔎 Career Explorer (`/careers`)
Searchable, stream-filterable catalog of **200+ careers ranked from the world's top career roles** (rank 1 = top career worldwide), with global USD salary ranges, demand outlook, day-to-day reality, licensing paths (MDCN, PCN, ICAN, COREN, MLSCN, CIPM, Law School...) and NYSC notes.

### 4. 🔀 Post-NYSC Pivot Guide (`/pivot`)
Pick your degree family (Sciences, Engineering, Social Sciences, Arts & Humanities, Management, or "any degree") → get realistic pivot paths graduates actually take, each with an honest "reality check," fit rating (natural/stretch/bold), concrete first steps, time-to-employable estimates, and mostly-free Nigerian resources.

### 5. 📚 Resource Hub (`/resources`)
Curated, verified resources for Nigerian students: official JAMB/WAEC/NECO/NABTEB portals, JAMB CBT practice, scholarships & funding, free learning platforms, job boards, and communities — with search and category filtering.

### 6. 📲 Shareable results (`/s/[stream]`)
Quiz results share to a public page per stream with a **generated OG image** (`next/og`) — the link preview in WhatsApp shows a branded result card. This is the viral loop: friend sees card → takes quiz → shares card.

### 7. 📱 PWA — installable & offline
Installable web app: web app manifest with brand icons (SVG + 192/512 PNGs, apple-touch-icon), iOS install metadata, an install-prompt banner (`beforeinstallprompt` + iOS “Add to Home Screen” hint), and a hand-rolled service worker (`public/sw.js`) that precaches the top pages, caches visited pages for offline use, and serves a branded `/offline.html` fallback. Subscribable **push notifications** (standard Web Push / VAPID) with a ready-to-run sender script.

## SEO (big-tech standards)

- **Full metadata** on every route: titles, descriptions, canonicals, Open Graph, Twitter cards, robots directives.
- **JSON-LD structured data**: `WebSite` + `SearchAction` (sitelinks search box), `Organization`, `FAQPage`, `ItemList` (careers / pivots / resources), `BreadcrumbList` (detail pages).
- **`sitemap.xml`, `robots.txt`, `manifest.webmanifest`** generated from code.
- **Root OG + Twitter images** and per-stream share-card OG images via `next/og`.
- Semantic HTML: skip link, landmark regions, labelled search inputs, heading hierarchy.
- Core Web Vitals-friendly: fully static routes, no heavy client JS on marketing pages, CSS/SVG hero animation, font subsetting.

## Testing

| Layer | Tool | Coverage |
| --- | --- | --- |
| Unit (logic) | Vitest | Quiz scoring & recommendation engine, RIASEC mapping, NGN formatter, `cn` |
| Unit (data integrity) | Vitest | Careers ↔ courses ↔ subjects graph, pivot/resource data validity |
| Unit (store) | Vitest | Zustand quiz store actions |
| Component | Vitest + React Testing Library | Careers explorer (render, search, stream filter, empty state) |
| E2E | Playwright | Home, navigation, FAQ, careers explorer + detail, full quiz → result flow, resources hub |

```bash
npm run test             # unit + component tests
npm run test:watch
npm run test:e2e         # end-to-end (starts the dev server automatically)
npm run test:e2e:install # install the Playwright browser once (uses system Chrome by default)
npm run typecheck
npm run lint
```

## Stack

- **Next.js 16** (App Router, SSG for all career/pivot/share pages)
- **TypeScript** — fully typed domain model (`Career ↔ Course ↔ Subject` graph)
- **Tailwind CSS v4** (CSS-first `@theme` config, class-based dark mode)
- **Zustand** (quiz state, persisted to localStorage)
- **Vitest + Testing Library + Playwright** (unit, component & E2E tests)

## Architecture notes

- The heart of the app is a typed data graph in `src/data/`: careers link to courses, courses declare UTME subjects + O'Level requirements, subjects declare which streams offer them. The Reverse Path Engine is a pure traversal of this graph — no backend needed for v1.
- Quiz scoring (`src/data/quiz.ts`) maps RIASEC dimension scores to streams via a weight matrix — deterministic, testable, explainable.
- Design tokens live in `src/app/globals.css` (semantic `--color-canvas/surface/ink/line` + brand/accent scales). Dark mode is class-based with a no-FOUC inline script in `root layout`.
- Site-wide constants (name, URL, description, nav) live in `src/lib/site.ts` — set `NEXT_PUBLIC_SITE_URL` to your production domain.

## PWA & push notifications

- **Service worker** (`public/sw.js`): precaches the offline fallback, manifest, icons and the most useful pages; network-first navigations with cache → `/offline.html` fallback; stale-while-revalidate for hashed `_next` assets. Bump the `-vN` cache keys when shipping big changes — old caches are purged automatically on activate.
- **Registration** happens only in production (`ServiceWorkerRegister`) to avoid caching dev hot-reload chunks.
- **Install prompt**: `InstallPrompt` listens for `beforeinstallprompt` (Chrome/Android/Edge) and shows an iOS “Add to Home Screen” hint on Safari.
- **Push notifications**: visitors opt in via the footer toggle, which subscribes through the Push API and stores the subscription in localStorage (`career-compass-push-subscription`). To send:
  1. Generate VAPID keys: `npx web-push generate-vapid-keys`
  2. Put the public key in your deploy env as `NEXT_PUBLIC_VAPID_PUBLIC_KEY` (the site embeds it when users subscribe)
  3. Export subscriptions from a browser where someone opted in (see `scripts/send-push.mjs`) and run the sender script with `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` set
- For a managed alternative to self-sending, OneSignal or Firebase Cloud Messaging can be swapped in without touching the service worker's push handlers.

## Data disclaimer

Course requirements are modeled on the JAMB e-Brochure but **must be verified against [jamb.gov.ng](https://www.jamb.gov.ng)** — requirements vary by institution and year. Salary figures are indicative annual USD ranges (global standard) and vary widely by country, employer and specialisation. Resource links in `/resources` are external — verify costs and dates on the official sites.

## Roadmap

- [x] Post-NYSC Pivot Guide (degree → realistic paths → skills gap → Nigerian resources)
- [x] Shareable result cards (OG image generation) for WhatsApp virality
- [x] Full SEO: metadata, JSON-LD, sitemap, robots, OG/Twitter images
- [x] Test suite: Vitest (unit + component) & Playwright (E2E)
- [x] Resource hub with search & categories
- [x] Dark mode + design-system polish
- [x] Offline-first PWA (service worker, install prompt, push notifications) for low-data users
- [ ] Full JAMB brochure ingestion (all ~500 courses, per-institution requirements) → Supabase
- [ ] AI advisor (RAG over the career graph)

## Run locally

```bash
npm install
npm run dev
```
