import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SiteFooter } from "../components/LegalFormKit"
import { Reveal, V2Nav, EditorialRows } from "../components/V2Kit"
import travelerImg from "../assets/team-travellers.jpg"
import "./HomeV2Light.css"
import "./SubpagesV2.css"
import { usePageMeta } from "../hooks/usePageMeta"

const employeeBlocks = [
    ["One request, one trip", "Say where and when. Miraee reads the intent, checks your calendar, and comes back with a journey that is already within policy, with flight, hotel, rail and car assembled as one thing, not four."],
    ["It already knows you", "Window seat. The airline you have status with. The hotel near the office, not the one near the airport. Told once, applied to every trip after."],
    ["When something breaks", "You get a notification, not a task. The agent sees the cancellation, finds the alternative, checks it against policy, and either fixes it or brings you one decision."],
    ["A person when you want one", "Ask for a human and you get a travel specialist in the same thread, with your whole trip already in front of them. You never re-explain anything."],
    ["Your own trips too", "The same agent plans the weekend you bolt onto the work trip using your card, your choices, and corporate rates where they apply. Company spend stays untouched."],
] as const

const financeBlocks = [
    ["Committed spend, live", "The moment a trip is booked, the cost is visible against the right entity and cost centre. You are not waiting for a card statement to find out what the quarter looks like."],
    ["Coded at the source", "Every expense is categorised, allocated and matched to its booking as it happens. Coding is a rule you set once, not a task someone performs monthly."],
    ["Reconciliation without the chase", "Receipts are captured at the transaction. Nothing is missing, so nothing is chased. Entries post to your ERP without a re-key."],
    ["Policy that actually holds", "Rules are applied before a booking exists, not flagged after it. Out-of-policy spend becomes an exception you approved, not a discovery you make later."],
    ["Savings you can audit", "Wholesale rates are applied at booking and shown against the published fare, so the saving is a line you can point at rather than a number you are asked to trust."],
] as const

const financeControls = [
    "The chart of accounts and every coding rule",
    "Approval chains, by amount, entity, grade and trip type",
    "The spend ceiling above which no agent may act alone",
    "Which suppliers and fare classes are permitted at all",
    "Final sign-off before anything posts, if you want it",
    "A complete, exportable log of every action any agent has taken",
]

const travelTeamBlocks = [
    ["Policy as a system, not a PDF", "Write the rules once and they are applied at the moment of search, for every traveler, on every route. Nobody has to read the policy to follow it."],
    ["Exceptions only", "Routine trips book themselves. What reaches you is the genuine exception: the unusual route, the over-threshold fare, or the case that needs a judgement call."],
    ["Duty of care", "Know where every traveler is, in real time. Restrict travel to specific regions, and reach anyone affected by a disruption with one message."],
    ["Groups and guests", "Offsites, conferences and candidate travel run on the same rails, with their own spend controls and their own approval path."],
    ["Non-employee travel", "Contractors, candidates and guests can be invited into a trip without being provisioned as employees or given access to company systems."],
    ["The supplier program", "Preferred agreements are enforced automatically, and the reporting shows you where the program is leaking so you can fix the rule rather than police the booking."],
] as const

const additionalPersonas = [
    ["For admins", "Set the rules once. Let the platform enforce them.", "Configure policy, approvals and budgets, then let Miraee apply them automatically across every traveler and booking.", "Manage the whole program without manual policing."],
    ["For travel leads", "Run a modern travel program without the busywork.", "Consolidate booking, spend, rewards and events into one intelligent system with the supply depth of a global marketplace behind it.", "Owned inventory · MICE · Program analytics"],
    ["For CHROs", "Travel that supports your people, not just your policy.", "A seamless traveler experience with duty of care, compliance and wellbeing built in.", "Travel becomes a talent advantage."],
    ["For managers", "Approvals that don't sit in your inbox.", "Policy-compliant trips are auto-approved. Only genuine exceptions reach you, with the context to decide in seconds.", "No more approval bottlenecks."],
]

const useCases = [
    ["Business travel", "Every business trip, end to end.", "Flights, hotels, cars, rail, expenses, policies, budgets and real-time disruptions in one system."],
    ["Meetings & events", "Group travel and events, intelligently managed.", "Automated group booking, venue sourcing, rate negotiation, event expenses and attendee itineraries."],
    ["Executive travel", "White-glove travel, automated.", "High-touch itineraries, preference learning and proactive disruption management without a dedicated handler."],
    ["Global mobility", "Cross-border travel for a distributed workforce.", "Global supply, local rates and consistent policy for remote and hybrid teams."],
    ["Emergency & disruption", "When plans break, Miraee doesn't.", "The best alternative is coordinated and confirmed before the traveler is stranded."],
]

type TabId = "employees" | "finance" | "travel-teams"

const TABS: { id: TabId; label: string; title: string; teaser: string; shift: string }[] = [
    { id: "employees", label: "FOR EMPLOYEES", title: "Ask once. Get a complete trip.", teaser: "A trip that feels personal, not procedural.", shift: "You used to assemble a trip. Now you describe one." },
    { id: "finance", label: "FOR FINANCE", title: "See spend before it becomes an expense.", teaser: "Complete transparency over company expenditure.", shift: "You used to reconcile the past. Now you watch the present." },
    { id: "travel-teams", label: "FOR TRAVEL TEAMS", title: "Set the rules once. Run by exception.", teaser: "No more managing every single booking and every single update.", shift: "You used to process bookings. Now you run a program." },
]

function isTabId(v: string): v is TabId {
    return v === "employees" || v === "finance" || v === "travel-teams"
}

export default function ForTeamsV2() {
    usePageMeta("Miraee for Business Travelers, Finance Teams and Travel Managers", "Miraee gives employees, finance teams and travel managers one AI-native platform for booking, spend, policy, support and expenses.")
    const [active, setActive] = useState<TabId>("employees")

    useEffect(() => {
        const applyHash = () => {
            const h = window.location.hash.slice(1)
            if (isTabId(h)) setActive(h)
        }
        applyHash()
        window.addEventListener("hashchange", applyHash)
        return () => window.removeEventListener("hashchange", applyHash)
    }, [])

    const select = (id: TabId) => {
        setActive(id)
        window.history.replaceState(null, "", `#${id}`)
    }

    const tab = TABS.find(t => t.id === active)!

    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/for-teams" />
            <main id="main">
                <section className="m-hero" aria-labelledby="teams-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">DESIGNED FOR EVERYONE</p>
                        <h1 id="teams-hero-title">Built for the people who plan travel, take it, pay for it, and answer for it.</h1>
                        <p className="m-lede">Whatever your role, use case, or company, Miraee removes the friction between intent and outcome.</p>
                        <div className="m-jumplinks">
                            <a href="#employees">For employees <span aria-hidden="true">↓</span></a>
                            <a href="#finance">For finance <span aria-hidden="true">↓</span></a>
                            <a href="#travel-teams">For travel teams <span aria-hidden="true">↓</span></a>
                        </div>
                    </Reveal>
                    <Reveal className="m-hero__visual" delay={.1}>
                        <img className="m-hero__photo" src={travelerImg} alt="Business traveler moving confidently through an airport lounge" width="1800" height="1202" fetchPriority="high" />
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="personas-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">MORE PERSONAS</p><h2 id="personas-title">One program. Every stakeholder.</h2></Reveal>
                    <div className="m-complete">{additionalPersonas.map(([label,title,copy,outcome]) => <Reveal className="m-complete__item" key={label}><span className="m-eyebrow">{label}</span><h3>{title}</h3><p>{copy}</p><strong>{outcome}</strong></Reveal>)}</div>
                </section>

                <section className="m-section" aria-labelledby="use-cases-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">BY USE CASE</p><h2 id="use-cases-title">Every kind of company travel.</h2></Reveal>
                    <div className="m-list m-use-cases">{useCases.map(([label,title,copy],i) => <Reveal className="m-list__row" key={label}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p><strong>{label}</strong></Reveal>)}</div>
                </section>

                <section className="m-section m-business" aria-labelledby="fit-title">
                    <Reveal className="m-section__head"><p className="m-eyebrow">BY FIT</p><h2 id="fit-title">Tuned to how your industry travels.</h2><p>Whether travel is driven by client engagement, distributed teams, field operations or events, Miraee adapts policy, supply and workflows to your patterns.</p></Reveal>
                    <Reveal className="m-splitfacts"><div><h3>Purpose-built for upper-SMB and mid-market.</h3><p>For companies with $500K-$5M in annual travel budgets and 100-3,000 employees, often running on 6 or more disconnected tools.</p></div><div><h3>Find your fit.</h3><p>Bring your travel pattern, systems and approval model. We'll show how the platform maps to them.</p><Link to="/book-a-demo">Find your fit <span aria-hidden="true">→</span></Link></div></Reveal>
                </section>

                <section id="team-select" className="m-section" aria-label="Choose your role">
                    <div className="m-anchor" id="employees" />
                    <div className="m-anchor" id="finance" />
                    <div className="m-anchor" id="travel-teams" />

                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">ONE PLATFORM · THREE VIEWS</p>
                        <h2>Same trip. A different problem solved for each of you.</h2>
                        <p>Pick the role that's yours. The platform underneath never changes.</p>
                    </Reveal>

                    <div className="m-roletabs" role="tablist" aria-label="Choose your role">
                        {TABS.map(t => (
                            <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-selected={active === t.id} aria-controls="team-panel" onClick={() => select(t.id)}>
                                <span className="m-roletabs__label">{t.label}</span>
                                <h3>{t.title}</h3>
                                <p>{t.teaser}</p>
                            </button>
                        ))}
                    </div>

                    <div key={active} id="team-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="m-rolepanel">
                            <div className="m-shift"><p><span>The shift</span>{tab.shift}</p></div>

                            {active === "employees" && (
                                <>
                                    <EditorialRows caption="For employees" headers={["Feature", "What it means"]} rows={employeeBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-chip-row">
                                        {["Twelve tabs", "Screenshotted confirmations", "Chasing approvals", "Keeping receipts", "Filing reports", "Waiting on hold"].map(x => <span key={x}>{x}</span>)}
                                    </div>
                                    <div className="m-role-close">
                                        <strong>Get 6 hours per trip planning back.</strong>
                                        <Link to="/book-a-demo">See a trip handled live <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "finance" && (
                                <>
                                    <EditorialRows caption="What changes for finance" headers={["What changes", "How"]} rows={financeBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-callout">
                                        <h3>What finance still controls</h3>
                                        <p>The objection every CFO raises about autonomous agents, answered before it's asked.</p>
                                        <ul className="m-edlist m-edlist--grid">{financeControls.map(c => <li key={c}>{c}</li>)}</ul>
                                    </div>
                                    <div className="m-role-close">
                                        <strong>Turn travel into a measurable performance engine.</strong>
                                        <Link to="/book-a-demo">Talk to us about your close <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}

                            {active === "travel-teams" && (
                                <>
                                    <EditorialRows caption="For travel teams" headers={["Capability", "What it means"]} rows={travelTeamBlocks.map(row => [...row])} columns={2} />
                                    <div className="m-role-close">
                                        <strong>24/7 agent + human care</strong>
                                        <Link to="/book-a-demo">See the console <span aria-hidden="true">↗</span></Link>
                                    </div>
                                </>
                            )}
                    </div>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">See the agent in action</p>
                        <h2>Bring a real trip.</h2>
                        <p>Twenty minutes. Your route, your policy, your edge cases. We'll run it live.</p>
                        <Link to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></Link>
                    </Reveal>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
