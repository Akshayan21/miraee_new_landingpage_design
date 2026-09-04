import type { ReactNode } from "react"
import { V4Page, V4Cta, Reveal, Faq } from "../../components/V4Kit"
import { PlatformHeroV1, TwoViewsV1, OutcomesV1, SavingsV3, IntegrationsV1 } from "./RefSections"
import { Capabilities } from "./V0Sections"
import "../SubpagesV2.css"
import "./V4.css"

// Platform. Section order:
//   Hero → less work, better journeys → one platform, two views (V1) →
//   six capabilities → savings that compound (V3) → savings, defined once →
//   fits the systems you already run (V1) → FAQs.

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
                            <b>20–30%</b>
                            <div>
                                <h3 id="savings-note-title">Savings, defined once.</h3>
                                <p>Savings of 20–30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.</p>
                                <p className="v4-foot-note">*Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* V1's "Fits the systems you already run" — see RefSections.tsx
                for the source citation (Product.tsx `Integrations`). */}
            <IntegrationsV1 />

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
