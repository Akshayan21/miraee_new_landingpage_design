import { V4Page, V4Hero, V4Cta, Reveal, MiniTable } from "../../components/V4Kit"
import { SixViews } from "./SixViews"
import type { SixViewRole } from "./SixViews"
import UseCasesShowcase from "./solutions/UseCasesShowcase"
import { useWindowWidth } from "../../hooks/useWindowSize"
import "../SubpagesV2.css"
import "./V4.css"

// Solutions. Section order:
//   six views (very minimal text) → use cases (V1.1) → persona table
//   → duty of care (reduced).
//
// The six roles are the canonical set from ForTeams.tsx. Slugs are the
// hyphenated form (travel-leads), which is what PersonaExperience and
// PersonaShowcase already use; ForTeamsV2 and Solutions.tsx each drifted to a
// different spelling and those are not carried forward here.

// Shaped for the V1.1 diptych: `shift` is the full "You used to X. Now you Y."
// sentence, which SixViews splits on "Now " into the struck-through before
// and the headline after.

const ROLES: SixViewRole[] = [
    {
        slug: "employees",
        label: "Employees",
        shift: "Used to assemble a trip. Now they describe one.",
        body: "Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone.",
        controls: ["My Trips", "Receipt Scanner", "Rewards"],
        cta: "Experience through an Employee lens",
        href: "/v4/platform#plan",
        rows: [
            "Trip planning from a sentence",
            "Policy applied before you see options",
            "Rebooking handled in the same thread",
            "Receipts captured, no report to file",
            "Personal trips on the same agent",
        ],
    },
    {
        slug: "managers",
        label: "Managers",
        shift: "You used to chase approvals. Now only exceptions reach you.",
        body: "Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage, and an AI confidence score, decide in one glance. Team Analytics gives spend vs budget and compliance without a report.",
        controls: ["Approvals", "Team Analytics", "Team Trips"],
        cta: "See approval flow",
        href: "/v4/platform#book",
        rows: [
            "Routine trips self-book inside limits",
            "Exceptions arrive with full context",
            "Team-level visibility without a report",
        ],
    },
    {
        slug: "finance",
        label: "Finance",
        shift: "You used to reconcile the past. Now you watch the present.",
        body: "Committed spend shows at booking, not month-end. Track by department, category and top spenders; move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable.",
        controls: ["Accounts", "Approval chains", "Ceilings", "Suppliers", "Sign-off", "Audit log"],
        cta: "Run the ROI calculator",
        href: "/v4/resources/calculator",
        rows: [
            "Committed spend visible at booking",
            "Automated reconciliation and ERP sync",
            "Wholesale rates 20 to 30% below published fares*",
            "Full exportable audit trail",
        ],
    },
    {
        slug: "travel-leads",
        label: "Travel leads",
        shift: "You used to process bookings. Now you run a program.",
        body: "A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee.",
        controls: ["Live Tracker", "Booking Queue", "Program analytics"],
        cta: "See the console",
        href: "/v4/platform",
        rows: [
            "Program-wide analytics by team, entity and route",
            "Direct supply through Mondee",
            "MICE and group booking built in",
            "Exceptions routed to you with context",
        ],
    },
    {
        slug: "admins",
        label: "Admins",
        shift: "You used to police every trip. Now you set the rule once.",
        body: "Policy applies at search. The Overview shows the whole program, onboarding gaps, exceptions, budget, adoption, compliance and AI savings. Manage travelers and rules, run duty of care from the Live Map, reconcile in one place. The Agentic ROI Dashboard shows what the agent saved.",
        controls: ["Overview", "Policies", "Live Map", "Agentic ROI"],
        cta: "See policy setup",
        href: "/v4/platform#change",
        rows: [
            "Per diem and policy enforced at search",
            "Approval routing by role and threshold",
            "Unified traveler profiles from HRIS",
            "One dashboard for the whole program",
        ],
    },
    {
        slug: "chros",
        label: "CHROs",
        shift: "You used to enforce policy. Now you support people.",
        body: "Your view leads with people: Travel Ready, Currently Traveling, Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking and compliance by a team from HRIS. Same policy for everyone, consumer-grade experience.",
        controls: ["Duty of Care", "Readiness", "Compliance by Team"],
        cta: "See the traveler experience",
        href: "/v4/platform#personal",
        rows: [
            "Consumer-grade traveler experience",
            "Duty of care and disruption support",
            "Policy applied the same way for everyone",
            "Optional incentives for cost-efficient choices",
        ],
    },
]

// The persona table covers the four personas named in the structure doc.
// CHROs and Managers are covered by the six views above rather than repeated
// here, which is what the doc specifies.
const PERSONA_TABLE: string[][] = [
    ["Employees", "Their own trip, inside policy", "Ask once, book in policy, keep moving", "Personal travel on the same agent", "Self-serve, agent-led"],
    ["Admins", "Policy, approval routing, profiles", "Set the rule once, enforced at search", "One dashboard for the program", "Rule-based, by exception"],
    ["Finance", "Chart of accounts, spend ceilings, sign-off", "Committed spend visible at booking", "20–30% wholesale savings", "Continuous reconciliation"],
    ["Travel leads", "Supplier program, group travel, analytics", "Run a program, not a booking queue", "Direct supply through Mondee", "Program-level, by exception"],
]

const DUTY_ROWS: [string, string][] = [
    ["Real-time location", "Know where every traveler is, from booked segments and check-ins, with role-based access."],
    ["Risk monitoring", "Disruption, weather and advisory alerts matched to itineraries."],
    ["Instant response", "Rebook, reroute or reach a human from the same thread."],
    ["Audit-ready records", "Every action logged with actor, rule, time and cost."],
]

export default function V4Solutions() {
    const isMobile = useWindowWidth() < 900

    return (
        <V4Page
            title="Solutions by Role and Use Case | Miraee"
            description="One platform, six views. What changes for employees, finance, travel leads, admins, CHROs and managers — plus every kind of company travel.">

            <V4Hero
                eyebrow="Solutions"
                title={<>Six views.<br /><em>What changes, role by role.</em></>}
                lede="Same trip. A different problem solved for each of you." />

            <SixViews roles={ROLES} isMobile={isMobile} />

            <section className="v4-section" id="personas" aria-labelledby="personas-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Persona table</span>
                        <h2 className="v4-h2" id="personas-title">Control, benefit and model, side by side.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 28 }}>
                            <MiniTable
                                headers={["Persona", "What they control", "What changes", "The perk", "Operating model"]}
                                rows={PERSONA_TABLE}
                                caption="What each persona controls and gains" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <UseCasesShowcase />

            <section className="v4-section" id="duty-of-care" aria-labelledby="duty-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Duty of care</span>
                        <h2 className="v4-h2" id="duty-title">Your people travel everywhere. No one is ever alone out there.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {DUTY_ROWS.map(([title, copy], index) => (
                                <div className="v4-step" key={title}>
                                    <b className="v4-step__num">0{index + 1}</b>
                                    <h3>{title}</h3>
                                    <p>{copy}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal>
                        <p className="v4-foot-note" style={{ marginTop: 24 }}>*Savings of 20–30% against published fares on comparable itineraries. Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.</p>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="Bring a real trip." body="Twenty minutes with your policy and your routes, from whichever seat you sit in." />
        </V4Page>
    )
}
