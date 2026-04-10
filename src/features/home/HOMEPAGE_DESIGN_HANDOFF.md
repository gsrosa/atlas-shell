# Atlas AI — Homepage Design Handoff Spec
**Document type:** Design → Engineering Handoff
**Scope:** Full homepage `/` — all 7 sections
**Stack:** React 18 · Vite · TypeScript · Tailwind CSS v4 · `@gsrosa/atlas-ui`
**Status:** v1.0 — Ready for implementation

> This document is the single source of truth for layout, spacing, tokens, states, motion,
> and accessibility for the homepage redesign. Read the companion
> `HOMEPAGE_CONTENT_BRIEF.md` for the full copy strategy and voice rules.

---

## 1. Design Token Reference

All values below map directly to the Atlas UI design system (`atlas-ui-theme.css` / `globals.css`).
**Never use raw hex values in components.** Always reference tokens.

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--atlas-color-primary-500` | `#ff5722` | Primary CTA background, active indicators |
| `--atlas-color-primary-400` | `#ff8f73` | CTA hover state |
| `--atlas-color-primary-300` | `#ffb5a0` | Display headline accent, eyebrow accent |
| `--atlas-color-primary-600` | `#e64a19` | CTA pressed/active state |
| `--atlas-color-auxiliary-300` | `#7ee8fc` | Secondary CTA background, stat labels |
| `--atlas-color-auxiliary-400` | `#4dd4e8` | Section counter labels (`01 / The advantage`) |
| `--atlas-color-auxiliary-500` | `#26c6da` | Glow effects, pulse indicators |
| `--atlas-surface-background` | `#111317` | Page background, deepest layer |
| `--atlas-surface-muted` | `#1a1c20` | Section alternating backgrounds |
| `--atlas-surface-container` | `#1e2024` | Card backgrounds |
| `--atlas-surface-container-high` | `#282a2e` | Card hover backgrounds |
| `--atlas-surface-border` | `#414754` | Card borders, dividers |
| `--atlas-surface-foreground` | `#f1f2f6` | Primary text (headlines, body) |
| `--atlas-surface-muted-foreground` | `#9295aa` | Secondary text, captions, placeholders |
| `glass-panel-home` *(class)* | `rgba(17,19,23,0.72)` + blur | Floating glass panels, search input |

### Typography Tokens

| Token | Family | Usage |
|---|---|---|
| `--atlas-font-display` | `Noto Serif` | All H1, H2, section headlines (always italic for emotional weight) |
| `--atlas-font-sans` | `Manrope` | Body, labels, CTAs, eyebrows, captions |
| `--atlas-font-mono` | `JetBrains Mono` | Technical labels, code-like indicators only |

### Typography Scale

| Level | Font | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| Display H1 | Noto Serif italic | `3.25rem` (52px) | `2rem` (32px) | 700 | 1.08 | `-0.02em` |
| Section H2 | Noto Serif italic | `2.75rem` (44px) | `1.5rem` (24px) | 700 | 1.12 | `-0.02em` |
| Card H3 | Noto Serif | `1.5rem` (24px) | `1.125rem` (18px) | 600 | 1.3 | `0` |
| Body Large | Manrope | `1.125rem` (18px) | `1rem` (16px) | 300 | 1.7 | `0` |
| Body | Manrope | `1rem` (16px) | `0.9375rem` (15px) | 400 | 1.65 | `0` |
| Body Small | Manrope | `0.875rem` (14px) | `0.875rem` (14px) | 400 | 1.6 | `0` |
| Eyebrow | Manrope | `0.625rem` (10px) | `0.625rem` (10px) | 700 | 1 | `0.35em` |
| Caption / Label | Manrope | `0.75rem` (12px) | `0.75rem` (12px) | 400 | 1.4 | `0.2em` |

### Spacing System

Uses Tailwind v4 spacing scale. Reference class names, not raw pixel values.

| Token | Value | Common usage |
|---|---|---|
| `spacing-1` | 4px | Icon gap, tight inline elements |
| `spacing-2` | 8px | Inner padding small |
| `spacing-3` | 12px | Gap between label + title |
| `spacing-4` | 16px | Default gap, card inner padding sm |
| `spacing-5` | 20px | CTA padding horizontal |
| `spacing-6` | 24px | Card padding, section content gaps |
| `spacing-8` | 32px | Between content blocks |
| `spacing-10` | 40px | Section padding horizontal (tablet) |
| `spacing-12` | 48px | Section vertical padding (mobile) |
| `spacing-16` | 64px | Section vertical padding (tablet) |
| `spacing-20` | 80px | Section horizontal padding (desktop) |
| `spacing-24` | 96px | Section vertical padding (desktop) |
| `spacing-28` | 112px | Hero top padding |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--atlas-radius-sm` | 4px | Small badges, tight chips |
| `--atlas-radius-md` | 6px | Inputs, small buttons |
| `--atlas-radius-lg` | 8px | Cards, panels |
| `--atlas-radius-xl` | 12px | Large panels, modals |
| `rounded-full` | 9999px | Pill buttons, circular indicators |
| `rounded-3xl` | 24px | Precision demo panel, large image containers |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `--atlas-shadow-sm` | `0px 1px 2px rgba(0,0,0,0.4)` | Subtle card lift |
| `--atlas-shadow-md` | `0px 2px 6px rgba(0,0,0,0.5), 0px 4px 16px rgba(0,0,0,0.3)` | Card hover |
| `--atlas-shadow-lg` | `0px 4px 24px rgba(0,0,0,0.5), 0px 8px 40px rgba(0,0,0,0.4)` | Floating panels |
| `--atlas-shadow-xl` | `0 20px 40px rgba(0,0,0,0.4)` | Precision demo, modals |
| Hero search pill | `0 20px 50px rgba(0,0,0,0.45)` | Custom — search input only |
| Plan button glow | `0 4px 28px rgba(0,227,253,0.25)` | Auxiliary CTA only |

---

## 2. Global Layout Rules

### Content Container

```css
max-width: 1200px;
margin-inline: auto;
padding-inline: 1rem;           /* mobile: 16px */
padding-inline: 1.25rem;        /* sm: 20px */
padding-inline: 2.5rem;         /* md: 40px */
```

### Breakpoints

| Name | Min-width | Layout behaviour |
|---|---|---|
| default | 0 | Single column, stacked |
| `sm` | 640px | Minor adjustments, 2-col grids appear |
| `md` | 768px | Tablet layout, increased padding |
| `lg` | 1024px | Desktop layout, side-by-side enabled |
| `xl` | 1280px | Content max-width reached |

### Section Vertical Rhythm

| Viewport | Padding top | Padding bottom |
|---|---|---|
| Mobile | `3rem` (48px) | `3rem` (48px) |
| Tablet `md` | `4rem` (64px) | `5rem` (80px) |
| Desktop `lg` | `5.5rem` (88px) | `6rem` (96px) |

> **Rule:** Sections must breathe. Never collapse section padding to accommodate content.
> Cut content before you cut whitespace.

### Section Background Alternation

| Section | Background token |
|---|---|
| Hero | `--atlas-surface-background` + hero image overlay |
| Features | `--atlas-surface-background` (`neutral-50` Tailwind = `#111317`) |
| How It Works | `--atlas-surface-muted` (`#1a1c20`) — slight elevation |
| Precision | `--atlas-surface-background` |
| Destinations | `--atlas-surface-muted` |
| Social Proof | `--atlas-surface-container` (`#1e2024`) — warmest dark layer |
| Final CTA | Full-bleed image + `--atlas-surface-background`/80 overlay |

> The alternation creates visual breathing room without introducing colour noise.
> All backgrounds stay within the dark palette — no light sections on this page.

---

## 3. Section Specs

---

### SECTION 01 — HERO

#### Overview
Full-viewport entry point. The user's first impression. Must deliver brand clarity, emotional hook, and a frictionless first action within 3 seconds of load. Two-column on desktop (copy left / AI chat demo right), single column on mobile.

#### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [BACKGROUND IMAGE]  brightness: 0.42  scale: 1.05         │
│  [OVERLAY 1]  #111317 / 35%                                 │
│  [OVERLAY 2]  gradient bottom 55% → #111317/80              │
│                                                             │
│  ┌─── Content max-w-[1200px] ──────────────────────────┐   │
│  │  [LEFT COL — flex-1]     [RIGHT COL — w-[440px]]    │   │
│  │  Eyebrow                  AiChatDemo (lg+ only)     │   │
│  │  H1                                                 │   │
│  │  Subheadline                                        │   │
│  │  Search pill input                                  │   │
│  │  CTA group                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [SCROLL INDICATOR]  bottom-6, center, opacity-50          │
└─────────────────────────────────────────────────────────────┘
```

**Min-height:** `min(100dvh, 920px)` — fills viewport but caps at 920px on tall screens.

**Top padding:** `pt-24` (96px) mobile → `pt-28` (112px) sm → `pt-32` (128px) md
**Bottom padding:** `pb-14` (56px) mobile → `pb-16` (64px) sm → `pb-20` (80px) md

#### Content — Updated From Brief

| Element | Copy | Notes |
|---|---|---|
| **Eyebrow** | `Solo travel, reimagined.` | Replaces "Neural wayfinding engine" |
| **H1** | `Trip planning that thinks` / `the way you travel.` | Break after "thinks" on sm+ |
| **H1 accent span** | `the way you travel.` | `text-primary-300` (`#ffb5a0`), `not-italic` |
| **Subheadline** | `Tell Atlas where you want to go. It builds a full itinerary around your style, your pace, and what you actually care about — not a one-size template.` | max-w-[480px] |
| **Search placeholder** | `Where are you headed?` | Replaces "Where does your intuition take you?" |
| **Search CTA** | `Start planning` | Replaces "Initialize trip" |
| **Secondary CTA** | `See how it works ↓` | anchor → `#how-it-works` |
| **Trust line** | `1,200+ solo travelers · 47 countries · Free beta access` | Below CTAs |

#### Design Tokens Used

| Element | Token |
|---|---|
| Eyebrow text | `text-primary-400` → `#ff8f73` |
| H1 main | `text-white` |
| H1 accent span | `text-primary-300` → `#ffb5a0` |
| Subheadline | `text-neutral-600` → `--atlas-surface-muted-foreground` → `#9295aa` |
| Search border | `border-white/10` |
| Search icon | `text-neutral-500` |
| Search input text | `text-neutral-700` → `#e2e2e8` |
| Search placeholder | `text-neutral-500` → `#9295aa` |
| Primary search CTA bg | `bg-primary-500` → `#ff5722` |
| Primary search CTA text | `text-white` |
| Secondary CTA bg | `bg-auxiliary-500` → `#26c6da` |
| Secondary CTA text | `text-[#00363d]` (dark teal) |
| Ghost CTA | `border-white/20 bg-white/10 text-white` |
| Trust line | `text-neutral-500` → `#9295aa` |

#### Component: Search Pill Input

```
┌─────────────────────────────────────────────────────────────┐
│  [✦ icon]  [text input — flex-1]        [Start planning]   │
└─────────────────────────────────────────────────────────────┘
```

- Container: `glass-panel-home` + `rounded-full` + `border border-white/10` + `p-1.5`
- Shadow: `0 20px 50px rgba(0,0,0,0.45)`
- Icon: Sparkles 22px, `text-neutral-500`, `strokeWidth=1.5`
- Input: `px-2 py-3.5 text-[15px]`, no border, no ring, transparent bg
- CTA button: `rounded-full bg-primary-500 px-5 py-3.5 text-[13px] font-bold` / sm: `px-8 text-sm`

#### States: Search Input

| State | Visual |
|---|---|
| Default | Placeholder `#9295aa`, icon `#9295aa` |
| Focus | No ring on input itself. Container may add `ring-1 ring-primary-500/30` |
| Typing | Placeholder disappears. Text `#e2e2e8` |
| Submit (Enter or button) | Triggers auth check → navigate to `/assistant` |
| Unauthenticated submit | Opens login modal (no visual change on search) |

#### States: CTAs

| Button | Default | Hover | Active | Loading |
|---|---|---|---|---|
| "Start planning" (search) | `bg-primary-500` | `bg-primary-400` | `bg-primary-600` scale-[0.98] | "Planning…" + spinner |
| "See how it works" (secondary) | `bg-auxiliary-500` | `bg-auxiliary-400` brightness +5% | `bg-auxiliary-500` scale-[0.98] | — |
| Ghost "How it works ↓" | `bg-white/10 border-white/20` | `bg-white/15` | `bg-white/20` | — |

#### AiChatDemo (Desktop Only — `lg:block hidden`)

- Width: `440px` fixed, `shrink-0`
- The demo panel uses `glass-panel-home`
- Animation: starts on component mount (not on scroll), character-by-character typing
- See `ai-chat-demo.tsx` for full animation logic — do not change the animation timing

#### Scroll Indicator

- Position: `absolute bottom-6 left-1/2 -translate-x-1/2`
- Opacity: 50%, `pointer-events-none`
- Text: `"SCROLL"` — Manrope, 10px, `tracking-widest`, white
- Arrow: `↓`, `motion-safe:animate-bounce`
- **Hide on mobile** if the search pill is close to the bottom edge (< 120px clearance)

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile default | Single column, centered text. AiChatDemo hidden. H1 `text-[2rem]`. |
| `sm` 640px | H1 `text-4xl`. Line break `<br>` appears inside H1. |
| `md` 768px | H1 `text-5xl`. Top padding increases. |
| `lg` 1024px | Two columns. Text left-aligned. AiChatDemo appears. H1 `text-[3.25rem]`. |

#### Accessibility

- `<section aria-labelledby="hero-heading">`
- H1 has `id="hero-heading"`
- Search input has `<label htmlFor="hero-intent" className="sr-only">Describe your trip</label>`
- Background image: `alt=""` (decorative)
- Sparkles icon: `aria-hidden`
- Scroll indicator: `aria-hidden="true"` on the arrow glyph
- Skip link: `<Link to={ROUTES.ASSISTANT} className="sr-only">Skip to trip planner</Link>`
- Focus order: Search input → "Start planning" → "See how it works" → "How it works ↓"

---

### SECTION 02 — FEATURES

#### Overview
Proof section. 4 feature cards in a 2×2 grid. Goal: show what makes Atlas categorically different from generic trip planners. The section should feel editorial, not sales-y.

#### Layout

```
[EYEBROW + SECTION LABEL right-aligned desktop]
[H2 — max-w-2xl]
[SUBHEADLINE — max-w-md font-light]

[GRID 2×2 desktop / 1-col mobile]
  ┌──────────────┐  ┌──────────────┐
  │  [icon]      │  │  [icon]      │
  │  H3          │  │  H3          │
  │  Body        │  │  Body        │
  │  hover label │  │  hover label │
  └──────────────┘  └──────────────┘
  ┌──────────────┐  ┌──────────────┐
  │  [icon]      │  │  [icon]      │
  │  H3          │  │  H3          │
  │  Body        │  │  Body        │
  │  hover label │  │  hover label │
  └──────────────┘  └──────────────┘
```

#### Content — Updated From Brief

| Element | Copy |
|---|---|
| **Eyebrow left** | `Why it's different` |
| **Section counter right** | `01 / The advantage` |
| **H2** | `Built around how solo travelers actually travel.` |
| **Subheadline** | `We move beyond static lists to living plans. Atlas learns your pace, then adapts when the weather — or your curiosity — shifts.` |

**Feature Card Copy:**

| # | Title | Body |
|---|---|---|
| 1 | `Learns your travel style` | `Tell it once — your pace, budget, and what you care about. Atlas builds every plan around that, not a generic average.` |
| 2 | `Made for one` | `Solo-safe neighborhoods, single-room availability, and activities that work without a group. Built in, not bolted on.` |
| 3 | `Real places. No sponsored lists.` | `Trained on real traveler communities, not tourist boards or paid placements. Expect places you won't find in a magazine.` |
| 4 | `Plans that flex as you do` | `Change a day and everything adjusts. Your itinerary is a living document, not a PDF you'll ignore by day two.` |

#### Design Tokens Used

| Element | Token |
|---|---|
| Section background | `bg-neutral-50` → `--atlas-surface-background` (`#111317`) |
| Section counter | `text-auxiliary-400` → `#4dd4e8` |
| H2 | `text-neutral-700` → `#e2e2e8`, `font-display italic` |
| Subheadline | `text-neutral-600 font-light` → `#9295aa` |
| Card default bg | `bg-neutral-100` → `#1a1c20` |
| Card hover bg | `bg-neutral-200` → `#1e2024` |
| Card border default | `border-transparent` |
| Card border hover | `border-white/[0.06]` |
| Card icon | `text-primary-400` → `#ff8f73`, size 48×48px container |
| Card H3 | `text-neutral-700 font-display` → `#e2e2e8` |
| Card body | `text-neutral-600 font-sans text-sm` → `#9295aa` |
| Card hover label | `text-neutral-500 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100` |

#### Card States & Interactions

| State | Visual |
|---|---|
| Default | `bg-neutral-100 border-transparent shadow-none` |
| Hover | `bg-neutral-200 border-white/[0.06]` · "Atlas intelligence" label fades in |
| Active/press | `scale-[0.99]` |
| Focus (keyboard) | `ring-2 ring-primary-500/50 ring-offset-2 ring-offset-neutral-50` |

#### Card Grid

| Breakpoint | Columns | Gap |
|---|---|---|
| Mobile | 1 | `gap-4` (16px) |
| `sm` | 2 | `gap-4` (16px) |
| `md` | 2 | `gap-6` (24px) |

#### Animation

Cards use `FadeUp` component with staggered delay:
- Card 1: `delay=0ms`
- Card 2: `delay=80ms`
- Card 3: `delay=160ms`
- Card 4: `delay=240ms`

`FadeUp` behavior: `opacity:0; transform:translateY(28px)` → `opacity:1; transform:none` — `0.55s ease` on scroll-into-view.

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | 1-column grid. Section counter hidden. H2 `text-2xl`. |
| `sm` | 2-column grid starts. |
| `lg` | Header row becomes flex row with counter right-aligned. H2 `text-[2.75rem]`. |

#### Accessibility

- `<section aria-labelledby="features-heading">`
- Feature cards are `<article>` elements
- Icons: `aria-hidden`
- Hover "Atlas intelligence" label: `aria-hidden` (decorative)

---

### SECTION 03 — HOW IT WORKS

#### Overview
Clarity section. 3-step sequential explanation. Should feel lightweight and easy. No clutter, no CTAs.

#### Layout

```
[EYEBROW]
[H2]

[STEP 01] ── [STEP 02] ── [STEP 03]    ← desktop: horizontal with dashed connector
    ↓             ↓             ↓      ← mobile: vertical stack
```

**Section ID:** `id="how-it-works"` — anchor target from hero CTA.

#### Content — Updated From Brief

| Element | Copy |
|---|---|
| **Eyebrow** | `Getting started` |
| **H2** | `Three steps from idea to itinerary.` |

**Step Copy:**

| # | Number label | Icon | Title | Body |
|---|---|---|---|---|
| 1 | `01` | Map pin | `Tell Atlas what you want` | `Destination, dates, travel style. Rough ideas are fine — Atlas asks follow-up questions to fill in the gaps.` |
| 2 | `02` | Sparkles | `Get a full itinerary in seconds` | `Flights, accommodation, daily routes, and local picks — all connected and tailored to how you travel.` |
| 3 | `03` | Pen/Edit | `Adjust anything, anytime` | `Change one thing and Atlas reshuffles the rest. Your plan stays consistent even when your plans change.` |

#### Step Component Anatomy

```
┌──────────────────────────────┐
│  [Number — display, low-op]  │  font-display, text-[6rem], opacity-10
│                              │
│  [Icon — 24px]               │  text-auxiliary-400
│                              │
│  [Title — H3]                │  font-sans font-bold text-neutral-700
│                              │
│  [Body — p]                  │  font-sans text-sm text-neutral-600 font-light
│                              │
└──────────────────────────────┘
```

**Connector between steps (desktop):**
- A dashed horizontal line `border-t-2 border-dashed border-white/10`
- Appears between steps, vertically centered at icon level
- Hidden on mobile

#### Design Tokens Used

| Element | Token |
|---|---|
| Section background | `bg-neutral-100` → `--atlas-surface-muted` (`#1a1c20`) |
| Eyebrow | `text-auxiliary-400 tracking-widest uppercase text-xs` |
| H2 | `font-display italic text-neutral-700` |
| Step number | `font-display text-[6rem] opacity-10 text-white` (decorative bg) |
| Step icon | `text-auxiliary-400` (24px, strokeWidth 1.5) |
| Step H3 | `font-sans font-bold text-neutral-700 text-base` |
| Step body | `font-sans text-sm font-light text-neutral-600 leading-relaxed` |
| Connector line | `border-dashed border-white/10` |

#### Animation

Steps stagger on scroll-in via `FadeUp`:
- Step 1: `delay=0ms`
- Step 2: `delay=120ms`
- Step 3: `delay=240ms`

Connector line: draws from left to right using a CSS `width` transition triggered when section enters view. `transition: width 0.8s ease` from `width:0` to `100%`.

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | Vertical stack. Connector hidden. Step full-width. |
| `md` | Horizontal row. Connector visible. Equal column widths. |

#### Accessibility

- `<section id="how-it-works" aria-labelledby="how-it-works-heading">`
- Steps are `<ol>` with `<li>` items — they are sequential
- Step numbers are `aria-hidden` (decorative)

---

### SECTION 04 — PRECISION

#### Overview
Credibility section for the skeptic. Two-column: copy left, interactive demo right. Should feel technically substantial without being impenetrable.

#### Layout

```
Desktop:
┌─────────────────────────────┬─────────────────────────────┐
│  [order-2 lg:order-1]       │  [order-1 lg:order-2]       │
│  Eyebrow + Section counter  │  [Precision Demo Panel]     │
│  H2                         │   ┌─────────────────────┐   │
│  3× proof points (list)     │   │  [Map texture]      │   │
│                             │   │  "Planner active"   │   │
│                             │   │  [Confidence card]  │   │
│                             │   └─────────────────────┘   │
└─────────────────────────────┴─────────────────────────────┘

Mobile: Demo panel stacks on TOP of copy (order-1).
```

#### Content — Updated From Brief

| Element | Copy |
|---|---|
| **Eyebrow** | `Under the hood` |
| **Section counter** | `02 / Technical layer` |
| **H2** | `Planning intelligence,` / `not just planning.` |
| **Intro paragraph** | `Atlas doesn't match keywords to templates. It reasons through your trip — terrain, season, solo safety, and pacing — to build something that actually works on the ground.` |

**Proof Points:**

| Icon | Title | Body |
|---|---|---|
| `◇` | `Terrain-aware routing` | `Routes factor in elevation, trail conditions, and what's realistic for your timeline and fitness level.` |
| `◇` | `Solo-first safety context` | `Neighborhood safety scores, solo-friendly accommodation, and activities that don't require a partner. Always on.` |
| `◇` | `Live itinerary sync` | `Update one element — a flight, a hotel, an activity — and Atlas cascades the change through your whole trip.` |

#### Demo Panel Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  aspect-square (mobile) / aspect-[4/3] (lg)            │
│  bg-neutral-300  rounded-3xl  overflow-hidden           │
│  border border-white/[0.06]  shadow-xl                  │
│                                                         │
│  [MAP TEXTURE — opacity-45 mix-blend-screen grayscale]  │
│                                                         │
│  [Top-right] glass-panel-home  rounded-xl               │
│    ● green-400 animate-pulse  "PLANNER ACTIVE"          │
│                                                         │
│  [Bottom overlay] glass-panel-home  rounded-2xl  p-5    │
│    "Confidence"  HIGH  │  Route synthesis  [bar 72%]    │
└─────────────────────────────────────────────────────────┘
```

**Ambient glow behind demo panel:**
- `absolute -inset-8 rounded-full bg-auxiliary-500/10 blur-[80px] pointer-events-none`

#### Design Tokens Used

| Element | Token |
|---|---|
| Section background | `bg-neutral-50` → `#111317` |
| Section counter | `text-auxiliary-400 text-xs tracking-widest uppercase` |
| H2 | `font-display italic text-neutral-700` |
| Proof point icon ring | `border border-neutral-400 size-10 rounded-full` |
| `◇` icon | `text-auxiliary-400 text-lg font-bold` |
| Proof point title | `font-bold text-neutral-700 text-base` |
| Proof point body | `font-light text-neutral-600 text-sm leading-relaxed` |
| Demo panel bg | `bg-neutral-300` → `#282a2e` |
| Demo panel border | `border-white/[0.06]` |
| "Planner active" badge | `glass-panel-home border-white/10 rounded-xl` |
| Pulse indicator | `size-2 rounded-full bg-green-400 animate-pulse` |
| "Planner active" text | `text-neutral-700 text-[10px] tracking-widest uppercase` |
| Confidence label | `text-neutral-500 text-[10px] tracking-[0.2em] uppercase` |
| Confidence value | `font-display text-neutral-700 text-2xl` |
| Progress bar track | `bg-white/10 h-1.5 rounded-full` |
| Progress bar fill | `bg-primary-500 w-[72%]` |
| Vertical divider | `bg-white/10 w-px h-10 hidden sm:block` |
| Glow | `bg-auxiliary-500/10 blur-[80px]` |

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | Single column. Demo panel `aspect-square`. Demo stacks above copy. |
| `sm` | Demo panel inner divider becomes visible. |
| `lg` | Two columns, `gap-20`. Demo `aspect-[4/3]`. Copy → left, Demo → right. |

#### Accessibility

- `<section aria-labelledby="precision-heading">`
- `◇` icon containers: `aria-hidden="true"`
- Demo panel is `aria-hidden="true"` — it's a visual illustration, not functional
- "Planner active" badge: `aria-hidden="true"`
- `<ul>` with `list-none` for proof points (not semantically ordered)

---

### SECTION 05 — DESTINATIONS

#### Overview
Wanderlust section. Horizontal scroll carousel of 8 destination cards. Goal: create desire, demonstrate coverage depth, and provide quick entry points into the planner.

#### Layout

```
[EYEBROW]
[H2]

┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ···   ← horizontal scroll
│ Img  │ │ Img  │ │ Img  │ │ Img  │ │ Img  │
│      │ │      │ │      │ │      │ │      │
│ Dest │ │ Dest │ │ Dest │ │ Dest │ │ Dest │
│ Hook │ │ Hook │ │ Hook │ │ Hook │ │ Hook │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

**Scroll container:** `overflow-x-auto no-scrollbar destinations-horizontal-scroll`
- `touch-action: pan-x pan-y`
- `overscroll-behavior-x: contain`
- `-webkit-overflow-scrolling: touch`

#### Content — Updated From Brief

| # | Name | Country | Hook |
|---|---|---|---|
| 1 | Patagonia | Chile / Argentina | `"Where the wind writes your itinerary."` |
| 2 | Iceland | Iceland | `"Fire, ice, and shoulder-season silence."` |
| 3 | Azores | Portugal | `"Europe's volcanic secret. Still undiscovered."` |
| 4 | Scottish Highlands | Scotland | `"Solitude with scenery you can't fake."` |
| 5 | Norwegian Fjords | Norway | `"The world's best argument for slow travel."` |
| 6 | New Zealand South Island | New Zealand | `"Adventure that needs no filter."` |
| 7 | Costa Rica | Costa Rica | `"Dense jungle. Zero compromises on wildlife."` |
| 8 | Kyoto Backcountry | Japan | `"Japan without the queues."` |

#### Card Anatomy

```
┌──────────────────────────────────┐
│  [FULL-BLEED IMAGE]  aspect-[3/4]│
│                                  │
│  [gradient overlay]              │
│  linear-gradient(                │
│    to bottom,                    │
│    transparent 30%,              │
│    rgba(17,19,23,0.7) 70%,       │
│    rgba(17,19,23,0.95) 100%      │
│  )                               │
│                                  │
│  [CONTENT — absolute bottom-0]   │
│    [Badge tags]  rounded-sm      │
│    [Destination name]  H3        │
│    [Country label]  caption      │
│    [Hook line]  body-sm italic   │
│    [CTA "Plan this trip →"]      │  ← hover-reveal on desktop
└──────────────────────────────────┘
```

**Card dimensions:**
- Mobile: `w-[72vw]` min width, `max-w-[300px]`
- Desktop: `w-[320px]` fixed
- Aspect ratio: `aspect-[3/4]` (portrait)
- Border radius: `rounded-2xl`
- `shrink-0` (prevents flex shrink in scroll container)

#### Design Tokens Used

| Element | Token |
|---|---|
| Section background | `bg-neutral-100` → `#1a1c20` |
| Eyebrow | `text-auxiliary-400 uppercase tracking-widest text-xs` |
| H2 | `font-display italic text-neutral-700` |
| Card border | `border-white/[0.08]` |
| Card badge | `bg-white/10 text-neutral-600 text-[10px] rounded-sm px-2 py-0.5` |
| Destination name | `font-display font-bold text-white text-xl` |
| Country | `text-neutral-500 text-xs uppercase tracking-wide` |
| Hook line | `font-display italic text-neutral-600 text-sm` |
| CTA "Plan this trip" | `text-primary-300 text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100` |

#### Hover State (Desktop)

| State | Visual |
|---|---|
| Default | CTA hidden. Image at normal scale. |
| Hover | `scale-[1.02]` on image (inner `overflow-hidden` contains). CTA fades in. Gradient slightly deepens. |
| Active/press | `scale-[1.0]` |
| Focus (keyboard) | `ring-2 ring-primary-500/50` around card |

#### Scroll Controls

- **Scroll indicator:** A `→` arrow with `text-xs uppercase tracking-widest` at the right edge of the section header — indicates more cards
- On mobile: render 3.5 cards at viewport edge to communicate scroll affordance (last card partially visible)
- **No pagination dots** on desktop — the partial-visibility + scrollbar convention is sufficient

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | Cards: `w-[72vw]`. 3.5 cards visible. Horizontal scroll. |
| `sm` | Cards: `w-[300px]`. 4+ cards visible. |
| `lg` | Cards: `w-[320px]`. No grid layout — remains scroll carousel. |

#### Edge Cases

- **Missing image:** Show `bg-neutral-300` placeholder. Destination name still renders.
- **Long destination name (e.g. "New Zealand South Island"):** Title truncates at 2 lines with `line-clamp-2`
- **Long hook line:** Clamp at 2 lines with `line-clamp-2`

#### Accessibility

- Scroll container: `role="region" aria-label="Featured destinations"` + `tabindex="0"`
- Each card is a `<a>` anchor linking to `/assistant?destination=[slug]`
- `aria-label` on card link: `"Plan a trip to [destination name], [country]"`
- Image alt: `"[Destination name], [Country] — [brief scene]"`
- CTA "Plan this trip →": `aria-hidden="true"` (the parent `<a>` provides full accessible label)

---

### SECTION 06 — SOCIAL PROOF

#### Overview
Validation section. Stats, beta framing, and 2 testimonials. Converts the emotionally-convinced user by showing real human signals.

#### Layout

```
[BETA ANNOUNCEMENT BANNER]  — full-width, centered

[STATS ROW — 3 counters]
  [1,200+]     [47]           [4.2h]
  explorers    countries      saved/trip

[EYEBROW]
[H2]

[TESTIMONIALS — 2 col desktop / 1 col mobile]
  ┌─────────────────────┐  ┌─────────────────────┐
  │  "Quote text..."    │  │  "Quote text..."    │
  │  Name · City        │  │  Name · City        │
  └─────────────────────┘  └─────────────────────┘
```

#### Content — Updated From Brief

| Element | Copy |
|---|---|
| **Beta banner** | `Atlas is in beta. Join 1,200+ solo explorers already planning smarter — in 47 countries.` |
| **Eyebrow** | `Early access` |
| **H2** | `Trusted by travelers who plan differently.` |

**Stats:**

| Number | Suffix | Label |
|---|---|---|
| `1200` | `+` | `solo explorers` |
| `47` | `` | `countries planned` |
| `4.2` | `h` | `saved per trip` |

**Testimonials:**

| Quote | Name | City |
|---|---|---|
| `"I typed 'solo, Japan, 2 weeks, no tourist traps' and got the best itinerary I've ever used."` | Sofia M. | Berlin |
| `"It actually understands that solo travel is different — not just a group itinerary with one person removed."` | Tomás R. | São Paulo |

#### Design Tokens Used

| Element | Token |
|---|---|
| Section background | `bg-neutral-200` → `#1e2024` (slightly warmer) |
| Beta banner bg | `bg-primary-100/10` → subtle ember tint `border-primary-500/20` |
| Beta banner text | `text-neutral-600 text-sm` |
| Stat number | `font-display text-4xl md:text-5xl font-bold text-white` |
| Stat suffix | `text-primary-300` (same size, inline) |
| Stat label | `font-sans text-xs uppercase tracking-widest text-neutral-500` |
| H2 | `font-display italic text-neutral-700` |
| Testimonial card bg | `bg-neutral-100` → `#1a1c20` |
| Testimonial card border | `border-white/[0.06]` |
| Quote mark (decorative) | `font-display text-[8rem] leading-none text-primary-500 opacity-10` — absolute top-0 |
| Quote text | `font-display italic text-neutral-700 text-base md:text-lg leading-relaxed` |
| Name | `font-sans font-bold text-neutral-700 text-sm` |
| City | `font-sans text-neutral-500 text-xs` |

#### Animated Stats (`AnimatedCounter`)

| Prop | Value |
|---|---|
| `from` | `0` |
| `to` | The number value |
| Trigger | `useInView` — starts counting when section scrolls into viewport |
| Duration | `1800ms` |
| Easing | `easeOutCubic` |
| Decimal | `4.2h` → counts from `0.0h` to `4.2h` (1 decimal place) |

> **Critical:** Stats must be visible in their final state for users with `prefers-reduced-motion`. Do not animate them in those cases — render the final value directly.

#### Testimonial Cards

- No avatar images (authenticity > polish)
- No star ratings
- Decorative `"` quotation mark as large background element (absolute positioned, `aria-hidden`)
- Name + city on same line, separated by `·`
- Cards use `FadeUp` with `delay=80ms` stagger

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | Stats: 3-column, condensed. Testimonials: 1-column stack. |
| `md` | Testimonials: 2-column grid. Stat numbers larger. |

#### Accessibility

- Stats section: `<dl>` with `<dt>` (label) and `<dd>` (number) — semantically correct for named values
- Testimonials: `<blockquote>` with `<footer>` containing `<cite>` for name
- Decorative quote mark: `aria-hidden="true"`
- Animated counters: final values must be in DOM for screenreaders (the animation is visual only)

---

### SECTION 07 — FINAL CTA

#### Overview
Conversion climax. Full-height section. The user has seen everything. This is the moment of commitment. Single-minded focus: one message, one action.

#### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [BACKGROUND IMAGE — night landscape]  brightness-[0.35]    │
│  [OVERLAY]  #111317/70                                       │
│                                                             │
│       [H2 — large, centered]                                │
│       [Subheadline]                                         │
│       [PRIMARY CTA]  [SECONDARY CTA]                        │
│       [Trust line]                                          │
│                                                             │
└──────────────────────────────────────────────────────────────┘
```

**Min-height:** `min-h-[min(100dvh,860px)]`
**Layout:** Fully centered content (flex, items-center, justify-center, text-center)

#### Content — Updated From Brief

| Element | Copy |
|---|---|
| **H2** | `Your next trip starts with one message.` |
| **Subheadline** | `Describe where you want to go. Atlas handles the rest.` |
| **Primary CTA** | `Start planning free` |
| **Secondary CTA** | `See how it works` |
| **Trust line** | `Beta access · No credit card · Cancel anytime` |

#### Design Tokens Used

| Element | Token |
|---|---|
| Background overlay | `bg-[#111317]/70` |
| H2 | `font-display italic text-white text-3xl md:text-4xl lg:text-5xl` |
| Subheadline | `font-sans text-neutral-600 text-base md:text-lg font-light` |
| Primary CTA bg | `bg-primary-500` |
| Primary CTA text | `text-white font-bold` |
| Primary CTA shadow | `0 4px 32px rgba(255,87,34,0.4)` |
| Secondary CTA | `border border-white/20 bg-white/10 text-white` (ghost style) |
| Trust line | `text-neutral-500 text-xs tracking-wide` |

#### CTA Button Specs

**Primary "Start planning free":**
- Size: `px-8 py-4 text-base font-bold`
- Shape: `rounded-full`
- Shadow: `0 4px 32px rgba(255,87,34,0.4)` — ember glow
- Hover: `bg-primary-400` + glow intensifies `rgba(255,87,34,0.55)`
- Active: `bg-primary-600 scale-[0.98]`
- Loading: Label → `"Planning your trip…"` + spinner `animate-spin` icon left

**Secondary "See how it works":**
- Size: `px-6 py-4 text-sm font-semibold`
- Shape: `rounded-full`
- Style: Ghost — `border border-white/20 bg-white/10`
- Hover: `bg-white/15`
- Action: smooth scroll to `#how-it-works`

**CTA Group Layout:**
- Desktop: Row, `gap-3`, centered
- Mobile: Column stack, `gap-3`, full-width buttons

#### Trust Line

- Positioned directly below CTA group, `mt-5`
- Font: Manrope, 12px, `tracking-wide`
- Color: `text-neutral-500` (`#9295aa`)
- Each item separated by `·` with `mx-1.5` padding

#### Responsive Behaviour

| Breakpoint | Change |
|---|---|
| Mobile | CTAs stack vertically, full-width. H2 `text-3xl`. |
| `md` | CTAs side by side. H2 `text-4xl`. |
| `lg` | H2 `text-5xl`. |

#### Accessibility

- `<section aria-labelledby="final-cta-heading">`
- Primary CTA: when unauthenticated, button click opens auth modal. Announce via `aria-live` or focus trap on modal
- Background image: `alt=""`
- Trust line items: plain text, no special role needed

---

## 4. Global Component States

### Navigation Bar

The shell nav sits above the hero. It must:
- Be transparent (no background) on the hero section
- Transition to `glass-panel-home` when user scrolls past 80px
- Use `transition: background-color 0.3s ease, backdrop-filter 0.3s ease`

### Scroll-Reveal System

All `FadeUp` components follow this contract:

| CSS class | Initial | Final | Trigger |
|---|---|---|---|
| `.fade-up` | `opacity:0; transform:translateY(28px)` | — | — |
| `.fade-up.in-view` | — | `opacity:1; transform:none` | JS adds `.in-view` via `useInView` |

**Transition:** `0.55s ease` for both `opacity` and `transform`

**`prefers-reduced-motion`:** When active, `FadeUp` must skip the animation and render elements at full opacity with no transform. Detect with:
```ts
window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

### Auth Gating

CTAs that require auth (`goPlan()`) follow this flow:
1. User clicks CTA
2. If `isLoading`: do nothing (debounce)
3. If `!isAuthenticated`: call `openLogin()` — opens auth modal, preserves context
4. If `isAuthenticated`: navigate to `ROUTES.ASSISTANT`

No visual change on the button during auth check. The modal appearance is sufficient feedback.

---

## 5. Animation & Motion Spec

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| All `FadeUp` sections | Scroll into view | `opacity 0→1, translateY 28px→0` | `550ms` | `ease` |
| FadeUp stagger (cards) | Scroll into view | Each card delayed by `80ms` per index | `550ms` | `ease` |
| AI Chat Demo | Component mount | Typing character-by-character, then response fade | See `ai-chat-demo.tsx` | `ease` |
| Chat demo cursor | Continuous | `hp-blink` 1s infinite | `1000ms` | step |
| Chat demo reply | New message | `hp-fade-up` | `400ms` | `ease` |
| Chat dot bounce | Thinking state | `hp-bounce` 1s infinite | `1000ms` | ease |
| Animated counters | Section scroll-in | Count up from 0 | `1800ms` | `easeOutCubic` |
| Destination card hover | Mouse enter | `scale-[1.02]` on inner image | `200ms` | `ease` |
| CTA hover (all) | Mouse enter | Background color shift | `150ms` | `ease` |
| Nav transparency | Page scroll >80px | Background + backdrop-filter | `300ms` | `ease` |
| How it works connector | Section scroll-in | `width 0→100%` | `800ms` | `ease` |
| Precision glow | Continuous | Static — no animation | — | — |
| "Planner active" pulse | Continuous | `animate-pulse` on indicator dot | — | `ease-in-out` |
| Scroll indicator arrow | Continuous | `motion-safe:animate-bounce` | — | built-in |
| Primary CTA loading | Button click | Spinner `animate-spin` on icon | — | linear |

**Motion principles:**
1. `prefers-reduced-motion` must disable all non-essential animations (FadeUp, counters, connector draw, hover transforms)
2. Essential motion (loading spinner, pulse indicator) may remain active
3. No animation should delay content rendering — all `FadeUp` elements must be visible without JS (CSS fallback)

---

## 6. Image Handling

| Location | Treatment | Alt text |
|---|---|---|
| Hero background | Full-bleed, `object-cover`, `brightness-[0.42]`, `scale-105` | `""` (decorative) |
| Final CTA background | Full-bleed, `object-cover`, `brightness-[0.35]` | `""` (decorative) |
| Destination cards | Full-bleed, `object-cover`, gradient overlay | `"[Destination], [Country] — [scene]"` |
| Precision demo | `opacity-45 mix-blend-screen grayscale brightness-125` | `""` (decorative UI) |

**Performance:**
- All background images: `loading="lazy"` except hero (above fold → `loading="eager"`)
- Hero image: `fetchpriority="high"` to improve LCP
- Destination card images: `loading="lazy"` (below fold)
- All images: `decoding="async"`

**CLS prevention:**
- Hero section has explicit `min-h` — no layout shift on image load
- Destination cards have `aspect-[3/4]` container — reserves space before image loads
- Precision demo has `aspect-square` / `aspect-[4/3]` — reserves space

---

## 7. Accessibility Checklist

| Item | Requirement | Implementation |
|---|---|---|
| Heading hierarchy | H1 → H2 → H3, no skips | Hero H1 → Section H2 → Card H3 |
| Focus visible | All interactive elements have visible focus ring | `ring-2 ring-primary-500/50 ring-offset-2` |
| Contrast — body text | 4.5:1 minimum (WCAG AA) | `#9295aa` on `#111317` = 4.8:1 ✓ |
| Contrast — CTAs | 3:1 minimum (WCAG AA Large) | `#ffffff` on `#ff5722` = 3.4:1 ✓ |
| Contrast — text on images | Must verify per image | Gradient overlay ensures minimum |
| Touch targets | 44×44px minimum | CTA buttons min `py-3 px-5` → ~44px height |
| Reduced motion | Disable non-essential animations | Check `prefers-reduced-motion` in `FadeUp` and counters |
| Semantic HTML | Section → article → heading structure | As specified per section above |
| Skip link | Jump to main content | `<a href="#main-content" className="sr-only focus:not-sr-only">` |
| ARIA labels | All icon-only buttons labeled | Sparkles icon `aria-hidden`, button has text label |
| Live regions | Auth state changes | `aria-live="polite"` on auth feedback |
| Keyboard navigation | All interactive elements keyboard-accessible | No `tabindex > 0`, logical DOM order |

---

## 8. What Changes vs Current Implementation

| Element | Current | Updated |
|---|---|---|
| Hero eyebrow | "Neural wayfinding engine" | "Solo travel, reimagined." |
| Hero H1 | "Your journey, synthesized by AI." | "Trip planning that thinks the way you travel." |
| Hero H1 accent | "synthesized by AI." | "the way you travel." (not-italic, primary-300) |
| Search placeholder | "Where does your intuition take you?" | "Where are you headed?" |
| Search CTA | "Initialize trip" | "Start planning" |
| Secondary CTA | "Plan with chat" (cyan, icon) | "See how it works ↓" (ghost, anchor) |
| Features eyebrow | *(none)* | "Why it's different" |
| Features H2 | "Cognitive exploration, not just coordination." | "Built around how solo travelers actually travel." |
| Feature card titles | 4 existing titles | 4 updated titles (see Section 02) |
| How It Works eyebrow | *(none)* | "Getting started" |
| How It Works H2 | *(none explicit)* | "Three steps from idea to itinerary." |
| Step titles | 3 existing | 3 updated (see Section 03) |
| Precision eyebrow | "02 / Technical layer" | + new intro: "Under the hood" |
| Precision H2 | "Hyper-precision environment mapping" | "Planning intelligence, not just planning." |
| Precision intro | *(none)* | New paragraph added (see Section 04) |
| Destinations H2 | *(none)* | "Where solo travelers are going next." |
| Destination hooks | 8 existing | 8 refined (minor edits, see Section 05) |
| Social proof H2 | *(none)* | "Trusted by travelers who plan differently." |
| Testimonial 2 quote | "Finally something that understands…" | "It actually understands that solo travel is different…" |
| Final CTA H2 | "Redefine wandering." | "Your next trip starts with one message." |
| Final CTA sub | "Step into travel planning that respects both the machine and the explorer." | "Describe where you want to go. Atlas handles the rest." |
| Final CTA primary | "Initialize Atlas" | "Start planning free" |

---

*Design handoff authored for Atlas AI — v1.0*
*Cross-reference: `HOMEPAGE_CONTENT_BRIEF.md` for voice strategy and copy rationale*
*Tech stack reference: `atlas-shell/.claude/CLAUDE.md` · Token source: `atlas-ui/src/styles/globals.css`*
