import { useEffect, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { V4Page, V4Cta, Reveal, Faq } from "../../components/V4Kit"
import { PlatformHeroV1, TwoViewsV1, OutcomesV1, SavingsV3, IntegrationsV1, MondeeAdvantageV2, TMCGenerationsV2 } from "./RefSections"
import { Capabilities } from "./V0Sections"
import "../SubpagesV2.css"
import "./V4.css"

// Looping "live" interface widget — ported from V3's ProductV3.tsx
// PersonalizationLoop (layout + animation), cycling through what Miraee
// already knows instead of describing it in prose.
const PERSONALIZATION_ITEMS: [string, string][] = [
    ["Traveler context", "Aisle seat · Delta Diamond · vegetarian meal on file"],
    ["Company policy", "$450/night cap, Northeast — auto-approved, in policy"],
    ["Trip state", "Flight booked · hotel confirmed · 2 receipts matched"],
]

const PERSONALIZATION_KNOWS = ["Who the traveler is", "Company travel policy", "Seat preferences", "Airline & hotel preferences", "Loyalty programs", "Previous behavior", "Office & location context", "Preferred timings"]

function PersonalizationLoop() {
    const [active, setActive] = useState(0)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        const id = setInterval(() => setActive(v => (v + 1) % PERSONALIZATION_ITEMS.length), 2800)
        return () => clearInterval(id)
    }, [])
    const [tag, text] = PERSONALIZATION_ITEMS[active]
    return (
        <div className="v4-personalization-loop">
            <div className="v4-personalization-loop__bar">
                <motion.span className="v4-personalization-loop__dot" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                <span>Personalization — live</span>
            </div>
            <div className="v4-personalization-loop__body">
                <AnimatePresence initial={false}>
                    <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="v4-personalization-loop__row" style={{ position: "absolute" }}>
                        <b>{tag}</b>
                        <p>{text}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="v4-personalization-loop__dots">
                {PERSONALIZATION_ITEMS.map(([itemTag], i) => (
                    <button key={itemTag} aria-label={`Show ${itemTag}`} onClick={() => setActive(i)} className={i === active ? "active" : ""} />
                ))}
            </div>
        </div>
    )
}

// Platform. Section order:
//   Hero → less work, better journeys → one platform, two views (V1) →
//   six capabilities → savings that compound (V3) → savings, defined once →
//   fits the systems you already run (V1) → Mondee/Tabhi trust bar (V2) →
//   Miraee vs legacy TMCs (V2) → the platform adapts (duty of care,
//   reporting, onboarding) → FAQs.

const ICON_LOCATION = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-7.58 7-12a7 7 0 10-14 0c0 4.42 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.6" />
    </svg>
)
const ICON_REPORT = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V11M12 20V4M20 20v-7" />
    </svg>
)
const ICON_ONBOARD = (
    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round">
        <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth={1.6} opacity={.25} />
        <path d="M12 3.6a8.4 8.4 0 015.94 14.34" stroke="currentColor" strokeWidth={1.6} />
    </svg>
)

const ADAPTIVE_FEATURES: [ReactNode, string, string, string][] = [
    [ICON_LOCATION, "Live location tracking, real reassurance.", "See every active traveler on one live map, with any itinerary change flagged in real time, real-time traveler tracking built for duty of care, so the team always knows where someone's headed, especially when things go sideways. Travelers who feel looked after on the road tend to stay longer. Care shown on the journey has a way of returning as loyalty.", "Real-time, one live map"],
    [ICON_REPORT, "Your travel data, read your way.", "Custom travel reports that surface the fine detail: spend by team, entity or route, alongside the bigger picture: policy compliance, out-of-policy overage, savings and reimbursement cycle time. Each report is shaped to the reader and exportable in a click, so no one's left wrestling a spreadsheet to make corporate travel spend data make sense.", "Exportable in one click"],
    [ICON_ONBOARD, "Guided self-setup & onboarding", "A guided, self-service setup on the main page walks every employee through their own travel profile, with a live completion percentage showing exactly what's left, so people maintain their own corner, no implementation team required.", "Live completion %"],
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

export default function V4Platform() {
    return (
        <V4Page
            title="Platform | Plan, Book, Expense, Change | Miraee"
            description="One AI-native platform for employee travel: six capabilities covering the whole journey, wholesale savings, and the integrations your stack already runs.">

            {/* V1's Product page hero, ported exactly (layout + animation) —
                see RefSections.tsx for the source citation (<V11Hero> at
                src/components/V11Hero.tsx, used by src/pages/Product.tsx). */}
            <PlatformHeroV1 />

            {/* V3's PersonalizationLoop, ported exactly (layout + animation) —
                see ProductV3.tsx `PersonalizationLoop` for the source. */}
            <section className="v4-section" id="personalization" aria-labelledby="personalization-title">
                <div className="v4-shell v4-personalization-grid">
                    <Reveal>
                        <span className="v4-eyebrow">Built on context</span>
                        <h2 className="v4-h2" id="personalization-title">One sentence works because Miraee already knows.</h2>
                        <p className="v4-lede">No profile to fill out, no policy to look up. Every trip request lands on top of everything Miraee already holds about the traveler, the company, and the trip in progress.</p>
                        <div className="v4-personalization-knows">
                            {PERSONALIZATION_KNOWS.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <PersonalizationLoop />
                    </Reveal>
                </div>
            </section>

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

            <section className="v4-section v4-section--tight-top" aria-labelledby="savings-note-title">
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

            {/* V2's "Miraee vs legacy TMCs" — see RefSections.tsx for the
                source citation (ProductV2.tsx `.pv2-generation`). */}
            <TMCGenerationsV2 />

            <section className="v4-section" id="adaptive" aria-labelledby="adaptive-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Platform depth</span>
                        <h2 className="v4-h2" id="adaptive-title">The Miraee platform adapts. So your people don't have to.</h2>
                    </Reveal>
                    <div className="v4-adaptive-grid">
                        {ADAPTIVE_FEATURES.map(([icon, title, body, tag], i) => (
                            <Reveal className="v4-adaptive-card" key={title} delay={i * 0.1}>
                                <span className="v4-adaptive-card__icon" aria-hidden="true">{icon}</span>
                                <h3>{title}</h3>
                                <p>{body}</p>
                                <span className="v4-adaptive-card__tag">{tag}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

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
