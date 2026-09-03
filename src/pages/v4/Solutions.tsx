import { V4Page, V4Hero, V4Cta, Reveal, MiniTable } from "../../components/V4Kit"
import { SixViews } from "./SixViews"
import type { SixViewRole } from "./SixViews"
import { useWindowWidth } from "../../hooks/useWindowSize"
import "../SubpagesV2.css"
import "./V4.css"

// Solutions. Section order per the Part 1 structure doc:
//   six views (very minimal text) → persona table → use cases (reduced)
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
        slug: "employees", label: "Employees",
        shift: "You used to assemble a trip. Now you describe one.",
        cta: "See a trip get planned", href: "/v4/platform#plan",
        rows: ["Trip planning from a sentence", "Policy applied before you see options", "Rebooking handled in the same thread", "Receipts captured, no report to file", "Personal trips on the same agent"],
    },
    {
        slug: "finance", label: "Finance",
        shift: "You used to reconcile the past. Now you watch the present.",
        cta: "Run the ROI calculator", href: "/v4/resources/calculator",
        rows: ["Committed spend visible at booking", "Automated reconciliation and ERP sync", "Wholesale rates 20 to 30% below published fares*", "Full exportable audit trail"],
    },
    {
        slug: "travel-leads", label: "Travel leads",
        shift: "You used to process bookings. Now you run a program.",
        cta: "See the console", href: "/v4/platform",
        rows: ["Program-wide analytics by team, entity and route", "Direct supply through Mondee", "MICE and group booking built in", "Exceptions routed to you with context"],
    },
    {
        slug: "admins", label: "Admins",
        shift: "You used to police every trip. Now you set the rule once.",
        cta: "See policy setup", href: "/v4/platform#change",
        rows: ["Per diem and policy enforced at search", "Approval routing by role and threshold", "Unified traveler profiles from HRIS", "One dashboard for the whole program"],
    },
    {
        slug: "chros", label: "CHROs",
        shift: "You used to enforce policy. Now you support people.",
        cta: "See the traveler experience", href: "/v4/platform#personal",
        rows: ["Consumer-grade traveler experience", "Duty of care and disruption support", "Policy applied the same way for everyone", "Optional incentives for cost-efficient choices"],
    },
    {
        slug: "managers", label: "Managers",
        shift: "You used to chase approvals. Now only exceptions reach you.",
        cta: "See approval flow", href: "/v4/platform#book",
        rows: ["Routine trips self-book inside limits", "Exceptions arrive with full context", "Team-level visibility without a report"],
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

const USE_CASES: { id: string; label: string; title: string; copy: string }[] = [
    { id: "use-business", label: "Business travel", title: "Every business trip, end to end.", copy: "Booking, changes and expense for everyday trips — flights, hotels, cars and rail — inside policy, without a queue." },
    { id: "use-events", label: "Meetings & events", title: "Group travel and events, intelligently managed.", copy: "MICE, group booking, venue sourcing and attendee management on the same platform and the same ledger." },
    { id: "use-executive", label: "Executive travel", title: "White-glove travel, automated.", copy: "High-touch itineraries and preference learning give executives a premium experience without a dedicated handler." },
    { id: "use-mobility", label: "Global mobility", title: "Cross-border travel for a distributed workforce.", copy: "Entity-level policy, currency and data residency handled, with global supply and local rates everywhere." },
    { id: "use-disruption", label: "Emergency & disruption", title: "When plans break, Miraee doesn't.", copy: "Cancellations, delays and reroutes managed proactively in one thread, confirmed before the traveler is stranded." },
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

            <section className="v4-section v4-section--tint" id="use-cases" aria-labelledby="use-cases-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">By use case</span>
                        <h2 className="v4-h2" id="use-cases-title">Every kind of company travel.</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {USE_CASES.map((useCase, index) => (
                                <div className="v4-step" key={useCase.id} id={useCase.id}>
                                    <b className="v4-step__num">0{index + 1}</b>
                                    <h3>{useCase.title}</h3>
                                    <p>{useCase.copy}</p>
                                    <span className="v4-step__tag">{useCase.label}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

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
