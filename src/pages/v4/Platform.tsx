import type { ReactNode } from "react"
import { V4Page, V4Hero, V4Cta, Reveal, Faq, EditorialRows } from "../../components/V4Kit"
import { OutcomesV1, SavingsV3 } from "./RefSections"
import "../SubpagesV2.css"
import "./V4.css"

// Platform. Section order per the Part 1 structure doc:
//   Less work, better journeys → six capabilities → savings that compound
//   → fits the system you already run → FAQs.
// "One platform, two views" is deliberately absent — the structure doc drops it
// because Solutions carries the role-by-role view contextually.

// The six capabilities, from ProductV2.tsx. Each keeps the trigger / action /
// control / proof structure — the homepage carries the short version of the
// same four steps, so the depth lives here rather than being repeated there.
type Capability = { id: string; number: string; label: string; title: string; trigger: string; action: string; control: string; proof: string }

const CAPABILITIES: Capability[] = [
    {
        id: "plan", number: "01", label: "Plan", title: "Describe the trip. Get the itinerary.",
        trigger: "A sentence: “Singapore next Tuesday, back Friday, window seat, within policy.”",
        action: "The agent reads the intent, checks the calendar, searches live inventory, and applies company policy per employee role before options appear. It returns one recommended journey with alternates, each already compliant with policy.",
        control: "The employee chooses from options that are already compliant. Your program sets approval thresholds, preferred suppliers, and which trips need sign-off before booking.",
        proof: "< 60s to a per diem policy-enforced itinerary",
    },
    {
        id: "book", number: "02", label: "Book", title: "One approval. Everything booked together.",
        trigger: "Approval of the recommended journey, or automatic booking when the trip sits inside limits you have already set.",
        action: "Books flight, hotel, rail and car as one trip rather than four transactions. Applies wholesale rates, issues a virtual card for the booking, and syncs the itinerary to the traveler's calendar.",
        control: "Payment method and virtual card rules. Entity and cost centre allocation. What may be booked without human review.",
        proof: "20–30% below published fares*",
    },
    {
        id: "expense", number: "03", label: "Expense", title: "The report writes itself.",
        trigger: "The transaction. Nothing needs to be submitted.",
        action: "Captures the receipt, codes the expense to the right category, entity and cost centre, matches it to the original booking, processes the invoice, and posts it to your ERP.",
        control: "Chart of accounts mapping. Coding rules. Exception thresholds. Final approval before posting, if you want it.",
        proof: "0 forms filed by the traveler",
    },
    {
        id: "change", number: "04", label: "Change", title: "The trip changes. Employees get one decision.",
        trigger: "A cancellation, a delay, a schedule change, or a message from the traveler.",
        action: "Detects the disruption, often before the airline notifies, finds alternatives, prices each against cost and policy, and brings back one clear recommendation. Inside pre-agreed limits, it simply rebooks and informs employees.",
        control: "What the agent may rebook without asking. Spend ceilings for autonomous changes. Who gets notified, and when.",
        proof: "97% of the journey agent-managed",
    },
    {
        id: "support", number: "05", label: "Continuous support", title: "A real person, in the same thread.",
        trigger: "Anything the traveler would rather hand to a human.",
        action: "Escalates to a travel specialist with the full trip context already attached: every search, booking, policy check and change. The traveler never re-explains the trip.",
        control: "Escalation rules. Which trip types, travelers or regions always route to a human first.",
        proof: "24/7 human support",
    },
    {
        id: "personal", number: "06", label: "Personal travel", title: "The same agent. Separate spend.",
        trigger: "A personal trip request, in the same conversation as the work ones.",
        action: "Plans and books it on the traveler's own card, with corporate rates applied where your agreements permit. Company money is never touched and personal trips never enter company reporting.",
        control: "Whether personal travel is enabled at all, and which negotiated rates extend to it.",
        proof: "1 agent, 2 ledgers",
    },
]

// From ProductV2.tsx — "Fits the stack you already run".
const INTEGRATIONS: string[][] = [
    ["Identity", "SSO, SAML, SCIM, Okta, Entra", "Provisions and deprovisions travelers automatically. No orphaned accounts."],
    ["People", "HRIS", "Grades, entities, cost centres and managers stay current without manual upkeep."],
    ["Finance", "ERP, accounting systems, card networks", "Coded expenses post directly, corporate card spend is managed automatically, and accounts payable reconciles at source."],
    ["Work", "Calendar, email, chat", "Itineraries and changes appear where people already work."],
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

            <V4Hero
                eyebrow="Platform overview"
                title={<>One platform for<br /><em>the whole journey.</em></>}
                lede="Each capability owns a distinct part of the trip while reading the same traveler, company and journey context." />

            <OutcomesV1 />

            <section className="v4-section" id="capabilities" aria-labelledby="capabilities-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Six capabilities</span>
                        <h2 className="v4-h2" id="capabilities-title">One journey. Six jobs completed.</h2>
                        <p className="v4-lede">Every capability states what starts it, what the agent does, and what stays under your control.</p>
                    </Reveal>
                    <div className="v4-caps">
                        {CAPABILITIES.map(cap => (
                            <Reveal key={cap.id} delay={0.05}>
                                {/* The id sits on this wrapper so the mega menu's #plan … #personal
                                    links land on the capability, clear of the fixed nav. */}
                                <article className="v4-cap" id={cap.id}>
                                    <header className="v4-cap__head">
                                        <b className="v4-step__num">{cap.number}</b>
                                        <h3>{cap.title}</h3>
                                        <span className="v4-cap__label">{cap.label}</span>
                                    </header>
                                    <dl className="v4-cap__body">
                                        <div><dt>What triggers it</dt><dd>{cap.trigger}</dd></div>
                                        <div><dt>What the agent does</dt><dd>{cap.action}</dd></div>
                                        <div><dt>What you control</dt><dd>{cap.control}</dd></div>
                                    </dl>
                                    <p className="v4-cap__proof">{cap.proof}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal>
                        <div className="v4-note" style={{ marginTop: 32 }}>
                            <b>20–30%</b>
                            <div>
                                <h3>Savings, defined once.</h3>
                                <p>Savings of 20–30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.</p>
                                <p className="v4-foot-note">*Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <SavingsV3 />

            <section className="v4-section" id="integrations" aria-labelledby="integrations-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Connected systems</span>
                        <h2 className="v4-h2" id="integrations-title">Fits the system you already run.</h2>
                        <p className="v4-lede">Identity, people, finance and work tools, connected once, then quiet.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 32 }}>
                            <EditorialRows headers={["System", "Connects to", "What it does"]} rows={INTEGRATIONS} caption="Miraee integrations by system" />
                        </div>
                    </Reveal>
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
