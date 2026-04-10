# Atlas AI — Homepage Content Brief
**Document type:** UX Copy & Content Strategy
**Scope:** Full homepage (`/`)
**Audience:** UI/UX Designer + Frontend Engineer
**Status:** v1.0 — Ready for design execution

---

## 1. The Core Problem With the Current Copy

Before any redesign, the team needs to understand the root issue: **the current homepage speaks in two incompatible voices at once.**

On one side, it reaches for emotional, wanderlust-driven language ("Where does your intuition take you?", "Redefine wandering."). On the other, it leans into cold, techno-sci-fi jargon ("Neural wayfinding engine", "synthesized by AI", "Initialize trip", "Hyper-precision environment mapping").

These two registers cancel each other out. The user doesn't know if they've landed on a travel app or a developer tool. The result is a homepage that impresses neither audience.

**The fix is not to pick one extreme. It's to find the brand voice that lives between them.**

---

## 2. Brand Voice — The North Star

### What Atlas AI is

A trip planner built specifically for solo travelers. Not an AI gimmick. Not a generic itinerary generator with an AI badge. A product that genuinely understands the nuances of traveling alone — safety, flexibility, pace, authenticity.

### The voice in one sentence

> **"A brilliant, well-traveled friend who happens to use cutting-edge AI."**

This means:

- **Smart, not cold.** Atlas can speak about terrain routing and itinerary logic without sounding like a product manual.
- **Specific, not vague.** "Solo-safe neighborhoods and single-room availability" is better than "personalized travel experiences."
- **Confident, not arrogant.** The product is genuinely good. The copy doesn't need to shout.
- **Human, not robotic.** CTAs invite action. They don't issue commands.

### What the voice is NOT

| Avoid | Why |
|---|---|
| "Neural wayfinding engine" | Jargon. Users don't think in ML metaphors. |
| "Synthesized by AI" | Passive, cold, and opaque. |
| "Initialize trip" | Robotic command. This is a travel app, not a terminal. |
| "Cognitive exploration" | Overcomplicated. Sounds like a startup buzzword pitch. |
| "Hyper-precision environment mapping" | This is a UX label, not a headline. |
| "Redefine wandering" | Vague aspiration. Means nothing. Does no work. |

---

## 3. Tone System — Per Section

Each section of the homepage has a distinct emotional job. The tone must match.

| Section | Emotional Job | Tone |
|---|---|---|
| Hero | Create desire and clarity | Aspirational + Direct |
| Features | Build credibility | Confident + Specific |
| How It Works | Remove friction and anxiety | Simple + Reassuring |
| Precision | Earn trust from skeptics | Technical but Accessible |
| Destinations | Create wanderlust | Evocative + Editorial |
| Social Proof | Validate the decision | Warm + Credible |
| Final CTA | Remove the last barrier | Bold + Low-risk |

---

## 4. Typography Hierarchy Rules

These rules must be respected in every section. They define the visual reading order.

| Level | Role | Max Length | Notes |
|---|---|---|---|
| **Eyebrow / Label** | Orient the user, set context | 3–5 words | All caps, tracked, muted color |
| **H1 / Section Headline** | The single most important message | 6–10 words | Never more than 2 lines at any viewport |
| **Subheadline** | Expand on the headline, add specifics | 25–35 words | Should be skippable but rewarding |
| **Body / Feature copy** | Explain a specific benefit | 20–30 words | One idea per paragraph. No stacking. |
| **CTA** | Direct the user to act | 2–5 words | Always a verb phrase. |
| **Microcopy / Trust line** | Reduce final objections | 5–10 words | Small, under CTAs only |

**Rule: No headline should ever need a body copy to be understood.** Headlines are self-sufficient. Body copy is additive.

---

## 5. CTA Rules (Global)

These rules apply everywhere a button or link appears on the homepage.

1. **Always start with a verb.** "Start planning" not "Trip planning."
2. **Be specific about the outcome.** "Plan my trip" is better than "Get started."
3. **Primary CTAs** → lead to authentication / onboarding.
4. **Secondary CTAs** → scroll or navigate to How It Works.
5. **Never use:** Submit, Continue, OK, Learn More (alone), Go, Click here.
6. **Microcopy under CTAs** must address the top objection at that moment. In the hero, that's: commitment, cost, and account creation.

---

## 6. Section-by-Section Content Spec

---

### SECTION 1 — HERO

**Purpose:** Hook the right user in under 3 seconds and give them one clear action.

**The user arriving here is:**
Solo traveler who's frustrated with generic trip planners. They've tried Google, Tripadvisor, maybe ChatGPT for a trip. Something always felt off — too generic, too group-oriented, too much manual assembly. They're curious but skeptical.

**Their silent question:** "Is this actually different, or just another AI-wrapped travel site?"

**Content hierarchy:**

```
[EYEBROW]        Solo travel, reimagined.
[H1]             Trip planning that thinks the way you travel.
[SUBHEADLINE]    Tell Atlas where you want to go. It builds a full
                 itinerary around your style, your pace, and what you
                 actually care about — not a one-size template.
[SEARCH INPUT]   Where are you headed?
[CTA PRIMARY]    Start planning
[CTA SECONDARY]  See how it works
[TRUST LINE]     1,200+ solo travelers · 47 countries · Free beta access
```

**Designer rules for this section:**

- **H1 must be the largest element on the screen.** Nothing competes with it at first glance.
- **Search input** should sit between the subheadline and the CTAs — it's the *primary interaction point*, not the CTAs. The CTA is a fallback for users who won't type.
- **AI Chat Demo** (right side on desktop): Keep this. It's the most powerful proof element on the page. Animate it on load, not on scroll — it must be visible without any user action.
- **Background imagery:** A person alone in a vast landscape, shot from behind or wide — no faces, no crowds. Reinforces "solo" without illustrating it literally.
- **Trust line:** Should appear below the CTAs, not above them. It serves as an objection-remover after the CTA creates micro-anxiety.
- **No hero carousel / no autoplaying video.** Static hero with animated chat demo only.

**Alternatives considered:**

| Option | H1 | When to use |
|---|---|---|
| A *(Recommended)* | "Trip planning that thinks the way you travel." | Default — clear, benefit-forward, no jargon |
| B | "Plan alone. Travel smarter." | A/B test — tighter, leans into solo identity |
| C | "Your trip. Your pace. Built by AI." | If brand wants to lean into the AI badge |

---

### SECTION 2 — FEATURES

**Purpose:** Prove that Atlas is fundamentally different — not feature-equivalent to competitors, but category-different.

**Section header:**

```
[EYEBROW]    Why it's different
[HEADLINE]   Built around how solo travelers actually travel.
```

**Feature cards (4 total, horizontal grid on desktop, stacked on mobile):**

---

**Card 1 — Personalization**

```
[ICON]    Fingerprint or brain/spark hybrid
[TITLE]   Learns your travel style
[BODY]    Tell it once — your pace, budget, and what you care about.
          Atlas builds every plan around that, not a generic average.
```

---

**Card 2 — Solo-first**

```
[ICON]    Single figure / person silhouette
[TITLE]   Made for one
[BODY]    Solo-safe neighborhoods, single-room availability, and
          activities that work without a group. Built in, not bolted on.
```

---

**Card 3 — Authenticity**

```
[ICON]    No-ads / strike-through star
[TITLE]   Real places. No sponsored lists.
[BODY]    Trained on real traveler communities, not tourist boards or
          paid placements. Expect places you won't find in a magazine.
```

---

**Card 4 — Flexibility**

```
[ICON]    Sync / loop arrows
[TITLE]   Plans that flex as you do
[BODY]    Change a day and everything adjusts. Your itinerary is a
          living document, not a PDF you'll ignore by day two.
```

**Designer rules for this section:**

- **4-column grid on desktop.** 2-column on tablet. 1-column on mobile.
- Cards should have **equal visual weight** — no card is "featured." They are parallel.
- Icon style: Line icons, not filled. Color: accent/primary. Size: 24–28px.
- **No card should have a CTA.** Features are not upsell moments — they are proof points. Keep them clean.
- Section background: Slight contrast shift from hero (dark tonal shift, or subtle texture). This visually separates sections without jarring transitions.
- **Card title: max 5 words.** Body: max 30 words. If it doesn't fit, cut the copy — never scale down the font.

---

### SECTION 3 — HOW IT WORKS

**Purpose:** Show that getting started is easy. Remove the "this sounds complicated" barrier.

**Section header:**

```
[EYEBROW]    Getting started
[HEADLINE]   Three steps from idea to itinerary.
```

**Steps:**

---

**Step 01**

```
[NUMBER]    01
[ICON]      Map pin / location
[TITLE]     Tell Atlas what you want
[BODY]      Destination, dates, travel style. Rough ideas are fine —
            Atlas asks follow-up questions to fill in the gaps.
```

---

**Step 02**

```
[NUMBER]    02
[ICON]      Sparkles / AI
[TITLE]     Get a full itinerary in seconds
[BODY]      Flights, accommodation, daily routes, and local picks —
            all connected and tailored to how you travel.
```

---

**Step 03**

```
[NUMBER]    03
[ICON]      Edit / pen
[TITLE]     Adjust anything, anytime
[BODY]      Change one thing and Atlas reshuffles the rest. Your plan
            stays consistent even when your plans change.
```

**Designer rules for this section:**

- **Horizontal stepper on desktop.** Vertical on mobile.
- Steps connected by a **dashed line or subtle path** — visual metaphor of a journey. Not a generic progress bar.
- Step numbers should be **large and decorative** (display font, low opacity as background element). The number is art, not UI chrome.
- **No CTAs inside this section.** The how-it-works section should feel explanatory and calm. CTAs would make it feel pushy.
- Add a **subtle animation on scroll**: each step fades-up and the connector line draws itself between steps. This reinforces the sequential narrative.
- **Tone reminder for this section:** Reassuring. The user may feel overwhelmed. Words like "rough ideas are fine" and "in seconds" actively lower the psychological barrier to starting.

---

### SECTION 4 — PRECISION

**Purpose:** Address the skeptic. Earn the trust of users who think "all AI planners are the same."

**Section header:**

```
[EYEBROW]    Under the hood
[HEADLINE]   Planning intelligence, not just planning.
[SUBHEADLINE] Atlas doesn't match keywords to templates. It reasons
              through your trip — terrain, season, solo safety, and
              pacing — and builds something that works on the ground.
```

**Three technical proof points (left column):**

---

**Point 1**

```
[TITLE]    Terrain-aware routing
[BODY]     Routes factor in elevation, trail conditions, and what's
           realistic for your timeline and fitness level.
```

---

**Point 2**

```
[TITLE]    Solo-first safety context
[BODY]     Neighborhood safety scores, solo-friendly accommodation,
           and activities that don't require a partner. Always on.
```

---

**Point 3**

```
[TITLE]    Live itinerary sync
[BODY]     Update one element — a flight, a hotel, an activity — and
           Atlas cascades the change through your whole trip.
```

**Designer rules for this section:**

- **Two-column layout on desktop:** copy on the left, interactive map/planner demo on the right.
- The demo panel (right) should show the **"Planner active" state** — a visual proof that the system is doing real work. Not just a screenshot. Keep the animated indicator.
- Left column proof points: **no icons needed here.** These are technical claims. Let the copy do the work. Bullet or numbered list format feels clinical — prefer a stacked card or definition-list style instead.
- This section should feel slightly **more dense** than the previous sections. The user has now passed the emotional hook — they're in consideration mode. Information density is appropriate here.
- Background: Can introduce a dark map texture or topo-line pattern — reinforces "terrain-aware" without illustrating it literally.

---

### SECTION 5 — DESTINATIONS

**Purpose:** Create wanderlust and demonstrate coverage. Show the product knows *good* destinations.

**Section header:**

```
[EYEBROW]    Explore
[HEADLINE]   Where solo travelers are going next.
```

**Destination cards (horizontal scroll carousel, 8 total):**

| Destination | Country | Hook | Tag |
|---|---|---|---|
| Patagonia | Chile / Argentina | "Where the wind writes your itinerary." | Remote · Trekking |
| Iceland | Iceland | "Fire, ice, and shoulder-season silence." | Adventure · Low crowds |
| Azores | Portugal | "Europe's volcanic secret. Still undiscovered." | Island · Authentic |
| Scottish Highlands | Scotland | "Solitude with scenery you can't fake." | Nature · Slow travel |
| Norwegian Fjords | Norway | "The world's best argument for slow travel." | Fjords · Scenic |
| New Zealand South Island | New Zealand | "Adventure that needs no filter." | Outdoors · Epic |
| Costa Rica | Costa Rica | "Dense jungle. Zero compromises on wildlife." | Nature · Biodiversity |
| Kyoto Backcountry | Japan | "Japan without the queues." | Culture · Off-grid |

**Designer rules for this section:**

- **Horizontal scroll carousel** with drag/swipe support (mobile-native feel on desktop too).
- Each card: **full-bleed photography, destination name, country, hook line, and 2 badge tags.**
- **Hook lines are the most important copy element on each card.** They must be written as editorial, not marketing. Think Monocle or Kinfolk — not Booking.com.
- Typography on cards: **White on image, with a dark gradient overlay at the bottom third** to ensure legibility at all times. Never transparent text on an unpredictable photo.
- CTA on each card: **"Plan this trip →"** — simple, direct, verb-first. On hover (desktop) or tap (mobile), this appears. Not always visible — avoids visual clutter.
- The "Plan this trip →" link routes to the AI assistant with the destination pre-filled.
- **No star ratings. No price indicators. No "popular" badges.** This is a curated, editorial experience — not a marketplace.
- Add a **faint scroll indicator** (arrow or dots) so mobile users know the list continues.

---

### SECTION 6 — SOCIAL PROOF

**Purpose:** Validate the decision. Show that real people have already trusted this product and gained from it.

**Beta announcement banner:**

```
[COPY]    Atlas is in beta. Join 1,200+ solo explorers already planning
          smarter — in 47 countries.
```

**Stats (3 counters, animated on scroll-in):**

```
[STAT 1]    1,200+     solo explorers
[STAT 2]    47         countries planned
[STAT 3]    4.2h       saved per trip on average
```

**Section header:**

```
[EYEBROW]    Early access
[HEADLINE]   Trusted by travelers who plan differently.
```

**Testimonials (2):**

---

**Testimonial 1**

```
[QUOTE]     "I typed 'solo, Japan, 2 weeks, no tourist traps' and got
             the best itinerary I've ever used."
[NAME]      Sofia M.
[LOCATION]  Berlin
```

---

**Testimonial 2**

```
[QUOTE]     "It actually understands that solo travel is different —
             not just a group itinerary with one person removed."
[NAME]      Tomás R.
[LOCATION]  São Paulo
```

**Designer rules for this section:**

- **Stats must animate** on scroll-into-view (count up from 0). This draws attention and makes the numbers feel alive. See `animated-counter.tsx` — already built.
- **Testimonial cards:** Photo-less by default (no fake avatars). Name and city only. Authenticity > decoration.
- Quote punctuation: Use **large typographic quotation marks** as a decorative element (display font, low opacity). This signals "testimonial" without a box or card border.
- **Framing note for designers:** "1,200 users" is a small number in the context of a mature product. Frame it as **exclusivity and early-adopter identity**, not scale. The word "explorers" (not "users") and "already planning smarter" reinforces this.
- Section background: Warmer — slight temperature shift from the cold/dark sections above. This builds warmth before the final CTA.

---

### SECTION 7 — FINAL CTA

**Purpose:** Convert the now-convinced user. Remove the last micro-barrier (cost, commitment) and make the first action feel completely low-risk.

**Content:**

```
[HEADLINE]       Your next trip starts with one message.
[SUBHEADLINE]    Describe where you want to go. Atlas handles the rest.
[CTA PRIMARY]    Start planning free
[CTA SECONDARY]  See how it works
[TRUST LINE]     Beta access · No credit card · Cancel anytime
```

**Designer rules for this section:**

- **Full-width, full-height section (100vh or close).** This is the climax of the page. It deserves space.
- Background: Night landscape imagery — wide, stars visible, single figure silhouette optional. Reinforces the emotional "this is the beginning of something" feeling.
- **H1 should be large** — close to hero headline size. This section is not a footer; it's a second peak.
- **Primary CTA button:** Most prominent version of the button in the design system. Large, high contrast, centered.
- **Secondary CTA:** Ghost/outline style. Equal horizontal position to primary (side by side on desktop, stacked on mobile).
- **Trust line:** Small text, centered, beneath the CTA pair. Muted color. This is the whisper that removes the last objection.
- **No navigation links. No distractions.** This section should feel like the only option is to act or scroll back up.

---

## 7. Global UI States & Microcopy

### Loading States

When Atlas generates a plan (visible in chat demo and planner):

```
"Atlas is thinking..."        ← Initial state (0–2s)
"Building your itinerary..."  ← Mid-state (2–5s)
"Almost there..."             ← Long wait (5s+)
```

**Rule:** Never show a generic spinner with no copy. Loading states must set expectations.

### Empty States

Search with no results:
```
[HEADLINE]    No trips found for that yet.
[BODY]        Try a different destination or describe what you're
              looking for — Atlas works better with natural language.
[CTA]         Describe your ideal trip instead →
```

### Error States

Connection/generation error:
```
[HEADLINE]    Something went wrong.
[BODY]        We couldn't generate your itinerary. Your request was
              saved — try again in a moment.
[CTA]         Try again
```

### Form / Input Validation

Search input — empty submission:
```
Hint text (inline, not modal): "Tell us where you're headed first."
```

### Button States

| State | Primary CTA text |
|---|---|
| Default | "Start planning" |
| Hover | *(same — no text change, only visual state)* |
| Loading | "Planning your trip…" |
| Success | "Your trip is ready →" |
| Error | "Try again" |

**Rule:** Button text must change on loading. A spinning indicator alone is insufficient — the label must confirm what's happening.

---

## 8. Accessibility Copy Rules

1. **All images require descriptive alt text.** Background/decorative images get `alt=""`. Destination cards get `alt="[Destination name], [Country] — [brief scene description]"`.
2. **CTA buttons need descriptive labels** — never just an icon. If icon-only, add `aria-label="Start planning your trip"`.
3. **Animated elements** (chat demo, counters) must respect `prefers-reduced-motion`. Provide static fallback states.
4. **Search input** must have a visible label (not just placeholder text). Placeholder disappears on focus. A visible label above or screenreader-only label must always be present.
5. **Color contrast:** All body copy must meet WCAG AA (4.5:1 minimum). CTAs must meet AA Large (3:1 minimum). Check all text-on-image combinations — the gradient overlay on destination cards is critical.

---

## 9. Localization Notes

For future internationalization:

- **"solo travelers"** — translates well in most markets. Avoid "solo backpacker" (implies budget) or "independent traveler" (implies business).
- **"Beta access"** — keep in English across markets. It's a widely understood technical term.
- **Stats:** Format numbers according to locale (`1.200` in German/Portuguese vs `1,200` in English). Design the stat components to handle this.
- **Destination hooks** are written as editorial English — they will need transcreation (not translation) for other languages.
- **CTA copy** should be localized idiomatically, not literally. "Start planning" in Portuguese should be "Comece a planejar" not a direct word-for-word translation.
- **Leave 30% extra space** in all copy containers for languages that expand significantly (German, Finnish, Portuguese BR tend to run longer than English).

---

## 10. What the Current Copy Gets Right (Keep These)

Before revising, preserve what already works:

1. **Solo travel positioning** is strong and differentiated. Don't dilute it.
2. **AI chat demo** in the hero is the best proof element on the page. Keep it prominent and animated.
3. **Destination selection** is editorially excellent — remote, authentic, curated. The hook-line format is right; only minor copy refinements needed.
4. **Testimonial voices** are authentic and specific. Tomás and Sofia read like real people. Don't make them more polished — that would make them less credible.
5. **3-step How It Works** is the right length. Resist the urge to add a fourth step.
6. **Beta framing** is smart — it creates exclusivity and manages expectations. Keep it, but lean into "early explorer" identity rather than implying the product is unfinished.

---

## 11. What to Remove Entirely

| Current element | Why it should go |
|---|---|
| "Neural wayfinding engine" eyebrow | Jargon that alienates non-technical users |
| "Your journey, synthesized by AI" | Passive. "Synthesized" is not a benefit. |
| "Initialize trip" CTA | Robotic command — not an invitation |
| "Cognitive exploration, not just coordination" | Feature section headline is completely opaque |
| "Hyper-precision environment mapping" | Sounds like a GIS software pitch |
| "Redefine wandering" | Meaningless aspiration. Does no persuasive work. |
| "Where does your intuition take you?" | Romantic, but ambiguous as a search placeholder |
| "Step into travel planning that respects both the machine and the explorer." | Trying to be poetic but is confusing. What does "respect the machine" mean to a traveler? |

---

*Content brief authored for Atlas AI — v1.0*
*For design questions, cross-reference: `.claude/context/architecture.md` and `.claude/context/conventions.md`*
