import { useEffect } from "react"
import { Link } from "react-router-dom"
import { SiteFooter } from "../components/LegalFormKit"
import { Reveal, V2Nav, Faq, EditorialRows } from "../components/V2Kit"
import "./HomeV2Light.css"
import "./SubpagesV2.css"

const SECURITY_EMAIL = "mailto:hello@miraee.ai?subject=Security%20package%20request"

const certifications = [
    ["SOC 2 Type II", "Operational controls over security, availability and confidentiality", "In progress"],
    ["ISO 27001", "Information security management system", "In progress"],
    ["GDPR", "EU data protection, privacy by design", "Compliant"],
    ["India DPDP Act", "Indian personal data protection", "In progress"],
    ["PCI DSS", "Payment card data handling", "Via payment processor"],
]

const mayDoWithoutAsking = [
    ["Search inventory and assemble an itinerary", "Always permitted", "—"],
    ["Book a trip that is fully within policy", "Permitted", "Can require approval on any dimension"],
    ["Rebook a disrupted trip within the original fare band", "Permitted", "Ceiling set by you"],
    ["Rebook above the original cost", "Requires approval", "Threshold set by you"],
    ["Code and post an expense to the ERP", "Permitted", "Can require sign-off before posting"],
    ["Book out of policy", "Never permitted without approval", "Approver set by you"],
    ["Issue a virtual card for a booking", "Permitted within trip value", "Limits set by you"],
]

const neverDo = [
    "Move money outside the payment rails you have pre-authorised",
    "Change a policy rule, an approval chain or a spend limit",
    "Book with a supplier you have excluded",
    "Use company funds for a personal trip, or personal funds for a company trip",
    "Access or act on traveler personal data beyond the scope of the trip in hand",
    "Delete, alter or suppress an audit record",
    "Take an action it cannot log, attribute and explain",
]

const humanSits = [
    ["Setting policy and limits", "You. Always. No agent may write a rule."],
    ["Routine in-policy booking", "The agent, inside your limits."],
    ["Anything out of policy", "A named human approver you designate."],
    ["Disruption inside the fare band", "The agent, with notification."],
    ["Disruption above the fare band", "A human, with the agent's recommendation attached."],
    ["Escalation to a person", "The traveler, at any point, with full context carried over."],
]

const retention = [
    "Trip records, agent conversations and receipts are each retained on a published schedule tied to tax and audit obligations.",
    "A traveler can request deletion of personal data that falls outside what must legally be retained.",
    "When a contract ends, your data is returned in a standard exportable format and then removed from active systems.",
]

const faqs: [string, string][] = [
    ["Is Miraee SOC 2 certified?", "SOC 2 Type II certification is in progress. Ask your account team for the current target date and the interim security documentation available today."],
    ["Where is our data stored?", "Miraee stores and processes customer data in the region you select at contract — United States, European Union or India. Data does not leave the selected region except where a booking must be transmitted to a supplier to be fulfilled."],
    ["Do Miraee's AI agents use our company data to train models?", "No. Your trip data is used to personalise your own organisation's experience and is not used to train foundation models or to improve outcomes for any other customer. Personalisation is scoped to your tenant."],
    ["What can Miraee's agents do without human approval?", "Miraee's agents can search inventory, assemble itineraries, book trips that fall fully within your policy, rebook disruptions inside a fare band you define, and code expenses to your finance system. Anything out of policy, above your thresholds, or outside pre-authorised payment rails requires a named human approver. Every boundary is configurable and every action is logged."],
    ["Can we see what an agent did and why?", "Yes. Every agent action is recorded with the action taken, the agent responsible, the timestamp, the policy rule applied and the cost involved. The full audit trail is exportable at any time and cannot be altered or deleted by any agent."],
    ["How does Miraee handle traveler personal data?", "Miraee collects only the traveler data required to book and support a trip — identity details, preferences, loyalty memberships and the itinerary itself. Access is role-based, agents cannot act on personal data beyond the scope of the trip in hand, and retention periods are published."],
]

export default function SecurityV2() {
    useEffect(() => { document.title = "Security, Compliance and AI Governance — Miraee" }, [])
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/security" />
            <main id="main">
                <section className="m-hero" aria-labelledby="security-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">TRUST</p>
                        <h1 id="security-hero-title">Fast for people.<br /><em>Safe for the business.</em></h1>
                        <p className="m-lede">Every agent action is governed, permissioned, traceable and reversible. Autonomy never means blind trust.</p>
                        <div className="m-actions">
                            <a href={SECURITY_EMAIL}>Request the security package <span aria-hidden="true">↗</span></a>
                            <a href="#governance">See the boundaries <span aria-hidden="true">↓</span></a>
                        </div>
                        <div className="m-chip-row">{["SOC 2", "GDPR", "SSO / SCIM", "Audit logs"].map(c => <span key={c}>{c}</span>)}</div>
                    </Reveal>
                </section>

                <section className="m-security" aria-label="Enterprise foundations">
                    <Reveal>
                        <p className="m-eyebrow">ENTERPRISE FOUNDATIONS</p>
                        <h2>Governed.<br />Permissioned. Traceable.</h2>
                        <p>Every boundary an agent operates inside is written down, configurable, and logged — see the full governance model below.</p>
                    </Reveal>
                    <div className="m-security__marks">
                        <span><strong>SOC 2</strong><small>In progress</small></span>
                        <span><strong>GDPR</strong><small>Compliant</small></span>
                        <span><strong>SSO / SCIM</strong><small>Identity management</small></span>
                        <span><strong>Audit logs</strong><small>Every agent action</small></span>
                    </div>
                </section>

                <section id="certifications" className="m-section" aria-labelledby="certs-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">CERTIFICATIONS</p>
                        <h2 id="certs-title">Independently verified, not self-declared.</h2>
                        <p>Status stated honestly — an in-progress certification builds more trust than an ambiguous badge procurement later discovers is aspirational.</p>
                    </Reveal>
                    <div className="m-edrows m-edrows--grid m-cert-grid">
                        {certifications.map(([name, what, status]) => {
                            const cls = status === "Compliant" ? "m-edrow__status--compliant" : status === "In progress" ? "m-edrow__status--progress" : "m-edrow__status--other"
                            return (
                                <div className="m-edrow" key={name}>
                                    <strong>{name}</strong>
                                    <p className="m-edrow__desc">{what}</p>
                                    <span className={"m-edrow__status " + cls}>{status}</span>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section id="governance" className="m-section" aria-labelledby="governance-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">AI GOVERNANCE</p>
                        <h2 id="governance-title">Autonomy never means blind trust.</h2>
                        <p>Agents act inside boundaries you set. Here are the boundaries, in writing.</p>
                    </Reveal>

                    <Reveal><h3 className="m-subhead">What agents may do without asking</h3></Reveal>
                    <Reveal delay={.03}><EditorialRows caption="What agents may do without asking" headers={["Action", "Default", "Configurable"]} rows={mayDoWithoutAsking} numbered={false} columns={2} /></Reveal>

                    <Reveal delay={.06}>
                        <h3 className="m-subhead">What agents never do</h3>
                        <p className="m-note m-note--flush">Hard limits. Not configurable, in any tenant, under any setting.</p>
                        <div className="m-hardstop">{neverDo.map(x => <div key={x}><span aria-hidden="true">✕</span>{x}</div>)}</div>
                    </Reveal>

                    <Reveal delay={.09}><h3 className="m-subhead">Where the human sits</h3></Reveal>
                    <Reveal delay={.1}>
                        <div className="m-flow">
                            {humanSits.map(([stage, who]) => (
                                <div className="m-flow__step" key={stage}>
                                    <h3>{stage}</h3>
                                    <p>{who}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={.12}>
                        <h3 className="m-subhead">What data trains what</h3>
                        <div className="m-statement">
                            <p>Your trip data personalises your organisation's experience and nothing else. It is not used to train foundation models, and it is never used to improve outcomes for another customer. Personalisation is scoped to your tenant.</p>
                        </div>
                    </Reveal>

                    <Reveal delay={.14}>
                        <div className="m-splitfacts">
                            <div>
                                <h3>Retention and deletion</h3>
                                <ul>{retention.map(x => <li key={x}>{x}</li>)}</ul>
                            </div>
                            <div>
                                <h3>Every action. Every actor. Every reason.</h3>
                                <p>Each agent action is logged with what was done, which agent did it, when, under which rule, and what it cost. Exportable in full, at any time.</p>
                            </div>
                        </div>
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="ops-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">OPERATIONS</p>
                        <h2 id="ops-title">Built to keep running.</h2>
                    </Reveal>
                    <EditorialRows caption="Operations" headers={["Area", "Detail"]} columns={2} rows={[
                        ["Reliability", "Travel doesn't wait for maintenance windows. A committed uptime SLA, detailed in your service agreement, backed by 24/7 human travel support and a defined incident escalation path for administrators."],
                        ["Subprocessors", "A current list of every subprocessor, what they process and where — available on request, with advance notice before it changes."],
                    ]} />
                </section>

                <section className="m-section" aria-labelledby="security-faq-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">SECURITY FAQ</p>
                        <h2 id="security-faq-title">Questions procurement asks first.</h2>
                    </Reveal>
                    <Reveal><Faq items={faqs} /></Reveal>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">See the agent in action</p>
                        <h2>See it, handle<br />a real trip, live.</h2>
                        <p>Bring a real trip. We’ll show you how Miraee handles it in twenty minutes.</p>
                        <Link to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></Link>
                    </Reveal>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
