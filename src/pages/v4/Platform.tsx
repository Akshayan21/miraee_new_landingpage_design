import { type ReactNode, type CSSProperties, useState } from "react"
import { motion } from "framer-motion"
import { V4Page, V4Cta, Reveal, Faq } from "../../components/V4Kit"
import { PlatformHeroV1, TwoViewsV1, OutcomesV1, SavingsV3, IntegrationsV1, MondeeAdvantageV2, TMCGenerationsV2 } from "./RefSections"
import { Capabilities } from "./V0Sections"
import supplyImage from "../../assets/supply_image.png"
import ledgerImage from "../../assets/Booking_image.png"
import avatarImg from "../../assets/Avatar.png"
import wholeTripImage from "../../assets/whole trip.webp"
import learnsYouImage from "../../assets/tarvel that learns you.jpg"
import enterpriseImage from "../../assets/Entreprices control.png"
import "../SubpagesV2.css"
import "./V4.css"

// "Capability Grid" — four cards, straight after the hero. Reuses the
// .v4-adaptive-card visual language (icon chip, title, body) already defined
// for the platform-depth cards further down the page, just laid out 4-up via
// .v4-capgrid instead of .v4-adaptive-grid's 3-up.
const CAPGRID_ICON_GLOBAL = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9s1.3-6.5 3.8-9Z" />
    </svg>
)
const CAPGRID_ICON_AGENTIC = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
)
const CAPGRID_ICON_TAO = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" /><path d="M3 16.5 12 21l9-4.5M3 12l9 4.5 9-4.5" />
    </svg>
)
const CAPGRID_ICON_MICE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M15.5 13.2a2.6 2.6 0 1 1-2.7 2.7 2.1 2.1 0 1 0 2.7-2.7Z" />
    </svg>
)
const CAPABILITY_GRID: { icon: ReactNode; title: string; body: string; accent: "orange" | "maroon" }[] = [
    { icon: CAPGRID_ICON_GLOBAL, title: "Global Content", body: "Access to 2M+ hotels, 500+ airlines with NDC, and worldwide rail.", accent: "orange" },
    { icon: CAPGRID_ICON_AGENTIC, title: "Agentic Fulfillment", body: "Zero forms. Agents manage booking, coordinating, paying, and expense.", accent: "maroon" },
    { icon: CAPGRID_ICON_TAO, title: "TAO Complex Bookings", body: "Agent-assisted fulfillment for what standard portals cannot handle, including rail, deposit hotels, and complex group itineraries.", accent: "orange" },
    { icon: CAPGRID_ICON_MICE, title: "MICE & After 5pm", body: "Plan offsites and customer events once; unlock hyperlocal experiences after hours via our Abhee platform.", accent: "maroon" },
]

function CapabilityGrid() {
    return (
        <section className="v4-section v4-section--tight-bottom" id="capability-grid" aria-labelledby="capability-grid-title">
            <div className="v4-shell">
                <Reveal>
                    <span className="v4-eyebrow">What Miraee covers</span>
                    <h2 className="v4-h2" id="capability-grid-title">Every capability, one platform.</h2>
                </Reveal>
                <div className="v4-capgrid">
                    {CAPABILITY_GRID.map((c, i) => (
                        <Reveal className={`v4-capcard v4-capcard--${c.accent}`} key={c.title} delay={i * 0.06}>
                            <span className="v4-capcard__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                            <span className="v4-capcard__icon" aria-hidden="true">{c.icon}</span>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// "Deep-Dive Blocks" Block 1 — 24x7 Support (AI + Human). Header (icon +
// eyebrow + heading) sits inline instead of stacked with dead space below
// it; the AI-concierge → human-agent handoff renders as a full-width
// horizontal flow strip, so the panel's own width does the work instead of
// two narrow chips floating in the right half.
const SUPPORT_ICON = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2" y="13" width="5" height="7" rx="1.5" /><rect x="17" y="13" width="5" height="7" rx="1.5" />
        <path d="M12 21a4 4 0 0 0 4-4" />
    </svg>
)
const SUPPORT_ICON_AI = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 8V4M9 4h6" /><circle cx="9" cy="14" r="1.4" fill="currentColor" stroke="none" /><circle cx="15" cy="14" r="1.4" fill="currentColor" stroke="none" />
    </svg>
)
const SUPPORT_ICON_HUMAN = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    </svg>
)

function Support247() {
    return (
        <section className="v4-section v4-section--tint v4-section--tight-top v4-section--tight-bottom" id="support-247" aria-labelledby="support-247-title">
            <div className="v4-shell">
                <div className="v4-support-block">
                    <span className="v4-support-block__watermark" aria-hidden="true">{SUPPORT_ICON}</span>
                    <Reveal>
                        <div className="v4-support-head">
                            <span className="v4-support-block__icon" aria-hidden="true">{SUPPORT_ICON}</span>
                            <div>
                                <span className="v4-eyebrow">Always-on support</span>
                                <h3 id="support-247-title">24x7 Support (AI + Human)</h3>
                            </div>
                        </div>
                        <p>Our AI concierge (TACO) handles standard changes and refunds instantly. When complex exceptions arise, a human agent seamlessly takes over in the exact same thread.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-support-flow">
                            <div className="v4-support-node v4-support-node--ai">
                                <span className="v4-support-node__badge" aria-hidden="true">{SUPPORT_ICON_AI}</span>
                                <div><b>TACO concierge</b><span>Standard changes and refunds, instantly</span></div>
                            </div>
                            <span className="v4-support-flow__connector" aria-hidden="true">
                                <b>Escalates</b>
                                <svg viewBox="0 0 40 14" fill="none"><path d="M0 7h32M26 1.5 33.5 7 26 12.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <div className="v4-support-node v4-support-node--human">
                                <span className="v4-support-node__badge" aria-hidden="true">{SUPPORT_ICON_HUMAN}</span>
                                <div><b>Human agent</b><span>Same thread, for the complex exceptions</span></div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// "Deep-Dive Blocks" Block 2 — Complete Personalization. Same panel device as
// Support247 (Block 1): top accent bar, gradient wash, ghost watermark,
// inline icon+eyebrow+heading header. The four things the EA remembers are
// rendered as icon-led fact cards — a real glyph per fact instead of a bare
// number — so the row reads as evidence of "it has a memory", not a plain list.
const PERSONALIZATION_ICON = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
)
const FACT_ICON_SEAT = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v10a2 2 0 0 0 2 2h8" /><path d="M6 14H4.5A1.5 1.5 0 0 0 3 15.5v.5" /><path d="M16 16v4M6 16v4" /><path d="M16 9h2a2 2 0 0 1 2 2v3" />
    </svg>
)
const FACT_ICON_HOTEL = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9l9-5 9 5v12" /><path d="M9 21v-6h6v6M3 21h18" />
    </svg>
)
const FACT_ICON_STATUS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" /><path d="m8.2 12.6-1.4 6.9 5.2-2.8 5.2 2.8-1.4-6.9" />
    </svg>
)
const FACT_ICON_BUFFER = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
)
const PERSONALIZATION_KNOWS_SHORT: { label: string; icon: ReactNode; accent: "orange" | "maroon" }[] = [
    { label: "Seat preferences", icon: FACT_ICON_SEAT, accent: "orange" },
    { label: "Preferred hotel brands", icon: FACT_ICON_HOTEL, accent: "maroon" },
    { label: "Airline status", icon: FACT_ICON_STATUS, accent: "orange" },
    { label: "Arrival buffers", icon: FACT_ICON_BUFFER, accent: "maroon" },
]

function CompletePersonalization() {
    return (
        <section className="v4-section v4-section--tint v4-section--tight-top v4-section--tight-bottom" id="complete-personalization" aria-labelledby="complete-personalization-title">
            <div className="v4-shell">
                <div className="v4-support-block">
                    <span className="v4-support-block__watermark" aria-hidden="true">{PERSONALIZATION_ICON}</span>
                    <Reveal>
                        <div className="v4-support-head">
                            <span className="v4-support-block__icon" aria-hidden="true">{PERSONALIZATION_ICON}</span>
                            <div>
                                <span className="v4-eyebrow">Deep dive · Personalization</span>
                                <h3 id="complete-personalization-title">Complete Personalization</h3>
                            </div>
                        </div>
                        <p>Your EA has a memory. It knows your seat preferences, preferred hotel brands, airline status, and necessary arrival buffers. It provides tailored recommendations, not endless lists of irrelevant options.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-fact-grid">
                            {PERSONALIZATION_KNOWS_SHORT.map((k, i) => (
                                <motion.div className={`v4-fact-card v4-fact-card--${k.accent}`} key={k.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}>
                                    <span className="v4-fact-card__icon" aria-hidden="true">{k.icon}</span>
                                    <span>{k.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// Platform. Section order:
//   Hero → less work, better journeys → one platform, two views (V1) →
//   six capabilities → savings that compound (V3) → savings, defined once →
//   fits the systems you already run (V1) → Mondee/Tabhi trust bar (V2) →
//   Miraee vs legacy TMCs (V2) → the platform adapts (duty of care,
//   reporting, onboarding) → FAQs.

// Real mini-visualizations instead of a single line-icon each — a small
// live map, a bar chart and a progress ring, each echoing the card's own
// tag ("one live map", "exportable in one click", "live completion %").
const VISUAL_MAP = (
    <div className="v4-mini-map" aria-hidden="true">
        <span className="v4-mini-map__route" />
        <span className="v4-mini-map__pin v4-mini-map__pin--a" />
        <span className="v4-mini-map__pin v4-mini-map__pin--b" />
        <span className="v4-mini-map__pin v4-mini-map__pin--c is-active"><i /></span>
    </div>
)
const VISUAL_CHART = (
    <div className="v4-mini-chart" aria-hidden="true">
        {[38, 62, 46, 80, 55].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === 3 ? "is-accent" : undefined} />
        ))}
    </div>
)
const VISUAL_PROGRESS = (
    <div className="v4-mini-ring" aria-hidden="true">
        <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" className="v4-mini-ring__track" />
            <circle cx="32" cy="32" r="26" className="v4-mini-ring__fill" />
        </svg>
        <span className="v4-mini-ring__label">72%</span>
    </div>
)

const ADAPTIVE_FEATURES: [ReactNode, string, string, string][] = [
    [VISUAL_MAP, "Live location tracking, real reassurance.", "See every active traveler on one live map, with itinerary changes flagged in real time. Built for duty of care, so teams know where travelers are when it matters.", "Real-time. One live map."],
    [VISUAL_CHART, "Your travel data, your way.", "Get tailored reports on spend, compliance, savings and reimbursements by team, entity or route. Export insights instantly—no spreadsheets required.", "Export in one click."],
    [VISUAL_PROGRESS, "Guided self-setup & onboarding", "Employees can build their travel profiles through guided self-setup, with live progress tracking. Simple onboarding, with no implementation team required.", "Live completion %"],
]

const FAQS: [string, ReactNode][] = [
    ["What is Miraee?", "Miraee is an AI-native employee travel platform that plans, books, changes and expenses business trips end to end. Rather than connecting a booking tool to an expense tool, Miraee runs the entire journey as one continuous travel and expense management system, so the same agent that plans a trip also rebooks it during disruption and closes the expense afterwards."],
    ["How is Miraee different from a travel management company?", "A travel management company processes bookings and charges per transaction, with changes and support billed separately. Miraee is software: it understands a request in natural language, applies company policy before showing options, books the whole trip as one item, and handles changes and expenses automatically. Human travel specialists are included rather than charged per call."],
    ["What does it mean that Miraee uses AI agents?", "Miraee runs a multi agent AI system: bounded, permissioned workers that complete tasks rather than answer questions. Separate agents own booking, policy, negotiation, rebooking, expense and support, and all of them read the same trip thread. Each agent has a written limit on what it may do without human approval, and every action it takes is logged."],
    ["Does Miraee enforce our travel policy automatically?", "Yes. Miraee applies company policy before search results are shown, so travelers see options that are already in policy rather than discovering violations at approval. Policy can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how the rules are configured."],
    ["Do travelers still have to file expense reports?", "No. Miraee captures the receipt at the point of transaction, codes it to the correct category, entity and cost centre, matches it against the original booking, and posts it to the finance system. Travelers do not submit reports and finance teams do not chase receipts."],
    ["What happens when a flight is cancelled or delayed?", "Miraee monitors every segment of every trip continuously and detects most disruptions before the airline notifies the traveler. The agent finds alternatives, prices each against company policy, and either rebooks automatically inside limits you have set or presents one clear recommendation for approval."],
    ["Can employees book personal travel through Miraee?", "Yes. The same agent plans personal trips using the traveler's own payment card, with corporate negotiated rates applied where supplier agreements permit. Personal spend never enters company reporting and company funds are never used, so business and personal travel stay entirely separate while sharing one experience."],
    ["What travel inventory does Miraee have access to?", "Miraee books flights, hotels, rail and car hire from live inventory sourced through direct supplier connections and wholesale agreements held by the Tabhi group, covering over 500 airlines and more than two million hotels. It also carries hyperlocal experience content that is not available through other corporate travel channels."],
    ["Which systems does Miraee integrate with?", "Miraee connects to identity providers via SSO and SCIM, to HRIS platforms for traveler and cost centre data, to ERP and accounting systems for expense posting, to corporate card networks for payment, and to calendar and messaging tools for itineraries."],
    ["How long does implementation take?", "Pilots reach full deployment in as little as 90 days."],
]

// "What sets us apart" — six-card bento below the Mondee/Tabhi trust bar.
// Each card carries a large translucent ghost numeral (same device
// StepPanel/RefSections use elsewhere for a section's own number) plus a
// small line icon, so the grid reads as a deliberate system rather than six
// interchangeable text blocks.
const APART_ICON_AGENTS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
)
const APART_ICON_CONVO = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="4.5" width="17" height="12" rx="3" />
        <path d="M8.5 16.5v3l3.7-3M8 9h8M8 12h5.5" />
    </svg>
)
const APART_ICON_LEARNS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="8" r="3.5" /><path d="M3.5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
        <path d="M19 3v4M17 5h4" />
    </svg>
)
const APART_ICON_LEDGER = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
        <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
        <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </svg>
)
const APART_ICON_SHIELD = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 19.5 6v6c0 4.6-3.1 7.7-7.5 8.9-4.4-1.2-7.5-4.3-7.5-8.9V6L12 3Z" />
        <path d="M8.75 12.2 11 14.5l4.5-4.9" />
    </svg>
)
const APART_ICON_SUPPLY = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8.5 3.5 12l3.5 3.5M17 8.5 20.5 12 17 15.5" />
        <path d="M14 6.5 10 17.5" />
    </svg>
)

const WHAT_SETS_APART: { icon: ReactNode; title: string; body: string; accent?: "orange" | "maroon"; image?: string; imagePosClosed?: string; imagePosActive?: string }[] = [
    { icon: APART_ICON_AGENTS, title: "Agentic by design, not AI as a feature", body: "Six agents do the searching, matching and reconciling. Decisions that carry cost or risk still come to you.", image: avatarImg, imagePosClosed: "50% 20%", imagePosActive: "50% 22%" },
    { icon: APART_ICON_CONVO, title: "Whole trip in one conversation", body: "Describe it in a sentence; it comes back planned, priced and in policy. No tabs, no report to file. The conversation is the workflow.", accent: "orange", image: wholeTripImage, imagePosClosed: "37% 15%", imagePosActive: "37% 20%" },
    { icon: APART_ICON_LEARNS, title: "Travel that learns you", body: "Preferred airlines, seats, hotels and timing, applied from the first result. Personal identity stays separate from account login.", accent: "maroon", image: learnsYouImage, imagePosClosed: "43% 18%", imagePosActive: "43% 22%" },
    { icon: APART_ICON_LEDGER, title: "One platform, one ledger, one source of truth", body: "Booking, policy, expense and reconciliation on one system. Every agent reads from real data, not tools stitched together.", accent: "orange", image: ledgerImage },
    { icon: APART_ICON_SHIELD, title: "Enterprise control, consumer ease", body: "A traveler experience people want to use, on governance the business trusts for full audit trails.", accent: "maroon", image: enterpriseImage },
    { icon: APART_ICON_SUPPLY, title: "Direct supply, better economics", body: "Wholesale and direct supply through Mondee, with the negotiation agent working the best rate on every booking.", accent: "orange", image: supplyImage },
]

function WhatSetsApart() {
    const [active, setActive] = useState(0)
    return (
        <section className="v4-section" id="apart" aria-labelledby="apart-title">
            <div className="v4-shell">
                <Reveal>
                    <span className="v4-eyebrow">What sets us apart</span>
                    <h2 className="v4-h2" id="apart-title">Not AI added to travel.<br /><em>Travel rebuilt around AI.</em></h2>
                    <p className="v4-lede">Most tools bolted a chatbot onto a booking engine. Miraee started from the agents up, so the whole trip runs as one system, and you stay the one who decides.</p>
                </Reveal>
                <div className="v4-apart-strip" role="tablist" onMouseLeave={() => setActive(0)}>
                    {WHAT_SETS_APART.map((item, i) => {
                        const isActive = i === active
                        return (
                            <motion.button
                                type="button"
                                role="tab"
                                aria-expanded={isActive}
                                key={item.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8% 0px" }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className={"v4-apart-panel" + (isActive ? " is-active" : "") + (item.accent ? ` v4-apart-panel--${item.accent}` : "") + (item.image ? " v4-apart-panel--photo" : "")}
                                style={item.image ? {
                                    backgroundImage: `linear-gradient(180deg, rgba(43,10,13,.32) 0%, rgba(43,10,13,.8) 100%), url(${item.image})`,
                                    ...(item.imagePosClosed ? { "--apart-photo-pos": item.imagePosClosed } as CSSProperties : {}),
                                    ...(item.imagePosActive ? { "--apart-photo-pos-active": item.imagePosActive } as CSSProperties : {}),
                                } : undefined}
                                onClick={() => setActive(i)}
                                onMouseEnter={() => setActive(i)}
                            >
                                <span className="v4-apart-panel__icon" aria-hidden="true">{item.icon}</span>
                                <div className="v4-apart-panel__body">
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default function V4Platform() {
    return (
        <V4Page
            title="Platform | Plan, Book, Expense, Change | Miraee"
            description="One AI-native platform for employee travel: six capabilities covering the whole journey, wholesale savings, and the integrations your stack already runs.">

            {/* V1's Product page hero, ported exactly (layout + animation) —
                see RefSections.tsx for the source citation (<V11Hero> at
                src/components/V11Hero.tsx, used by src/pages/Product.tsx). */}
            <PlatformHeroV1 />

            {/* Capability Grid + 24/7 Support — new content from the V5 content
                doc, sitting as the second section, directly after the hero. */}
            <CapabilityGrid />
            <Support247 />
            <CompletePersonalization />

            <OutcomesV1 />

            {/* V1's "One platform, two views" — see RefSections.tsx for the
                source citation (Product.tsx `TwoViews`). */}
            <TwoViewsV1 />

            {/* V0's orbital dial, ported exactly (layout + animation) -- see
                V0Sections.tsx for the source citation and what changed. Replaces
                the earlier card-grid version of the six capabilities; the mega
                menu's #plan...#personal links resolve to ids the dial itself sets
                (per-item ids on the mobile list; #capabilities on the desktop
                dial's scroll container -- scroll-linked, so a deep link lands at
                the top of the dial rather than a specific node). */}
            <Capabilities />

            <SavingsV3 />

            <section className="v4-section v4-section--tight-top v4-section--tight-bottom" aria-labelledby="savings-note-title">
                <div className="v4-shell">
                    <Reveal>
                        <div className="v4-note">
                            <b>20-30%</b>
                            <div>
                                <h3 id="savings-note-title">Savings, defined once.</h3>
                                <p>Savings of 20 to 30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.</p>
                                <p className="v4-foot-note">*Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* V1's "Fits the systems you already run" — see RefSections.tsx
                for the source citation (Product.tsx `Integrations`). */}
            <IntegrationsV1 />

            {/* V2's Tabhi/Mondee-branded trust bar — see RefSections.tsx for
                the source citation (ProductV2.tsx `.pv2-supply`). */}
            <MondeeAdvantageV2 />

            <WhatSetsApart />

            {/* Moved directly below the bento on request — was previously
                further down, after TMCGenerationsV2. */}
            <section className="v4-section" id="adaptive" aria-labelledby="adaptive-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Platform depth</span>
                        <h2 className="v4-h2" id="adaptive-title">The Miraee platform adapts. So your people don't have to.</h2>
                    </Reveal>
                    <div className="v4-adaptive-grid">
                        {ADAPTIVE_FEATURES.map(([visual, title, body, tag], i) => (
                            <Reveal className="v4-adaptive-card v4-adaptive-card--visual" key={title} delay={i * 0.1}>
                                {visual}
                                <h3>{title}</h3>
                                <p>{body}</p>
                                <span className="v4-adaptive-card__tag">{tag}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* V2's "Miraee vs legacy TMCs" — see RefSections.tsx for the
                source citation (ProductV2.tsx `.pv2-generation`). */}
            <TMCGenerationsV2 />

            <section className="v4-section v4-section--tint" id="faq" aria-labelledby="faq-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">FAQ</span>
                        <h2 className="v4-h2" id="faq-title">The platform, answered clearly.</h2>
                        <p className="v4-lede">How the system works, what it controls, and what implementation looks like.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}><Faq items={FAQS} /></div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes. We'll show you the journey end to end." />
        </V4Page>
    )
}
