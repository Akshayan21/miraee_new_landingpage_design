# V0 Homepage — Content Reference

Verbatim extraction of every section of the V0 production homepage, mapped to its destination in the new site structure.

**Source:** `Miraee_landing_page/src/pages/Home.tsx` (1475 lines), from `Miraee-ai/Miraee_landing_page-` branch `prod`, commit `c1391ab`.

**Why this doc exists:** V0's copy is interleaved with framer-motion scroll math, and the `Miraee_landing_page/` folder is gitignored and no longer has a `.git` directory. That folder is not recoverable from this repo. If it is deleted, re-clone with:

```bash
git clone -b prod https://github.com/Miraee-ai/Miraee_landing_page-.git
```

Everything below is quoted exactly as written in V0, typos and inconsistent casing included. See [Carry-over notes](#carry-over-notes) for what should be fixed rather than copied.

---

## Section index

Render order per `Home.tsx:1451-1474`. Destination column maps to the *Part 1 — Page Structure* doc.

| # | V0 section | Lines | Destination | Note from structure doc |
|---|---|---|---|---|
| 1 | IntroCover | 256–335 | — | not carried |
| 2 | Hero | 337–448 | Homepage → Hero | — |
| 3 | StatStrip | 450–476 | Homepage → Platform section | "2M+ from V0, all data points" |
| 4 | Timeline / ZTunnel | 494–607 | AI & Technology | era framing for AI vs agentic |
| 5 | Problem | 610–682 | Platform → "Less work, better journeys" | reduced content |
| 6 | Solution | 685–843 | Platform → six-capabilities intro | — |
| 7 | Kinetic band #1 | 1464 | Platform | — |
| 8 | Capabilities (`CAPS` ×6) | 846–980 | Platform → "One platform for the whole journey" | **the six capabilities** |
| 9 | Roles / Experiences | 983–1108 | Homepage → Experiences tab | "Business travel, meets the trip people love" |
| 10 | How it works (`STEPS` ×4) | 1111–1222 | Homepage → How it works | "V0 version: Plan, Book, Expense, Change" |
| 11 | Kinetic band #2 | 1468 | Homepage | "Loved by Employees. Trusted by Finance" |
| 12 | Comparison | 1225–1261 | Homepage → same section | minimal text |
| 13 | Security / suppliers | 1264–1327 | Solutions or Company | — |
| 14 | CTA | 1329–1370 | all pages | — |
| 15 | Footer | 1372–1438 | Footer | — |

---

## 1. IntroCover — `256-335`

Full-screen gradient cover, white wordmark, one-shot circle reveal. Gated by `sessionStorage` key `miraee-intro-done`.

- **Tagline:** The AI-native employee travel platform.
- **Scroll hint:** scroll to enter

No images, no CTAs. Not carried to the new site.

---

## 2. Hero — `337-448`

Pinned 220vh scrollytelling scene.

- **Eyebrow:** A personal AI agent for every employee.
- **Headline (2 lines):** `AI-native employee` / `travel Platform` — second line orange
- **Subheadline:** One intelligent platform for booking, travel management, and expenses. Miraee is built for business travel, and the personal trips people love.

**Corner HUD** (desktop only, ≥640px):

| Position | Text |
|---|---|
| bottom-left | Built by Tabhi |
| bottom-right | Wholesale savings 20–30% |

**Mobile proof line** (<640px): Built by Tabhi · 2M+ properties

**CTAs:**

| Label | href |
|---|---|
| Book a demo | `/book-a-demo` |
| See how it works | **none** — see carry-over notes |

No image assets.

---

## 3. StatStrip — `450-476`

Infinite marquee on maroon, skewed by scroll velocity. Array duplicated 2× for the loop. **This is the "2M+ from V0, all data points" set.**

| val | label |
|---|---|
| `2M+` | Properties |
| `500+` | Airlines |
| `200+` | AI agents |
| `125M+` | Travelers reached |
| `20–30%` | Wholesale savings |
| `24/7` | Human support |
| `100%` | Agent-managed |
| `1` | Platform |

No eyebrow, no headline.

---

## 4. Timeline / ZTunnel — `494-607`

Sticky 820vh, four full-bleed era panels. No `SectionLabel` — each panel's `era` string is its own eyebrow. Headline renders as `a` + `b`, with `b` in orange. Stepper shows `01 02 03 04`. Image `alt` = `era + " " + a + " " + b`.

| era | headline (`a` / `b`) | desc | img | pos |
|---|---|---|---|---|
| `1990s` | phone calls and / **paper tickets.** | Business travel was manual, time-consuming, and full of friction. It took hours to plan a single trip. | `timeline-1990s.webp` | center |
| `2000s` | Call centers and / **Corporate desks.** | Online booking arrived, but travel still meant rigid corporate tools, call centers, and endless approvals. | `timeline-2000.webp` | center |
| `Today` | portals / **you operate.** | Dashboards everywhere. Travelers became the operators, stitching a dozen disconnected tools together themselves. | `timeline_today.webp` | center |
| `2026` | an agent that / **does it for you.** | Miraee flips it. A swarm of AI agents books, negotiates, and rebooks, with a human in the loop when it matters. | `timeline_agent.webp` | center 18% |

### Unused `features` arrays

Authored on every era but **never rendered** by `EraPanel`. Included for completeness — decide port or drop.

| era | features (label / sub) |
|---|---|
| 1990s | Phone calls / Long wait times · Fax approvals / Manual everything · Paper tickets / Easy to lose · Filing cabinets / Difficult to track |
| 2000s | Call centers / Hold music forever · Booking portals / Clunky UX · Corporate cards / Manual reconciliation · Expense reports / Weeks to file |
| Today | Disconnected apps / 12+ vendors · Manual policy / Guesswork · Self-service / You do the work · Scattered data / No single view |
| 2026 | AI agents / **200+ specialized** · Auto-booking / Seconds not hours · Human backup / 24/7 support · One platform / Everything connected |

---

## 5. Problem — `610-682`

- **Eyebrow:** The problem
- **Headline:** `A $2T industry still runs on` / **`disconnected tools.`** (second line accent-strong)
- **Body:** Booking tools, travel desks, payments, expense software, employee benefits: a dozen vendors stitched together.
- **Kicker** (orange, bold): And none of it built for the person actually traveling.

| icon | title | body | stat | statLabel |
|---|---|---|---|---|
| `⧉` | Disconnected systems | Booking tools, travel desks, payments, expense software, employee benefits. | `5` | separate systems |
| `✦` | Vendors to manage | A dozen vendors stitched together, none of them talking to each other. | `12+` | vendors |
| `◎` | Built for the employee | None of it built for the person actually traveling. | `0` | built for them |

No images, no CTAs.

---

## 6. Solution — `685-843`

Two layouts, same copy: stacked cards below 1200px, split-screen sticky 300vh above. Desktop panel also renders a `Step 01 / 02 / 03` label from `num`.

- **Eyebrow:** The platform
- **Headline:** `200+ deep agents,` / `working as one.`
- **Scroll hint** (desktop): scroll through

| num | title | body | stat | statLabel | icon |
|---|---|---|---|---|---|
| `01` | Global content, local experiences | Millions of properties and hundreds of airlines, plus hyperlocal experiences no one else has digitized. | `2M+` | properties | `◈` |
| `02` | A swarm of specialized agents | Booking, policy, negotiation, rebooking and expense agents that act, not just answer. | `200+` | deep AI agents | `⬡` |
| `03` | Human in the loop | Real support and oversight where it matters, so autonomy never means blind trust. | `24/7` | human support | `◉` |

No images, no CTAs.

---

## 7. Kinetic band #1 — `1464`

Giant type strips sliding opposite directions on scroll. Each line repeated 4×, joined by ` · `.

- **line1** (solid): `ONE PLATFORM`
- **line2** (outline stroke): `THE WHOLE JOURNEY`

---

## 8. Capabilities — `846-980`

Click accordion. **These are the six capabilities** the nav mega menu needs one-line descriptors for.

- **Eyebrow:** The product
- **Headline (mobile/tablet):** `One platform for` / `the whole journey.`
- **Headline (desktop):** `One platform for the whole journey.` (single line)
- **Desktop counter** (top-right): `{num}` + ` / 06`
- **Desktop kicker:** `{num} · {statLabel uppercased}`

| num | title | body | icon | stat | statLabel |
|---|---|---|---|---|---|
| `01` | Plan | Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds. | `◈` | `<60s` | to an itinerary |
| `02` | Book | Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap. | `⬡` | `20–30%` | wholesale savings |
| `03` | Expense | Receipts, reports and reconciliation handled automatically. No forms, no chasing. | `◉` | `0` | forms to fill |
| `04` | Change | Plans shift, the agent rebooks itself: within policy, before you even ask. | `◈` | `100%` | handled by the agent |
| `05` | 24/7 support | A human-in-the-loop backup whenever a trip needs a real person. | `⬡` | `24/7` | human backup |
| `06` | Personal travel | The same agent plans employees own trips: a perk they actually use. | `◎` | `1` | agent for everything |

No images, no CTAs.

---

## 9. Roles / Experiences — `983-1108`

Scroll-linked horizontal pan. This is the source for the homepage **Experiences tab**.

- **Eyebrow:** Experiences
- **Headline (mobile/tablet):** `Business travel,` / `meet the trips people love.`
- **Headline (desktop):** `Business travel, meet the` / `trips people love.`
- **Scroll hint** (desktop, while panning): scroll to explore
- Cards with no `stat` render the footer line **One tap away** with a plane glyph.

| tag | headline | body | stat | statLabel | img |
|---|---|---|---|---|---|
| `Experiences` | Not bookable anywhere else. | The city after 5pm, the festival, the family weekend bolted onto a work trip. Booked and expensed separately, one tap. | `90%` | of experiences | — |
| `01` | Festivals and culture | — | — | — | `LMZ3ugguI8VTpFeCKuOrrEUXDY.jpg` |
| `02` | Once-in-a-trip moments | — | — | — | `lS1MsTKdDET0sJLlXRCt44HdDFY.jpg` |
| `03` | Local performances | — | — | — | `AANz7Gv2v4OLJICanNZTO4cDyE.jpg` |
| `04` | Markets and makers | — | — | — | `v0MpWd9NHbV98F3GxQZzhtAp0o.jpg` |
| `05` | The bleisure weekend | — | — | — | `OLnrOVVrjhLnXULOt0RWBQJJ30.jpg` |
| `06` | Food and discovery | — | — | — | `KqpDMVbbYgwoEAK6vQioHlDmeQ.jpg` |

Images are remote — see [Assets](#assets). Image `alt` = card headline.

---

## 10. How it works — `1111-1222`

Immersive full-viewport sticky scroll. **This is the "V0 version: Plan, Book, Expense, Change" the structure doc asks for.** Copy is employee-perspective throughout.

- **Eyebrow:** How it works
- **Subheadline (h3):** One agent, the whole journey: plan, book, expense, change.
- **Right meta line:** Voice, chat or avatar · It remembers your preferences.
- Each panel renders a counter `{num} / 04`.

| num | title | tag | body |
|---|---|---|---|
| `01` | Plan | Plain language | Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds. |
| `02` | Book | Wholesale inventory | Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap. |
| `03` | Expense | Zero forms | Receipts, reports and reconciliation handled automatically. No forms, no chasing. |
| `04` | Change | Self-rebooking | Plans shift, the agent rebooks itself: within policy, before you even ask. |

`STEPS[].body` is identical to `CAPS[01-04].body` — same four strings reused.

### Step vignettes — `StepVisual`, `118-183`

Product mock-ups rendered at ≥1200px only. Real strings, useful if the visuals are rebuilt.

**Step 01 · Plan**

- Chat bubble: Fly me to Singapore Mar 15, hotel near the client office
- Waveform caption: or say it out loud
- Status: Miraee is on it

**Step 02 · Book** — route `SFO` → `SIN`

| option | price | state |
|---|---|---|
| SQ 31 · Nonstop · 17h 25m | `$1,240` | selected, sublabel **Best · in policy** |
| NH 107 · 1 stop · 21h 10m | `$1,388` | — |
| UA 28 · 1 stop · 22h 45m | `$1,512` | — |

**Step 03 · Expense**

- Header: Trip request · Singapore
- Rows: SQ 31 · SFO to SIN · $1,240 — 2 nights · client-side hotel — Total $1,596 · under budget
- Stamp: **Expensed**

**Step 04 · Change** — notification cards (title / sub):

| title | sub |
|---|---|
| Calendar synced | Flight + hotel on your schedule |
| Receipt captured | $18.40 airport cab · auto-coded |
| Rebooked automatically | 6:00 AM cancelled → on the 9:15 AM |

---

## 11. Kinetic band #2 — `1468`

Same component as band #1, `bg` set to surface.

- **line1** (solid): `LOVED BY EMPLOYEES`
- **line2** (outline stroke): `TRUSTED BY FINANCE`

---

## 12. Comparison / business case — `1225-1261`

- **Eyebrow:** The business case (accent-strong)
- **Headline:** `Loved by employees.` / **`Trusted by finance.`** (second line orange)

| stat | label |
|---|---|
| `20–30%` | Travel savings, validated apples-to-apples vs. incumbents |
| `100%` | Of the journey managed by the agent, end to end |
| `1` | Platform for business and personal travel alike |

No images, no CTAs. The structure doc marks this **minimal text** — it already is.

---

## 13. Security / for airlines and suppliers — `1264-1327`

- **Eyebrow:** For airlines and suppliers
- **Headline:** `Be part of your travelers’` / **`best experiences.`** (curly apostrophe in source; second line accent-strong)
- **Body:** Miraee puts your brand in front of premium, high-frequency travelers, for the business trip and the personal one, with content you control.
- **CTA:** Partner with Miraee → `/book-a-demo`

Badges render as `label` + `.` then `sub` + `.` — the trailing periods are appended in JSX, not in the data.

| label | sub |
|---|---|
| Premium travelers | Access to a large, engaged base of premium travelers |
| Brand-forward NDC | Brand-forward content and real-time merchandising over NDC |
| The whole traveler | Win business travel and their personal travel alike |

**Image:** `lS1MsTKdDET0sJLlXRCt44HdDFY.jpg`, alt "Travelers enjoying a local experience" — the same file as Roles card `02`.

---

## 14. CTA — `1329-1370`

Two-act sticky 380vh on maroon. Act 1 is the wordmark; act 2 carries the copy over `CtaRoutes` — a dotted world map with animated flight arcs between eight hub coordinates (SVG only, no copy).

- **Headline:** `Give every employee` / `an AI travel agent.` (explicit `<br />`)
- **Subheadline:** Effortless for travelers. Controlled for finance. Rewarding for everyone.
- **Footnote:** Built by Tabhi.

| CTA | href | style |
|---|---|---|
| Book a demo | `/book-a-demo` | cream fill |
| Partner with Miraee | `/book-a-demo` | outline |

---

## 15. Footer — `1372-1438`

- **Tagline:** The AI-native employee travel platform. A Tabhi company.
- **CTAs:** Book a demo → `/book-a-demo` · Support → `/support`
- **Bottom bar left:** © 2026 Miraee, a Tabhi company. [Privacy](/privacy) · [Terms](/terms) · Security — note "Security" here is **plain text, not a link**
- **Bottom bar right:** Built by Tabhi AI

Columns from `COLS` (`1380-1384`); hrefs from `LINK_HREFS` (`1385-1390`). Any label absent from `LINK_HREFS` falls back to `#`. `http` links get `target="_blank" rel="noopener noreferrer"`.

| Column | Label | href |
|---|---|---|
| Company | About Tabhi | `https://www.tabhi.com/` (new tab) |
| Company | Careers | `#` |
| Company | Newsroom | `#` |
| Company | Support | `/support` |
| Partners | For airlines | `#` |
| Partners | For suppliers | `#` |
| Partners | Distribution | `#` |
| Legal | Terms & Conditions | `/terms` |
| Legal | Privacy | `/privacy` |
| Legal | Security | `#` |

Six of ten footer links are dead. If the footer is ported, `Careers` and `Newsroom` map to the new **Company** page and `Security` to the Product menu's Security & Trust entry.

---

## Assets

### Local imports — `Home.tsx:3-6`

All four are already present and **byte-identical** in the new site's `src/assets/`. No copying needed.

| import | file | used by |
|---|---|---|
| `timeline1990s` | `timeline-1990s.webp` | Timeline era 1990s |
| `timeline2000s` | `timeline-2000.webp` | Timeline era 2000s |
| `timelineToday` | `timeline_today.webp` | Timeline era Today |
| `timelineAgent` | `timeline_agent.webp` | Timeline era 2026 |

Naming is inconsistent (`timeline-1990s` and `timeline-2000` hyphenated, `timeline_today` and `timeline_agent` underscored). Worth normalizing on the port.

### Remote images

Six unique URLs, seven references, all prefixed `https://framerusercontent.com/images/`. Hotlinked, not bundled. The new site already references this host, so the CSP `img-src` allowance is in place.

| file | used by |
|---|---|
| `LMZ3ugguI8VTpFeCKuOrrEUXDY.jpg` | Roles 01 — Festivals and culture |
| `lS1MsTKdDET0sJLlXRCt44HdDFY.jpg` | Roles 02 — Once-in-a-trip moments **and** the Security section |
| `AANz7Gv2v4OLJICanNZTO4cDyE.jpg` | Roles 03 — Local performances |
| `v0MpWd9NHbV98F3GxQZzhtAp0o.jpg` | Roles 04 — Markets and makers |
| `OLnrOVVrjhLnXULOt0RWBQJJ30.jpg` | Roles 05 — The bleisure weekend |
| `KqpDMVbbYgwoEAK6vQioHlDmeQ.jpg` | Roles 06 — Food and discovery |

These should be downloaded and localized during the port — they are a live dependency on a Framer CDN the project no longer controls.

---

## All CTA destinations

| Label | href | Appears in |
|---|---|---|
| Book a demo | `/book-a-demo` | Nav, Hero, CTA, Footer |
| Partner with Miraee | `/book-a-demo` | Security, CTA |
| Sign in | `https://app.miraee.ai` | Nav (desktop only) |
| (logo) | `https://app.miraee.ai` | Nav |
| Support | `/support` | Footer |
| About Tabhi | `https://www.tabhi.com/` | Footer |
| See how it works | **none** | Hero |

---

## Carry-over notes

Defects and decisions found in the source. Fix these on the port rather than copying them forward.

| Item | Where | Action |
|---|---|---|
| `See how it works` is a dead `<button>` — no `href`, no `onClick` | `Home.tsx:431` | Anchor it to the How it works section |
| `TIMELINE_ERAS[].features` — 16 authored objects, never rendered | `494-539` | Decide port or drop |
| `SEC_BADGES[].icon` defined but not rendered; badges use a plain orange dot | `1264-1268` | Drop the field or render it |
| Hero headline casing: `AI-native employee` / `travel Platform` | `418-419` | Inconsistent — pick one |
| CAPS `06` reads "employees own trips" — missing possessive apostrophe | `852` | Fix to "employees' own trips" |
| Roles card `02` image reused as the Security section image | `986`, `1315` | Source a distinct image |
| `20–30%` written as en dash escape `–30` in three places | STATS, CAPS `02`, CASE_STATS | Keep the en dash consistent |
| Six of ten footer links resolve to `#` | `1385-1390` | Wire to real pages |
| Copyright reads © 2026 and the last timeline era is `2026` | `1430`, `528` | Verify against launch date |

### "200 agents" — flag before reuse

The structure doc says AI & Technology must have **no use of "200 bots"**. V0 states the number in three places. Every one needs rewriting, not copy-pasting:

| Location | String |
|---|---|
| StatStrip | `200+` / AI agents |
| Solution headline | `200+ deep agents,` |
| Solution `02` | `200+` / deep AI agents |
| Timeline era 2026 features (unrendered) | AI agents / `200+ specialized` |

---

## Not covered here

V0's other pages, same treatment if wanted later:

| File | Lines |
|---|---|
| `Miraee_landing_page/src/pages/Product.tsx` | 1288 |
| `Miraee_landing_page/src/pages/Solutions.tsx` | 1239 |
| `Miraee_landing_page/src/pages/Technology.tsx` | 1041 |

All three are unrouted in V0 — `src/App.tsx` there serves only the legal and support pages and redirects everything else to `app.miraee.ai`.
