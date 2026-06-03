# Rallytic

Tennis coaching platform with **two distinct workspaces**:

- **Coach mode** — manage your roster, run ITN & Talent tests, build AI-assisted training plans, log matches, plan tactics, get paid by players.
- **Academy mode** — director oversight: evaluate every coach, compare them side-by-side, see academy-wide analytics, manage finance, billing and per-seat plans.

Built around the **Court Dark** design system: dark surfaces, a single lime accent (`#A8D847`), Barlow + JetBrains Mono typography.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (theme tokens mapped from the design system)
- **next-intl** for 5 languages
- **Tabler Icons** (web font)
- SVG inline charts (no chart library)

## Run

```bash
cd web
npm install
npm run dev        # http://localhost:3000 — auto-redirects to /en
npm run build      # production build (143 routes)
npm run start      # serve the production build
```

## Project layout

```
web/
├── src/
│   ├── app/
│   │   └── [locale]/          # All routes are locale-prefixed
│   │       ├── page.tsx       # Mode select
│   │       ├── signin/
│   │       ├── signup/{coach,academy}/
│   │       ├── forgot-password/
│   │       ├── coach/         # Coach workspace
│   │       │   ├── page.tsx            # Dashboard
│   │       │   ├── players/            # Roster
│   │       │   ├── performance/        # Profile + Performance
│   │       │   ├── plan/               # Smart Coaching Plan
│   │       │   ├── itn/                # ITN & Talent Test
│   │       │   ├── matches/            # List + detail + tournament
│   │       │   │   └── new/            # Add-match wizard
│   │       │   ├── add-player/         # Add-player wizard
│   │       │   ├── tactics/            # Tactics board
│   │       │   ├── calendar/           # Month calendar
│   │       │   ├── finance/            # Subscription + payments
│   │       │   ├── notifications/      # Inbox
│   │       │   └── account/            # Settings (6 tabs)
│   │       └── academy/       # Academy workspace
│   │           ├── page.tsx            # Director dashboard
│   │           ├── coaches/            # Roster cards
│   │           ├── compare/            # Side-by-side
│   │           ├── analytics/          # 4 tabs
│   │           ├── players/            # All-players aggregate
│   │           ├── finance/            # 5 tabs (overview/ledger/payroll/rev/payments)
│   │           ├── billing/            # Per-seat plans + Iran payment
│   │           ├── notifications/
│   │           ├── history/            # Evaluation history
│   │           └── settings/           # 7 tabs (info/weights/coaches/cycle/branding/billing/data)
│   ├── components/            # Shell, Brand, Icon, Clock, modals, charts, lang switcher
│   ├── lib/                   # Mock data + tokens + format helpers
│   ├── messages/              # en.json, fa.json, fr.json, es.json, de.json
│   ├── i18n/                  # next-intl config
│   └── middleware.ts          # Locale routing
└── package.json
```

## Internationalization

Five locales, default English:

| Code | Language | Direction | Numerals | Calendar |
|------|----------|-----------|----------|----------|
| `en` | English  | LTR       | Latin    | Gregorian |
| `fa` | فارسی    | **RTL**   | Persian (۰-۹) | Jalali (شمسی) |
| `fr` | Français | LTR       | Latin    | Gregorian |
| `es` | Español  | LTR       | Latin    | Gregorian |
| `de` | Deutsch  | LTR       | Latin    | Gregorian |

**Persian** uses Vazirmatn FD (loaded from jsdelivr CDN), full RTL layout including sidebar flip, and Persian/Arabic digits for all numeric strings. Dates render in the Jalali (Shamsi) calendar via a built-in Khayyam-style converter.

**Technical terms stay English in all languages** — Forehand, Backhand, Volley, Serve, Slice, Tactics Board, Smart Coaching Plan, ITN, Aces, Winners, Break points, Coach mode, Academy mode, Visa, Mastercard, Zarinpal. This matches how Persian and other-language coaches actually talk in the sport.

Switch language any time via the flag-dropdown in the topbar.

## Payment

Coach mode uses USD only (Visa-style flow).

**Academy /billing** has a region switch:
- **International** — Visa / Mastercard / Amex with card-on-file + new-card form.
- **Pay from Iran** — Zarinpal online gateway, or bank transfer (card-to-card / Sheba with copy-able account details + receipt upload). USD remains the displayed primary currency; an "≈ Toman equivalent" line shows the IRR figure using the fixed rate set in `src/lib/academy-data.ts → IRAN_PAYMENT.usdToToman`.

## Theme tokens

All from `src/app/globals.css` and `tailwind.config.ts`:

```
bg          #0A0D0A
surface2    #141A14
surface3    #1A211A
hairline    #1F2820
fg          #EAF0E6
fgDim       #9BA89B
accent      #A8D847   ← lime brand
accentDk    #8FBE2E
accentInk   #0E1A00
good        #A8D847   (skill ≥ 7)
med         #F2B544   (5 ≤ skill < 7)
weak        #E5685D   (skill < 5)
```

## Design source

The original design handoff (HTML/React-via-Babel prototype with 136 captured screens) lives outside this repo — it's the reference, not the source.

This project recreates the design as a production codebase using real modules, real i18n, real state — no Babel-in-browser, no `window.*` globals.

## Mobile / tablet

Not in this build. The handoff includes iOS, Android and tablet variants but the current scope is **web (desktop) only**, per the brief.

## Status

All web pages from the design handoff are built. Build is green across all 5 locales × all routes (143 static pages).
