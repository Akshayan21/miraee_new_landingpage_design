import { useEffect } from "react"
import { Link } from "react-router-dom"
import { SiteFooter } from "../components/LegalFormKit"
import { Reveal, V2Nav, Faq, EditorialRows } from "../components/V2Kit"
import "./HomeV2Light.css"
import "./SubpagesV2.css"

const contextTrio = [
    ["01", "Traveler context", "Preferences, loyalty programs, seat and cabin history, dietary and access needs, the routes they fly most. Asked once. Applied always."],
    ["02", "Company context", "Policy rules, budget owner, approval chain, preferred suppliers, entity and cost centre. Set once. Enforced everywhere."],
    ["03", "Trip state", "Every search, decision, booking, change, payment and receipt — live, in one place, for the whole life of the trip."],
] as const

const capabilities = [
    {
        id: "plan", num: "01", title: "Describe the trip. Get the itinerary.",
        trigger: "A sentence. “Singapore next Tuesday, back Friday, window seat, within policy.”",
        does: "Reads the intent, checks the calendar, searches live inventory, applies policy before results are shown, and returns one recommended journey with alternates — each labelled in-policy or not.",
        control: "Policy rules by route, grade and trip type. Approval thresholds. Preferred suppliers. Which trips need sign-off before booking.",
        proof: "< 60s to a policy-safe itinerary",
    },
    {
        id: "book", num: "02", title: "One approval. Everything booked together.",
        trigger: "Approval of the recommended journey — or automatic booking, if the trip sits inside limits you have already set.",
        does: "Books flight, hotel, rail and car as one trip rather than four transactions. Applies wholesale rates, issues a virtual card for the booking, and syncs the itinerary to the traveler's calendar.",
        control: "Payment method and virtual card rules. Entity and cost centre allocation. What may be booked without human review.",
        proof: "20–30% below published fares*",
    },
    {
        id: "expense", num: "03", title: "The report writes itself.",
        trigger: "The transaction. Nothing needs to be submitted.",
        does: "Captures the receipt, codes the expense to the right category, entity and cost centre, matches it against the original booking, and posts it to your ERP.",
        control: "Chart of accounts mapping. Coding rules. Exception thresholds. Final approval before posting, if you want it.",
        proof: "0 forms filed by the traveler",
    },
    {
        id: "change", num: "04", title: "The trip changes. You get one decision.",
        trigger: "A cancellation, a delay, a schedule change, or a message from the traveler.",
        does: "Detects the disruption — often before the airline notifies — finds alternatives, prices each against cost and policy, and brings back one clear recommendation. Inside pre-agreed limits, it simply rebooks and tells you.",
        control: "What the agent may rebook without asking. Spend ceilings for autonomous changes. Who gets notified, and when.",
        proof: "97% of the journey agent-managed",
    },
    {
        id: "support", num: "05", title: "A real person, in the same thread.",
        trigger: "Anything the traveler would rather hand to a human.",
        does: "Escalates to a travel specialist with the full trip context already attached — every search, booking, policy check and change. The traveler never re-explains the trip.",
        control: "Escalation rules. Which trip types, travelers or regions always route to a human first.",
        proof: "24/7 human support",
    },
    {
        id: "personal", num: "06", title: "The same agent. Separate spend.",
        trigger: "A personal trip request, in the same conversation as the work ones.",
        does: "Plans and books it on the traveler's own card, with corporate rates applied where your agreements permit. Company money is never touched and personal trips never enter company reporting.",
        control: "Whether personal travel is enabled at all, and which negotiated rates extend to it.",
        proof: "1 agent, two ledgers",
    },
] as const

const workflow = [
    ["UNDERSTANDS INTENT", "One recommended journey, two alternates, the policy status of each.", "< 60 sec"],
    ["COMPLETES THE WORK", "One approval. Then a confirmed trip in the calendar.", "One approval"],
    ["STAYS AHEAD", "A notification that it is handled — or one decision if it genuinely needs you.", "24/7"],
    ["CLOSES THE LOOP", "Nothing. That is the point.", "Zero forms"],
] as const

const agents = [
    ["Booking agent", "Searches live inventory, assembles the trip, issues payment, confirms."],
    ["Policy agent", "Reads your rules and applies them before options are shown, not after they are chosen."],
    ["Negotiation agent", "Works wholesale contracts and direct connections to price the trip below published fares."],
    ["Rebooking agent", "Watches every segment and resolves disruption inside the limits you set."],
    ["Expense agent", "Captures, codes, matches and reconciles without the traveler touching a form."],
    ["Support agent", "Routes to a human with the full trip context attached."],
]

const foundation = [
    ["Global content", "Millions of properties and 500+ airlines, sourced through direct connections and wholesale agreements rather than resold inventory.", "2M+ properties"],
    ["Wholesale economics", "Negotiated rates that travel with the trip, applied automatically at booking rather than claimed back later.", "500+ airlines"],
    ["Reach", "The Tabhi network already serves a traveler base at global scale — that volume is what makes the rates possible.", "125M+ reached"],
    ["Local experiences", "Festivals, performances, markets and makers — content that no corporate channel has ever carried.", "Hyperlocal"],
] as const

const integrations = [
    ["Identity", "SSO, SAML, SCIM, Okta, Entra", "Provision and deprovision travelers automatically. No orphaned accounts."],
    ["People", "HRIS", "Grades, entities, cost centres and managers stay current without manual upkeep."],
    ["Finance", "ERP, accounting systems, card networks", "Coded expenses post directly. Reconciliation happens at source."],
    ["Work", "Calendar, email, chat", "Itineraries and changes appear where people already work."],
]

const faqs: [string, string][] = [
    ["What is Miraee?", "Miraee is an AI-native employee travel platform that plans, books, changes and expenses business trips end to end. Rather than connecting a booking tool to an expense tool, Miraee runs the entire journey on one continuous context, so the same agent that plans a trip also rebooks it during disruption and closes the expense afterwards."],
    ["How is Miraee different from a travel management company?", "A travel management company processes bookings and charges per transaction, with changes and support billed separately. Miraee is software: it understands a request in natural language, applies company policy before showing options, books the whole trip as one item, and handles changes and expenses automatically. Human travel specialists are included rather than charged per call."],
    ["What does it mean that Miraee uses AI agents?", "Miraee's agents are bounded, permissioned workers that complete tasks rather than answer questions. Separate agents own booking, policy, negotiation, rebooking, expense and support, and all of them read the same trip thread. Each agent has a written limit on what it may do without human approval, and every action it takes is logged."],
    ["Does Miraee enforce our travel policy automatically?", "Yes. Miraee applies company travel policy before search results are shown, so travelers see options that are already in policy rather than discovering violations at approval. Policy can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how the rules are configured."],
    ["Do travelers still have to file expense reports?", "No. Miraee captures the receipt at the point of transaction, codes it to the correct category, entity and cost centre, matches it against the original booking, and posts it to the finance system. Travelers do not submit reports and finance teams do not chase receipts."],
    ["What happens when a flight is cancelled or delayed?", "Miraee monitors every segment of every trip continuously and detects most disruptions before the airline notifies the traveler. The agent finds alternatives, prices each against company policy, and either rebooks automatically inside limits you have set or presents one clear recommendation for approval."],
    ["Can employees book personal travel through Miraee?", "Yes. The same agent plans personal trips using the traveler's own payment card, with corporate negotiated rates applied where supplier agreements permit. Personal spend never enters company reporting and company funds are never used, so business and personal travel stay entirely separate while sharing one experience."],
    ["What travel inventory does Miraee have access to?", "Miraee books flights, hotels, rail and car hire from live inventory sourced through direct supplier connections and wholesale agreements held by the Tabhi group, covering over 500 airlines and more than two million properties. It also carries hyperlocal experience content that is not available through other corporate travel channels."],
    ["Which systems does Miraee integrate with?", "Miraee connects to identity providers via SSO and SCIM, to HRIS platforms for traveler and cost centre data, to ERP and accounting systems for expense posting, to corporate card networks for payment, and to calendar and messaging tools for itineraries."],
    ["How long does implementation take?", "Most programs are live within weeks, not quarters. Policy is translated into rules the agent applies at search, core systems are connected, one team pilots real trips, then the rest of the company rolls out."],
]

export default function ProductV2() {
    useEffect(() => { document.title = "Miraee Product — One Agent for the Entire Business Trip" }, [])
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/product" />
            <main id="main">
                <section className="m-hero" aria-labelledby="product-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">THE PLATFORM</p>
                        <h1 id="product-hero-title">One system.<br /><em>The entire journey.</em></h1>
                        <p className="m-lede">Six capabilities running on one continuous context. Miraee doesn't pass your trip between tools — it carries it.</p>
                        <div className="m-actions">
                            <Link to="/book-a-demo">See Miraee live <span aria-hidden="true">↗</span></Link>
                            <a href="#capabilities">Jump to a capability <span aria-hidden="true">↓</span></a>
                        </div>
                        <div className="m-chip-row">{["Plan", "Book", "Expense", "Change", "Support", "Personal"].map(c => <span key={c}>{c}</span>)}</div>
                    </Reveal>
                </section>

                <section className="m-section" aria-labelledby="context-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">ONE CONTINUOUS CONTEXT</p>
                        <h2 id="context-title">The context never resets.</h2>
                        <p>Integrated tools pass records to each other. Miraee holds a single thread — so the agent that plans your trip is the agent that rebooks it, and the agent that closes the expense.</p>
                    </Reveal>
                    <div className="m-pain-grid">
                        {contextTrio.map(([n, label, body]) => (
                            <Reveal className="m-pain" key={label}>
                                <strong>{n}</strong>
                                <h3>{label}</h3>
                                <p>{body}</p>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="m-chip-row" delay={.1}>{["One thread", "One policy layer", "One data layer"].map(c => <span key={c}>{c}</span>)}</Reveal>
                    <Reveal delay={.14}><p className="m-note">Integration moves data between systems. Continuous context means there was never a second system.</p></Reveal>
                </section>

                <section id="capabilities" className="m-section" aria-labelledby="capabilities-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">SIX CAPABILITIES</p>
                        <h2 id="capabilities-title">Each one owns a job. All read the same trip.</h2>
                        <p>What triggers it, what the agent does, what you still control, and the proof point — the control story is not optional.</p>
                    </Reveal>
                    <div className="m-capabilities">
                        {capabilities.map((c, i) => (
                            <Reveal className="m-capability" id={c.id} key={c.id} delay={i * .03}>
                                <span className="m-capability__num">{c.num}</span>
                                <div className="m-capability__body">
                                    <h3>{c.title}</h3>
                                    <dl className="m-capability__fields">
                                        <div><dt>Triggers</dt><dd>{c.trigger}</dd></div>
                                        <div><dt>The agent does</dt><dd>{c.does}</dd></div>
                                        <div><dt>You control</dt><dd>{c.control}</dd></div>
                                    </dl>
                                    <strong className="m-capability__proof">{c.proof}</strong>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className="m-callout" delay={.1}>
                        <p className="m-eyebrow">THE 20–30% FIGURE</p>
                        <h3>Savings, defined once</h3>
                        <p>20–30% below published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections. Every appearance of this figure across the site carries the same definition.</p>
                        <p className="m-note">* Compared against publicly available fares for the same route, date, cabin and booking window. Individual results vary by route, lead time and travel mix.</p>
                    </Reveal>
                </section>

                <section id="how-it-works" className="m-section m-how" aria-labelledby="how-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">HOW IT WORKS</p>
                        <h2 id="how-title">Ask once. Keep moving.</h2>
                        <p>One request. Four stages. No restarts, no repeating yourself, no managing the process.</p>
                    </Reveal>
                    <Reveal className="m-request">
                        <span>Your request</span>
                        <blockquote>“Singapore next Tuesday. Window seat. Within policy.”</blockquote>
                    </Reveal>
                    <div className="m-workflow">
                        {workflow.map(([label, seen, proof], i) => (
                            <Reveal className="m-step" key={label} delay={i * .07}>
                                <span>0{i + 1}</span>
                                <small>{label}</small>
                                <h3>{seen}</h3>
                                <strong>{proof}</strong>
                            </Reveal>
                        ))}
                    </div>
                    <p className="m-note m-journey-note">JOURNEY STATE: Everything handled. Plan · book · protect · expense</p>
                </section>

                <section id="agents" className="m-section" aria-labelledby="agents-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">THE ARCHITECTURE</p>
                        <h2 id="agents-title">Not one agent. A workforce.</h2>
                        <p>Specialized agents, each owning a job, all reading the same thread. They don't answer questions — they complete work.</p>
                    </Reveal>
                    <Reveal>
                        <EditorialRows caption="Miraee's specialized agents" headers={["Agent", "What it owns"]} rows={agents} columns={2} />
                    </Reveal>
                    <Reveal delay={.08} className="m-callout">
                        <p className="m-agent-count"><strong>200+</strong><span>specialized agents in production</span></p>
                        <p className="m-note">An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone.</p>
                    </Reveal>
                </section>

                <section id="inventory" className="m-section" aria-labelledby="foundation-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">THE FOUNDATION</p>
                        <h2 id="foundation-title">Global reach. Personal execution.</h2>
                        <p>Miraee runs on Tabhi's own supply, not on a reseller's feed. Wholesale contracts, direct connections, and hyperlocal content nobody else has digitized.</p>
                    </Reveal>
                    <Reveal>
                        <EditorialRows caption="The foundation" headers={["Claim", "Detail", "Proof"]} rows={foundation.map(row => [...row])} highlightLast columns={2} />
                    </Reveal>
                    <Reveal delay={.1}><p className="m-note">Most platforms compete on software. We compete on software and supply.</p></Reveal>
                </section>

                <section id="integrations" className="m-section" aria-labelledby="integrations-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">CONNECTED</p>
                        <h2 id="integrations-title">Fits the stack you already run.</h2>
                        <p>Identity, people, finance and work tools — connected once, then quiet.</p>
                    </Reveal>
                    <Reveal><EditorialRows caption="Integrations" headers={["Category", "Connects to", "What it does"]} rows={integrations} columns={2} /></Reveal>
                </section>

                <section className="m-section" aria-labelledby="faq-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">FAQ</p>
                        <h2 id="faq-title">Questions worth answering in full.</h2>
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
