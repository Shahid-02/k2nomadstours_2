# K2Nomadz Tours — Full-Stack Audit

**Audited:** 2026-08-03 · **Commit:** `ab1b0ba` (working tree clean) · **Stack:** Next.js 16.2.12 (App Router, Turbopack), React 19.2.4, TypeScript 5, Tailwind 4

---

## Executive summary

The codebase is **architecturally sound**. The parser contracts in `lib/itinerary.ts` / `lib/route.ts` are genuinely well built and their null-means-don't-render contract holds end to end. The server/client split in the header (`components/layout/header.tsx` → `header-shell.tsx`) is deliberate and correct. There are zero `any` types, zero raw `<img>` tags, no hydration mismatches, and no type duplication of `ItineraryDay` / `DayMetrics` / `StayKind` / `TravelMode`.

The problems are **operational, not structural**:

| | Finding |
|---|---|
| 🔴 | An **82 MB video autoplays** with `preload="auto"` on all 21 tour pages |
| 🔴 | The home-page **LCP image is a 9.7 MB unprocessed camera JPG**; `public/` totals ~337 MB |
| 🔴 | `POST /api/booking` **500s on malformed JSON** and has no abuse protection |
| 🟠 | `next.config.ts` is **completely empty** — no security headers |
| 🟠 | Missing `RESEND_API_KEY` **silently discards bookings** and reports success |
| 🟡 | Lint is **red** (1 error, 4 warnings); ~400 lines dead or duplicated |

---

## Baseline

### Build

`npm run build` — **exit 0**. Compiled 11.1 s · TypeScript 7.1 s · 35 static pages in 1.46 s.

| Route | Kind | Prerendered paths |
|---|---|---|
| `/` | ○ Static | 1 |
| `/_not-found` | ○ Static | 1 |
| `/api/booking` | ƒ Dynamic | — |
| `/apple-icon.png` | ○ Static | 1 |
| `/contact` | ○ Static | 1 |
| `/cycling` | ○ Static | 1 |
| `/cycling/[slug]` | ● SSG | 2 |
| `/faq` | ○ Static | 1 |
| `/icon.png` | ○ Static | 1 |
| `/robots.txt` | ○ Static | 1 |
| `/sitemap.xml` | ○ Static | 1 |
| `/tours` | ○ Static | 1 |
| `/tours/[slug]` | ● SSG | 7 |
| `/treks` | ○ Static | 1 |
| `/treks/[slug]` | ● SSG | 12 |
| `/vision-mission` | ○ Static | 1 |

> **⚠ The per-route "First Load JS" column no longer exists.** Next.js 16 removed JS bundle size metrics from `next build` — see `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md:417`: `v16.0.0 | The JS bundle size metrics have been removed from next build`. The replacement is `next experimental-analyze`. The table below is therefore measured directly off `.next/static`, and is what we re-measure against.

### Client bundle baseline (measured from `.next/static`)

| Metric | Value |
|---|---|
| Total client JS | **1.9 MB raw** across 26 chunks |
| Shared shell (`rootMainFiles`, 5 files) | **446.1 kB raw** |
| CSS | **128 kB raw / 21 kB gzip** |

| gzip | raw | chunk | contains |
|---|---|---|---|
| 73 kB | 312 kB | `280fb7snz54vn.js` | React / Next runtime |
| 69 kB | 224 kB | `2nfjug3v2wdrz.js` | — |
| **62 kB** | **188 kB** | `0jrqfaskodc_g.js` | **framer-motion** |
| 39 kB | 112 kB | `0cz1d0mv5g_q7.js` | — |
| 38 kB | 144 kB | `29194twgvgfhb.js` | — |
| 34 kB | 144 kB | `3yqb2e3-v0yha.js` | — |
| 34 kB | 144 kB | `2adl3m9nxyk6l.js` | — |
| 12 kB | 44 kB | `16amo55w27thf.js` | lenis |

### Static asset baseline

| Path | Size | Files |
|---|---|---|
| `public/images/photos/` | **209 MB** | 91 |
| `public/images/optimized/` | 46 MB | 50 |
| `public/video/` | **82 MB** | 1 (`hunza.mp4`) |
| `public/images/placeholders/` | 156 kB | 39 |
| **Total `public/`** | **≈ 337 MB** | — |

### Gates

| Command | Result |
|---|---|
| `npx tsc --noEmit` | **exit 0**, clean |
| `npm run lint` | **1 error, 4 warnings** (D-4) |
| `npm audit` | **6 vulnerabilities: 4 high, 2 moderate** — all transitive |
| `npx depcheck` | 5 reported; **all 5 are false positives** (C-5) |

---

## PART A — Frontend

### A-1 · 🔴 Critical — An 82 MB video autoplays with `preload="auto"` on every tour page

`sections/tour-detail/gallery.tsx:154-173`

```tsx
<video key={item.src} autoPlay muted loop playsInline
       preload="auto" poster={item.poster} … >
```

`lib/tour-page.tsx:134-135` computes `tourVideos`, and **no tour in the catalogue sets `videos:`** (verified: `grep -rln "videos:" data/tours/` returns nothing). Every one of the 21 tour pages therefore falls through to `getPublicVideos()` → `public/video/hunza.mp4` — **82 MB**, `poster` undefined, `preload="auto"`, `autoPlay`. The lead gallery frame sits above the "Show More" fold and begins downloading immediately.

A second copy plays in the lightbox at `gallery.tsx:244-250`, also `preload="auto"`.

**Impact:** one 82 MB request per tour page view on mobile data. This dwarfs every other performance finding here combined.

**✅ DECIDED:** transcode `hunza.mp4` to ~5 MB, keep `autoPlay`. Pixel output unchanged; only the source bytes shrink. Scheduled → Phase 4.

### A-2 · 🔴 Critical — LCP hero is a 9.7 MB unprocessed camera JPG

`sections/home/hero.tsx:56-63` — `src="/images/photos/IMG_9802.JPG"`, `priority`, `fill`.

Referenced-and-oversized files in `photos/`:

| Size | File | Used by |
|---|---|---|
| 16 MB | `Tomb_of_Bibi_Jiwindi.jpg` | tour data |
| 16 MB | `Gondogoro_La.jpg` | tour data |
| 15 MB | `Fairy_Meadows,_Pakistan.jpg` | tour data |
| 11 MB | `The_view_from_Chafchingol_Pass.jpg` | tour data |
| 11 MB | `IMG_9898.JPG` | tour data |
| **9.7 MB** | **`IMG_9802.JPG`** | **home hero (LCP)** |
| 9.4 MB | `Vigne-Glacier-Pakistan.jpg` | tour data |
| 7.4 MB | `IMG_9675.JPG` | tour data |
| 7.4 MB | `A_nature_s_trap_adjacent_to_Hispar_Pass.jpg` | tour data |
| 7.1 MB | `IMG_9673.JPG` | tour data |

79 of 91 files in `photos/` are referenced. `next/image` re-encodes at request time, but sharp still reads and decodes the full source on every cold cache entry, and all 209 MB ships in the deploy artifact. `public/images/optimized/` (46 MB, 50 files) already exists and serves ~40 references — **the pipeline exists, it was never finished**. `scripts/optimize-photos.sh` is present but wired to no npm script.

**✅ DECIDED:** compress. Scheduled → Phase 4.

### A-3 · 🟠 High — Zero dynamic imports; framer-motion (62 kB gz) is in the shared path

`grep -rn "next/dynamic\|lazy(" app components sections lib` → **no matches.**

36 files carry `"use client"`. Everything below the fold ships eagerly:

| Component | Lines | Below fold? |
|---|---|---|
| `sections/tour-detail/gallery.tsx` (Lightbox + `ui/dialog`) | 310 | ✅ |
| `sections/tour-detail/elevation-profile.tsx` | 148 | ✅ |
| `sections/tour-detail/reserve.tsx` (react-hook-form + zod resolver) | 331 | ✅ |
| `sections/tour-detail/inclusions-exclusions.tsx` | 294 | ✅ |
| `components/layout/mega-menu.tsx` | 378 | desktop-hover only |
| `components/layout/mobile-nav.tsx` | 174 | sheet only |

`lucide-react` is **already** in Next 16's default `optimizePackageImports` list (`.../05-config/01-next-config-js/optimizePackageImports.md:23`) — no action needed, and none will be taken.

### A-4 · 🟡 Medium — Real duplication (3+ occurrences, verified)

**A-4a · Inline eyebrow re-implementing the existing `<Eyebrow>` — 4×**

`components/shared/section-heading.tsx:11-26` exports `Eyebrow`. Four places hand-roll it:

- `components/layout/page-masthead.tsx:59-62`
- `components/layout/footer.tsx:35-38`
- `sections/home/hero.tsx:77-81`
- `sections/tour-detail/tour-hero.tsx:51-55`

All are `<p className="eyebrow flex items-center gap-3 …">` + `<span aria-hidden="true" className="h-px w-8 bg-alpenglow-bright" />`. Two are wrapped in `motion.p`; `hero.tsx:79` uses `w-10`. Fix is props on `Eyebrow`, not a blind swap.

**A-4b · The `/video/hunza.mp4` fallback literal — 4×**

`lib/videos.ts:9`, `lib/videos.ts:32`, `lib/videos.ts:35`, `sections/tour-detail/gallery.tsx:40`.

The fourth is in a client component, duplicating a server fallback `lib/tour-page.tsx:135` has already applied.

**A-4c · Hand-written `<script type="application/ld+json">` — 4×**

`app/page.tsx:39-42`, `sections/shared/faq-accordion.tsx:47-50`, `lib/tour-page.tsx:139-142`, `lib/tour-page.tsx:143-146`. See C-4 for the escaping hazard this hides.

**A-4d · Mono `<dt>/<dd>` fact block — 4×**

`components/layout/page-masthead.tsx:80-89`, `sections/home/hero.tsx:134-156`, `sections/tour-detail/tour-hero.tsx:81-97` (×2), `sections/tour-detail/itinerary-timeline.tsx:100-111`.

**A-4e · WhatsApp external anchor — 11 occurrences**

`app/contact/page.tsx:24`, `header-shell.tsx:85`, `mega-menu.tsx:355`, `sticky-book-bar.tsx:57`, `footer.tsx:101`, `mobile-nav.tsx:146`, `enquiry-form.tsx:84`, `faq-accordion.tsx:65`, `overview.tsx:127`, `reserve.tsx:186`, `reserve.tsx:285`. Nine repeat `target="_blank" rel="noopener noreferrer"` by hand; `TextLink` (`cta.tsx:69-107`) already encapsulates it. Low value — scheduled last.

### A-5 · 🟡 Medium — Two-occurrence duplication

| Pattern | Locations | Decision |
|---|---|---|
| `Field` / `EnquiryField` | `reserve.tsx:303-331` vs `enquiry-form.tsx:205-233` — **byte-identical bodies** | **✅ MERGE** (Phase 3) |
| Booking `onSubmit` fetch handler | `reserve.tsx:65-89` vs `enquiry-form.tsx:44-68` — identical incl. both error strings | **🔒 DO NOT TOUCH** |
| Expand-grid + "More" button | `category-listing.tsx:74-146` vs `journey-index-section.tsx:42-115` | not scheduled (2×) |
| Social icon row | `footer.tsx:119-132` vs `contact/page.tsx:121-134` | not scheduled (2×) |
| `FLAT_LINKS` | `header-shell.tsx:17-20` vs `mobile-nav.tsx:14-18` | not identical — mobile adds `Contact` |

### A-6 · 🟡 Medium — Dead code

**Wholly unused files** (zero importers across `app`/`components`/`sections`/`lib`/`data`/`types`):

| File | Lines | Verification |
|---|---|---|
| `components/shared/journey-index.tsx` | 142 | `grep -rn "journey-index"` → only `app/page.tsx:5` importing `journey-index-**section**`, a different file |
| `components/ui/badge.tsx` | 45 | zero refs |
| `components/ui/card.tsx` | 103 | zero refs |
| `components/ui/navigation-menu.tsx` | 168 | zero refs |
| `components/ui/select.tsx` | 201 | zero refs |
| `components/ui/separator.tsx` | 30 | zero refs |
| `components/ui/tabs.tsx` | 82 | zero refs |

`journey-index.tsx` carries the only use of the exported `IndexEntry` interface — it dies with the file. **✅ DECIDED: delete all seven.**

**Empty directory:** `hooks/` — empty, but registered as `@/hooks` in `components.json`.

**Orphaned assets.**

> **⚠ CORRECTED 2026-08-03 during Phase 1b execution.** This section originally
> claimed **12** orphaned photos. That was wrong — produced by a regex
> (`/images/[a-zA-Z0-9_./-]+`) that truncated on filenames containing parens,
> commas and spaces, and by a case-sensitive match. **Only 3 photos are
> genuinely orphaned.** Re-verified by testing each on-disk basename for any
> case-insensitive occurrence in source.

Genuinely orphaned: **3 photos** (`IMG_6255.jpg`, `Khoburtse.jpeg`, `knt-new.png`) + **5** Next template SVGs (`next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`) + **38 of 39** placeholder SVGs — the survivor is `hero-nomadic.svg`, the OG image at `data/tours/nomadic-experience-of-pakistan.ts:233`.

**Wrongly listed as orphans — all 9 are in use:**

| File | Actually used by |
|---|---|
| `IMG_0044.JPG`, `IMG_0063.JPG`, `IMG_0064.JPG`, `IMG_8241.JPG`, `IMG_8302.JPG`, `IMG_9816.JPG`, `1200px-Lahore_Fort_view_from_Baradari.jpg`, `Afroze_Numa_(Taseer_Beyg).jpg` | **Source masters** consumed by `scripts/optimize-photos.sh`, which generates the `optimized/` images the site renders. Deleting them would destroy the pipeline Phase 4 needs |
| `Rush-Lake1.jpg` | `data/tours/rakaposhi-base-camp-and-rush-lake-trek.ts:23,58` — referenced as `/images/photos/Rush-**l**ake1.jpg` (lowercase L) |

Also orphaned, not previously listed: `public/images/optimized/Kalash nomadic.jpg` (the numbered `Kalash nomadic 1..6.jpeg` siblings *are* used). **Left in place — outside the approved deletion set.**

### A-6b · 🟠 High — Two broken asset references (pre-existing, NOT introduced by this refactor)

| Reference | Site | Status |
|---|---|---|
| `/video/hunza-2.mp4` | `data/tours/discover-hunza-valley.ts:23` | **File has never existed in the repo.** It sits in the `gallery: TourImage[]` array, so it renders through `next/image` — which cannot decode an `.mp4` regardless. Breaks a gallery frame on the Discover Hunza Valley page |
| `/images/photos/Rush-lake1.jpg` | `rakaposhi-base-camp-and-rush-lake-trek.ts:23,58` | Case mismatch — on-disk file is `Rush-**L**ake1.jpg`. **Resolves on macOS (case-insensitive FS), 404s on Linux/Vercel** |
| `/images/photos/Karachi.jpg` | `nomadic-experience-of-pakistan.ts:43` | Inside a commented-out line — inert, no action |

Both live issues are **data defects, not code**. Not scheduled — flagged for your decision.

**Dead code inside live files:**

- `sections/home/journey-index-section.tsx:27` — `const visible = …` computed, never used
- `sections/home/journey-index-section.tsx:5,9,10` — `ChevronUp`, `tourHref`, `Tour` imported, never used
- `sections/home/journey-index-section.tsx:116-127` — 12-line commented-out "Show less" block
- `components/layout/footer.tsx:139-144` — 6-line commented-out wordmark

### A-7 · 🟢 Low — Images, fonts, CLS

- **`<img>`:** zero raw tags ✅ — all 10 image sites use `next/image`
- **Fonts:** ✅ `next/font/google`, three families, `display: "swap"` (`app/layout.tsx:10-28`)
- **CLS:** ✅ every image uses `fill` inside an explicit aspect-ratio container. `TourImage.width/height` (`types/tour.ts:4-9`) is carried in data but never read — dead data, harmless
- **Layout animation:** `mobile-nav.tsx:83-85` animates `height: 0 → "auto"`. Behind a user tap in a sheet; a transform rewrite would change the visual. **Not scheduled**
- **Reduced motion:** ✅ thorough — `useReducedMotion()` in 11 components + global block at `globals.css:434-446`
- **No-JS:** ✅ the `<noscript>` un-hide shim at `app/layout.tsx:83-85` is a genuinely good catch

### A-8 · 🟢 Low — Hydration

`components/layout/footer.tsx:134` — `© {new Date().getFullYear()}`. Server component in prerendered pages, so **no hydration mismatch**, but the year **freezes at build time**. No other `Date.now()` / `Math.random()` / `window` access during render.

---

## PART B — Backend / Server

### B-1 · 🔴 Critical — `POST /api/booking` returns 500 on malformed JSON

`app/api/booking/route.ts:9`

```ts
const body = await request.json();   // ← throws, uncaught
const parsed = bookingSchema.safeParse(body);
```

`request.json()` rejects on any non-JSON body. No `try`/`catch`, so the rejection escapes and Next returns an unhandled 500 with a stack trace in the log. The `safeParse` below is correct — it simply never runs.

### B-2 · 🟠 High — No rate limiting or abuse protection

`app/api/booking/route.ts` is the only mutating endpoint. No rate limit, **no honeypot**, no CAPTCHA, no origin check, no request-size cap. Both public forms post to it (`reserve.tsx:68`, `enquiry-form.tsx:47`), and each accepted request fires a **paid Resend API call**.

`lib/validations/booking.ts:11` caps `message` at 1000 chars — but only *after* parsing.

**✅ DECIDED:** honeypot field only. Zero new dependencies. Scheduled → Phase 6.

### B-3 · 🟠 High — `lib/videos.ts` does synchronous filesystem I/O per render

`lib/videos.ts:5-36` — `fs.existsSync` + `fs.readdirSync` on `public/video`, called from `lib/tour-page.tsx:134` inside the page component. Runs **21×** at build. Bounded today, but `lib/tour-page.tsx` is the shared factory for all three `[slug]` routes — if any becomes dynamic this is sync disk I/O on the request path. The result is identical across all 21 calls and is not memoised.

Fix: `import { cache } from "react"` — import-level only, no logic touched.

### B-4 · 🟡 Medium — `getDayMetrics()` runs ~4× per itinerary day

For a 21-day tour, `getDayMetrics` (8+ regexes over joined prose) executes **≈ 84 times** per render:

1. `lib/itinerary.ts:152` — inside `getTripSummary`, per day
2. `sections/tour-detail/itinerary-timeline.tsx:50` — per day, for the altitude range
3. `sections/tour-detail/itinerary-timeline.tsx:136` — per day, in the render loop
4. `sections/tour-detail/day-card.tsx:127` — again, per card

Plus `elevation-profile.tsx:30` re-derives altitude via a separate `extractAltitude` call — 21 more passes.

Build-time only (all tour pages SSG), so it costs build seconds, not user latency. The clean fix means editing **SENSITIVE** `lib/itinerary.ts` — **deferred**.

### B-5 · 🟢 Low — Data fetching strategy is already correct

`generateStaticParams` present on all three `[slug]` routes (`lib/tour-page.tsx:34-36`) ✅ · all 15 non-API routes prerender ✅ · `/api/booking` correctly dynamic ✅ · data is compile-time TS, no DB, no fetch, no N+1 ✅ · ISR correctly *not* used — content changes only on deploy ✅

Only gap: the API route declares no explicit `runtime` / `dynamic`. It infers correctly; declaring it is hardening, not a fix.

### B-6 · 🔒 SENSITIVE — audited, frozen

**`lib/validations/booking.ts`**

- `:6` uses `z.string().email(…)`. Zod 4 deprecates this in favour of top-level `z.email()`. Works, no warning at `^4.4.3`. **Do not change** — it would alter the error path shared by both forms.
- `:8` `preferredDateStart: z.string().min(1)` accepts any non-empty string. `<input type="date">` constrains it in practice, and `booking-notification.ts:12-16` already echoes an unparseable date verbatim. **Correct defensive behaviour — leave it.**
- `newsletterSchema` (`:16-18`) feeds `components/shared/newsletter.tsx:22`, whose `onSubmit` (`:24-28`) is a **500 ms `setTimeout` stub that discards the email** and shows "You're on the list." **Product gap — user has asked to fix this later, tracked separately.**

**`lib/emails/booking-notification.ts`**

- `escapeHtml` (`:3-10`) applied to every interpolated field: `:42` name, `:43` email, `:44` phone, `:49` message, `:76` tour title, `:79` first name, `:94` URL ✅ **No XSS.**
- `:49` orders escape-then-linebreak correctly ✅
- `:43-44` `mailto:` / `tel:` hrefs are HTML-escaped but not URL-encoded. Inert in an email client — values are Zod-validated. **Recording only.**

**`lib/itinerary.ts` — parser architecture & null contract**

Contract (`:15-16`): *"A field that isn't stated comes back null and the UI simply doesn't render that metric."*

**Verdict: the contract holds. No violations.**

| Producer | Consumer | Safe? |
|---|---|---|
| `distanceKm` (`:121`) | `day-card.tsx:131` `!== null &&` | ✅ |
| `duration` (`:122`) | `day-card.tsx:136` truthy | ✅ |
| `elevationM` (`:124`) | `day-card.tsx:141` `!== null &&`; `itinerary-timeline.tsx:51` `.filter(v => v !== null)` | ✅ |
| `stay` (`:125-127`) | `day-card.tsx:146` truthy | ✅ |
| `meals` (`:128`) | `day-card.tsx:241` truthy | ✅ |
| `leg` (`:129`) | `day-card.tsx:197` ternary → `day.theme` → `null` | ✅ |
| `highPointM` / `statedDistanceKm` (`:168`) | `itinerary-timeline.tsx:58,62` `!== null &&` + `.filter(Boolean)` | ✅ |

Guards are `!== null` rather than truthy in exactly the places where `0` is meaningful — the subtle thing to get right, and it is right. `parseDistanceKm:58` caps at 600 km; `extractAltitude` (`lib/route.ts:101`) clamps 800–6200 m with reasoning documented at `lib/route.ts:73-79`; peak-vs-camp disambiguation (`lib/route.ts:94,97`) is correct.

**Not a violation:** `getTripSummary:157` uses truthy `if (metrics.distanceKm)`. A literal `0 km` day would be skipped — but `parseDistanceKm:58` rejects `0` (`value > 0`), so it is unreachable. **Recording only.**

**`lib/route.ts`** — `getOutboundRoute` mirror-folding (`:37-41`) and `condenseRoute` (`:56-69`) correct incl. empty-array and `limit` boundaries. **No findings.**

---

## PART C — Security & Config

### C-1 · 🟠 High — `next.config.ts` is empty; no security headers

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { /* config options here */ };
export default nextConfig;
```

| Option | Status | Effect |
|---|---|---|
| `headers()` | absent | No CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` |
| `poweredByHeader: false` | absent | `X-Powered-By: Next.js` leaks the framework |
| `images.formats` | absent | Default is `['image/webp']` only (`02-components/image.md:738`); adding AVIF cuts hero bytes ~30 % |
| `reactStrictMode` | absent | Defaults on in App Router |
| `compress` | absent | Defaults `true` — no action |
| `optimizePackageImports` | absent | **Correctly absent** — `lucide-react` already in the default list |

### C-2 · 🟠 High — No environment variable validation

`process.env` appears twice, both in `app/api/booking/route.ts`:

- `:22` `RESEND_API_KEY` — if unset, `:24-25` **logs the booking to stdout and returns `{ ok: true }`**. The traveller sees "Request received"; the enquiry is gone. A misconfigured deploy loses **every** booking with no signal.
- `:29` `RESEND_FROM_EMAIL || "onboarding@resend.dev"` — silently falls back to Resend's sandbox sender, which only delivers to the account owner.

Both failure modes surface as lost revenue, not as errors.

### C-3 · 🟢 Low — No exposed secrets

- `grep -rn "NEXT_PUBLIC"` across all source → **zero matches** ✅
- `git ls-files | grep -i env` → **empty**; `.env.local` untracked, `.gitignore:36` covers `.env*` ✅
- `.env.local` holds a real `RESEND_API_KEY`, correctly gitignored, never imported outside the server route ✅
- `data/site.ts:8-10` holds the business's public email / WhatsApp / socials — intentional, they render in the footer

### C-4 · 🟡 Medium — `dangerouslySetInnerHTML` on JSON-LD without `<` escaping

`app/page.tsx:41`, `faq-accordion.tsx:49`, `lib/tour-page.tsx:141`, `lib/tour-page.tsx:145`.

All do `JSON.stringify(x)` with no `<` escaping. `JSON.stringify` does **not** escape `<`, so a string containing `</script>` breaks out of the tag.

**Current exploitability: none** — every input is compile-time-authored TypeScript in `data/`, and no tour title, FAQ answer or SEO description contains `<`. This is a latent hazard that goes live the moment the content becomes editable. Fix (`.replace(/</g, "\\u003c")`) is byte-identical for all current data.

### C-5 · 🟡 Medium — Dependency health

**6 vulnerabilities (4 high, 2 moderate) — all transitive:**

| Package | Sev | Note |
|---|---|---|
| `sharp` `<0.35.0` | **high** | libvips CVE-2026-33327/33328/35590/35591. **Reachable** — this is the image optimizer, and A-2's 16 MB inputs feed it |
| `postcss` ×3 | high | XSS via unescaped `</style>`; sourceMappingURL path traversal. Build-time only |
| `brace-expansion` | high | ReDoS / OOM |
| `@hono/node-server` `<2.0.5` | moderate | Windows-only; not in the app's runtime path |

> `npm audit fix --force` proposes **`next@9.3.3`** — a catastrophic downgrade. **Never run it.** Remedy is `next@16.2.13+` when published. Record and monitor.

**Unused dependencies — all 5 depcheck hits are false positives:**

| Package | Verdict |
|---|---|
| `shadcn` | `app/globals.css:3` — `@import "shadcn/tailwind.css"`. depcheck can't see CSS imports |
| `tw-animate-css` | `app/globals.css:2` |
| `@tailwindcss/postcss`, `tailwindcss` | via `postcss.config.mjs` |
| `@types/react-dom` | ambient types |

**Zero dependency removals scheduled.**

### C-6 · 🟢 Low — `tsconfig` / `eslint`

`tsconfig.json` is solid: `strict`, `noEmit`, `isolatedModules`, bundler resolution, `@/*` paths. Optional (all would surface new errors): `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `target` bump from `ES2017`. `eslint.config.mjs` extends `core-web-vitals` + `typescript` correctly.

---

## PART D — SEO / A11y / TypeScript

### D-1 · 🟢 Low — SEO coverage is strong

| Route | title | desc | canonical | OG | Twitter |
|---|---|---|---|---|---|
| `/` (`app/layout.tsx:30-59`) | ✅ | ✅ | ⚠️ **missing** | ✅ | ✅ |
| `/tours`, `/treks`, `/cycling`, `/faq`, `/vision-mission`, `/contact` | ✅ | ✅ | ✅ | inherits | inherits |
| `/{tours,treks,cycling}/[slug]` (`lib/tour-page.tsx:38-68`) | ✅ | ✅ | ✅ | ✅ +image | ✅ +image |

`app/sitemap.ts` ✅ 7 static + 21 tour URLs · `app/robots.ts` ✅ disallows `/api/` · **JSON-LD** ✅ `TravelAgency` (`page.tsx:14-28`), `TouristTrip` + `offers` + `itinerary` (`tour-page.tsx:80-112`), `BreadcrumbList` (`:114-132`), `FAQPage` (`faq-accordion.tsx:35-43`).

**Gaps:** (1) 🟡 root layout has no self-referencing `alternates.canonical`; (2) 🟢 category pages have no `ItemList` JSON-LD (optional).

### D-2 · 🟡 Medium — Accessibility

**Already good:** skip link (`layout.tsx:87-92`), `<main id="main">`, global `:focus-visible` outline (`globals.css:255-257`), `aria-label` on every icon-only button checked (`gallery.tsx:290,298`, `testimonials.tsx:53,61`, `mobile-nav.tsx:72`, `header-shell.tsx:88,110`, `newsletter.tsx:55`), `aria-hidden` on decorative spans, `sr-only` on `DifficultyMeter:46-48`, `aria-label` on `RouteLine:73`, and `TextReveal:34` labelling the whole string while hiding word fragments.

| # | Sev | Issue | Evidence |
|---|---|---|---|
| D-2a | 🟡 | **`role="tab"` with no tablist keyboard model** — no arrow keys, no roving tabindex, no `aria-controls`, no `tabpanel` | `testimonials.tsx:101-122`; `inclusions-exclusions.tsx:106-149` |
| D-2b | 🟡 | **Lightbox arrow keys bound to `window`, not the dialog** — fires even when focus is on the close button. Escape/focus-trap come from base-ui ✅ but arrow handling sits outside it | `gallery.tsx:218-226` |
| D-2c | 🟢 | **Heading hierarchy skips** — `TextReveal` defaults `as="h2"` where `<h3>` is meant | `experience-details.tsx:38`, `related-tours.tsx:16` |
| D-2d | 🟢 | **Pricing radios have no visible focus state** — `<input type="radio" className="sr-only">` is keyboard-reachable but the visible indicator gets no `:focus-visible`. **SENSITIVE (booking form) — flag only** | `reserve.tsx:119-163` |
| D-2e | 🟢 | Alt text quality is high throughout; `journey-index.tsx:82` correctly uses `alt=""` on a decorative plate | — |

### D-3 · 🟡 Medium — TypeScript quality

- **`any` types: zero** ✅
- **Type reuse from `@/types` is already correct** — specifically checked:
  - `ItineraryDay` defined once (`types/tour.ts:17`), imported by `lib/itinerary.ts:1` + three sections ✅ **no duplicate**
  - `DayMetrics`, `StayKind`, `TravelMode` defined once each (`lib/itinerary.ts:19-32`), imported by `day-card.tsx:20` ✅ **no duplicate**
  - *Observation:* these three live in `lib/` while other shared types live in `types/`. They are **derived** types (parser output, not data shape), so this is defensible. Moving them touches a SENSITIVE file — **not scheduled**
- 🟡 **Missing return types on exported functions:** `lib/utils.ts:35` `cn`, `lib/emails/booking-notification.ts:28` (SENSITIVE — annotation only), `lib/tour-page.tsx:33` `createTourRouteExports`. React components left inferred (idiomatic) — not scheduled
- 🟢 `types/tour.ts:4-9` `TourImage.width`/`height` required but never read. Changing them touches all 21 data files for no benefit — **not scheduled**

### D-4 · 🟡 Medium — Lint is red

```
components/layout/mega-menu.tsx
  367:25  error  `'` can be escaped with `&apos;`   react/no-unescaped-entities

sections/home/journey-index-section.tsx
   5:23  warning  'ChevronUp' is defined but never used
   9:23  warning  'tourHref' is defined but never used
  10:15  warning  'Tour' is defined but never used
  27:9   warning  'visible' is assigned a value but never used

✖ 5 problems (1 error, 4 warnings)
```

`mega-menu.tsx:367` is `We're here to help you plan` → `We&apos;re` renders **identical text**.

---

## Execution plan

Constraints on every phase: **rendered output stays pixel-identical** · **no behaviour change to forms, booking, validation, emails** · **no new dependencies without approval** · **no new file unless it removes documented 3×+ duplication or is required by Phases 5–7**.

Per phase: `npm run build` → `npx tsc --noEmit` → `npm run lint` → fix → commit → **stop and report**.

| Phase | Scope | Risk |
|---|---|---|
| **1 — Dead code** | Delete `components/shared/journey-index.tsx` + 6 unused `components/ui/*` (approved). Remove 4 unused imports + `visible` in `journey-index-section.tsx`. Delete 2 commented-out blocks. Remove empty `hooks/`. Fix `mega-menu.tsx:367`. **Lint goes green.** | 🟢 safe |
| **1b — Orphaned assets** | 12 photos + 5 template SVGs + 38 placeholder SVGs | 🟡 needs confirmation |
| **2 — Data extraction** | Hoist the `hunza.mp4` fallback (A-4b) to one constant in `lib/videos.ts`; import in `gallery.tsx:40`. No new file | 🟢 safe |
| **3 — Deduplication** | `Eyebrow` props + 4 call sites (A-4a). New `<JsonLd>` (A-4c, carries the C-4 escape). New `<FactList>` (A-4d). **Merge `Field`/`EnquiryField` — `onSubmit` untouched** (A-5) | 🟡 needs check |
| **4 — Frontend perf** | Transcode `hunza.mp4` → ~5 MB, keep autoplay (A-1). Compress the 10 oversized photos incl. LCP hero (A-2). `next/dynamic` for Lightbox / ElevationProfile / MegaMenu / MobileNav (A-3). `images.formats` AVIF+WebP | 🟡 needs check |
| **5 — Backend** | try/catch on `request.json()` → 400 (B-1). `react.cache` on `getPublicVideos` (B-3). Declare `runtime`/`dynamic`. **B-4 deferred — SENSITIVE** | 🟡 needs check |
| **6 — Security & config** | `next.config.ts`: `headers()` (CSP first as `Report-Only`), `poweredByHeader: false`, `images.formats`. Loud env validation (C-2). **Honeypot on the booking form** (B-2, approved, zero deps) | 🔴 needs check |
| **7 — SEO & a11y** | Root canonical (D-1). Roving tabindex + arrow keys + `aria-controls` on both tab groups (D-2a). Scope lightbox keys to the dialog (D-2b). Heading levels (D-2c). **D-2d skipped — booking form** | 🟡 needs check |
| **8 — Verification** | Full gate run. Re-measure `.next/static`. Byte-diff all 30 prerendered HTML files against the pre-refactor baseline. Final report | 🟢 safe |

### Decisions on record

| # | Decision |
|---|---|
| 1 | **Video** → transcode to ~5 MB, **keep autoplay** |
| 2 | **Photos** → compress |
| 3 | **Rate limiting** → **honeypot only**; ask before any new package |
| 4 | **Unused shadcn files** → delete |
| 5 | **`Field`/`EnquiryField`** → merge; **`onSubmit` not touched** |
| — | **Newsletter stub** (`newsletter.tsx:24-28`) → fix later, tracked separately |

### Deliberately not scheduled

- `npm audit fix --force` → installs `next@9.3.3`. Never run it
- `getTripSummary:157` truthy distance guard — unreachable, SENSITIVE
- Copyright year freezes at build time (`footer.tsx:134`)
- `StayKind`/`TravelMode`/`DayMetrics` location — defensible as-is
- `mobile-nav.tsx:83-85` height animation — bounded, and a rewrite changes the visual

### Verification method

**Pixel-identity proof.** 30 prerendered HTML files captured from `.next/server/app/**/*.html` at `ab1b0ba` before any edit. After each phase, rebuild and `diff -r`. **Phases 1, 2, 3, 5 must produce zero HTML diffs.** Phases 4, 6, 7 produce diffs by design — each reviewed line by line and reported before commit.
