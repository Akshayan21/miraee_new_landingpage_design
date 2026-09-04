import { V4Page, V4Hero, V4Cta, Reveal, EditorialRows } from "../../components/V4Kit"
import { SecurityV1 } from "./RefSections"
import "../SubpagesV2.css"
import "./V4.css"

// AI & Technology. Section order per the Part 1 structure doc:
//   hero (intelligence + Tabhi) → AI vs agentic → architecture (six agents,
//   named only) → governance + "fast for people, safe for the business".
//
// The doc says the hero must not use "200 bots". It doesn't: the number appears
// once, further down, in the framing the site already uses elsewhere — six
// specialized agents, with Tabhi's automation fabric beneath them.

const CONTRAST: { tag: string; title: string; copy: string }[] = [
    { tag: "Assistant AI", title: "Answers, drafts, waits.", copy: "It presents options and leaves execution to the traveler." },
    { tag: "Agentic AI · Miraee", title: "Plans, books, reconciles.", copy: "It interprets intent, enforces policy, handles disruptions, and escalates only when judgment is needed." },
]

// Named only, no explanation — the structure doc flags the full descriptions as
// repetitive with the Platform page's six capabilities.
const AGENTS = ["Booking agent", "Policy agent", "Negotiation agent", "Rebooking agent", "Expense agent", "Support agent"]

const GUARDRAILS: string[][] = [
    ["Full audit trail", "Every agent action is recorded and attributable."],
    ["Policy and budget guardrails", "Every agent acts inside the rules and thresholds you set."],
    ["Role-based permissions", "Approvals and access follow each person's responsibilities."],
    ["Human in the loop", "Genuine exceptions pause for human judgment."],
]

export default function V4Technology() {
    return (
        <V4Page
            title="AI & Technology | The Intelligence Beneath Every Trip | Miraee"
            description="Agentic AI for employee travel: six specialized agents on Tabhi's automation fabric, bounded by policy, budget and permissions, with a complete audit trail.">

            <V4Hero
                eyebrow="AI & Technology"
                title={<>The intelligence<br /><em>beneath every trip.</em></>}
                lede="Miraee runs on Tabhi intelligence — the same engineering group behind the supply, the payments and the automation the trip already depends on." />

            <section className="v4-section v4-section--tint" id="assistant" aria-labelledby="assistant-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">AI Assistant for Every Employee</span>
                        <h2 className="v4-h2" id="assistant-title">From assistants to agents.</h2>
                        <p className="v4-lede">Most AI travel products suggest while you execute. Miraee takes action end to end — agentic AI travel, not an assistant with a travel skin.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="v4-steps" style={{ marginTop: 36 }}>
                            {CONTRAST.map(panel => (
                                <div className="v4-step" key={panel.tag}>
                                    <b className="v4-step__num">{panel.tag}</b>
                                    <h3>{panel.title}</h3>
                                    <p>{panel.copy}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="v4-section" id="architecture" aria-labelledby="architecture-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">The architecture</span>
                        <h2 className="v4-h2" id="architecture-title">Not one agent. A workforce.</h2>
                        <p className="v4-lede">Six different specialized agents each running their own allotted task, under the same thread. Beneath them sits Tabhi intelligence connecting Mondee supply, policy, payment and expense all together woven into one framework, dedicatedly working to complete one single trip.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="v4-chips" style={{ marginTop: 30 }}>
                            {AGENTS.map(agent => <li key={agent}>{agent}</li>)}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="v4-note" style={{ marginTop: 28 }}>
                            <b>6</b>
                            <div>
                                <h3>Two layers, one system.</h3>
                                <p>An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone. Competitors bolt AI onto a booking tool; here the intelligence and the supply were built together.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Governance keeps V1's "Fast for people. Safe for the business."
                treatment verbatim; the guardrail table follows it. */}
            <SecurityV1 />

            <section className="v4-section" id="guardrails" aria-labelledby="guardrails-title">
                <div className="v4-shell">
                    <Reveal>
                        <span className="v4-eyebrow">Safety & governance</span>
                        <h2 className="v4-h2" id="guardrails-title">Autonomy with guardrails.</h2>
                        <p className="v4-lede">Every action is bounded by policy, budget and permissions, then recorded in a complete audit trail. An agent that reaches the edge of what you authorised stops and asks.</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 32 }}>
                            <EditorialRows headers={["Guardrail", "What it guarantees"]} rows={GUARDRAILS} caption="Governance guardrails" />
                        </div>
                    </Reveal>
                </div>
            </section>

            <V4Cta title="See the agents work." body="Twenty minutes with your policy and your routes. Watch what runs without a human, and where one steps in." />
        </V4Page>
    )
}
