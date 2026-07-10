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

## Core features (v1)

### 1. 🎯 Reverse Path Engine (`/careers/[slug]`)
Pick a dream career and trace it **backwards**: career → licensing → university course → realistic cutoffs → UTME subject combination → O'Level requirements (including sittings rules) → the SSS stream you must choose at JSS3. Plus salary reality in NGN and Plan B routes if the direct path fails.

### 2. 🧭 Stream Selector Quiz (`/quiz`)
18-question assessment grounded in the RIASEC (Holland Codes) interest model, adapted for Nigerian JSS3 students. Recommends Science / Art / Commercial with a fit percentage — and crucially shows **which doors each stream opens AND closes**, so the choice is informed. Results shareable to WhatsApp.

### 3. 🔎 Career Explorer (`/careers`)
Searchable, stream-filterable catalog of 22 careers with Nigerian salary ranges, demand outlook, day-to-day reality, licensing paths (MDCN, PCN, ICAN, COREN, MLSCN, CIPM, Law School...) and NYSC notes.

### 4. 🔀 Post-NYSC Pivot Guide (`/pivot`)
Pick your degree family (Sciences, Engineering, Social Sciences, Arts & Humanities, Management, or "any degree") → get 3 realistic pivot paths graduates actually take, each with an honest "reality check," fit rating (natural/stretch/bold), concrete first steps, time-to-employable estimates, and mostly-free Nigerian resources (AltSchool, Zuri, ALX, TEF, LSETF...).

### 5. 📲 Shareable results (`/s/[stream]`)
Quiz results share to a public page per stream with a **generated OG image** (`next/og`) — so the link preview in WhatsApp shows a branded result card. This is the viral loop: friend sees card → takes quiz → shares card.

## Stack

- **Next.js 16** (App Router, SSG for all career pages)
- **TypeScript** — fully typed domain model (`Career ↔ Course ↔ Subject` graph)
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **Zustand** (quiz state, persisted to localStorage)
- **Prettier** + prettier-plugin-tailwindcss

## Architecture notes

- The heart of the app is a typed data graph in `src/data/`: careers link to courses, courses declare UTME subjects + O'Level requirements, subjects declare which streams offer them. The Reverse Path Engine is a pure traversal of this graph — no backend needed for v1.
- Quiz scoring (`src/data/quiz.ts`) maps RIASEC dimension scores to streams via a weight matrix — deterministic, testable, explainable.
- All career pages are statically generated (`generateStaticParams`) → fast on cheap Androids and poor connections.

## Data disclaimer

Course requirements are modeled on the JAMB e-Brochure but **must be verified against [jamb.gov.ng](https://www.jamb.gov.ng)** — requirements vary by institution and year. Salary figures are indicative 2025/26 monthly NGN ranges.

## Roadmap

- [x] Post-NYSC Pivot Guide (degree → realistic paths → skills gap → Nigerian resources)
- [x] Shareable result cards (OG image generation) for WhatsApp virality
- [ ] Full JAMB brochure ingestion (all ~500 courses, per-institution requirements) → Supabase
- [ ] Offline-first PWA (service worker + IndexedDB) for low-data users
- [ ] AI advisor (RAG over the career graph)

## Run locally

```bash
npm install
npm run dev
```
