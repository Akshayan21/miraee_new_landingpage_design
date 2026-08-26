import { useEffect } from "react"
import { Link } from "react-router-dom"
import { SiteFooter } from "../components/LegalFormKit"
import { Reveal, V2Nav, Faq, EditorialRows, MiniTable } from "../components/V2Kit"
import "./HomeV2Light.css"
import "./SubpagesV2.css"

const shift = [
    ["Planning a trip", "The traveler searches across tools, guesses at policy, and assembles an itinerary themselves.", "The traveler describes the trip. A policy-safe itinerary comes back in under a minute."],
    ["Staying in policy", "Policy is a document. Violations are discovered at approval, after the choice is made.", "Policy is applied at search. Out-of-policy options are never presented in the first place."],
    ["Getting approval", "A request sits in a queue while someone reconstructs the context to judge it.", "Routine trips book themselves. What reaches an approver is a genuine exception, with full context attached."],
    ["Handling disruption", "The traveler discovers the cancellation, then opens a ticket and waits.", "The agent detects it, prices alternatives against policy, and either rebooks or brings one decision."],
    ["Filing the expense", "The traveler collects receipts, codes them, and submits a report. Finance chases the gaps.", "The expense is captured, coded and reconciled at the transaction. No report exists to file."],
    ["Getting help", "A support queue with none of the trip context. The traveler re-explains everything.", "A travel specialist in the same thread, with the whole trip already in front of them."],
]

const capabilityCompare = [
    ["Natural-language planning", "—", "—", "Included"],
    ["Policy applied before booking", "Partial", "Partial", "Included"],
    ["Proactive disruption handling", "Reactive", "—", "Included"],
    ["Expense prepared automatically", "—", "Partial", "Included"],
    ["Business and personal travel", "—", "—", "Included"],
    ["24/7 human support", "Included", "Ticket queue", "Included"],
    ["Agents that complete the work", "—", "—", "Included"],
]

const commercials = [
    ["Booking fees", "Per transaction", "Usually none", "None"],
    ["Change and cancellation fees", "Per change", "Varies", "None"],
    ["Cost of speaking to a human", "Per call or service tier", "Not offered", "Included"],
    ["Expense management", "Separate contract", "Included", "Included"],
    ["Expense reports per trip", "One", "One", "Zero"],
    ["Time to go live", "Months", "Weeks", "Weeks"],
    ["Contract length", "Multi-year typical", "Annual", "Flexible"],
]

const hardQuestions: [string, string][] = [
    ["“We just signed with our TMC.”", "Most travel contracts have a volume commitment rather than an exclusivity clause. Companies commonly run Miraee alongside an existing agreement for a single team or region first, then move the rest at renewal. We will read your contract with you and tell you honestly whether now is the right moment — including when it isn't."],
    ["“Our travelers won't adopt another tool.”", "They are not being asked to learn a tool. They describe the trip in a sentence and it comes back booked. Adoption resistance in corporate travel comes from tools that demand more of the traveler than the workaround does; Miraee demands less than booking it themselves on a consumer site, which is what most people currently do."],
    ["“We can't let AI book without approval.”", "Then don't. Every boundary is configurable and every default can be tightened, including requiring approval on every booking. Most companies start there and loosen the limits once they can see the audit trail. What agents may and may not do is published in full on our security page, not buried in a contract."],
    ["“Our travel policy is too complex.”", "Complex policy is the argument for this, not against it. Rules that vary by route, grade, entity and trip type are exactly what people fail to follow when policy is a document. Applied at the point of search, complexity costs the traveler nothing because they never see the options that don't apply to them."],
    ["“What happens when a trip goes badly wrong?”", "A human travel specialist, 24/7, in the same thread, with the full trip context already in front of them — included, not billed per call. Automation that cannot escalate is a trap, which is why escalation is a product decision rather than an exception."],
    ["“You're new.”", "The software is. The company is not. Miraee is built by Tabhi — a group of 23 travel businesses holding direct supplier contracts, institutionally backed, already serving travelers at global scale. We are not reselling someone else's inventory or hoping to raise the next round."],
]

const switching = [
    ["Policy", "We translate your existing travel policy into rules the agent applies at the point of search.", "Miraee, with your travel team"],
    ["Connect", "SSO, HRIS and ERP connected. Travelers provisioned automatically.", "Miraee, with your IT team"],
    ["Pilot", "One team, real trips, live support. The rules get adjusted against reality, not assumptions.", "Both"],
    ["Roll out", "Company-wide, with traveler onboarding and admin training.", "Miraee"],
]

const notTheAnswer = [
    "You need offline, human-brokered travel for every trip. A traditional TMC will serve you better, and we will say so.",
    "Your travel is almost entirely one repeated route with a single supplier. The savings case will be thin.",
    "You need a general spend management platform. Miraee handles travel-related expense; it is not a procurement or accounts payable system.",
]

export default function WhyMiraeeV2() {
    useEffect(() => {
        document.title = "Why Miraee — The Alternative to Legacy Corporate Travel"
        const description="Legacy TMCs charge per transaction. First-generation travel and expense tools move the work to employees. Miraee replaces both with one agent that handles the entire trip.";let meta=document.querySelector<HTMLMetaElement>('meta[name="description"]');if(!meta){meta=document.createElement("meta");meta.name="description";document.head.appendChild(meta)};meta.content=description
    }, [])
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav active="/why-miraee" />
            <main id="main">
                <section className="m-hero" aria-labelledby="why-hero-title">
                    <Reveal className="m-hero__copy">
                        <p className="m-eyebrow">WHY MIRAEE</p>
                        <h1 id="why-hero-title">Your travel program isn't broken.<br /><em>Its architecture is.</em></h1>
                        <p className="m-lede">Every tool in corporate travel solved one stage and handed the traveler to the next one. The problem was never the booking screen. It was the handoff.</p>
                        <div className="m-actions">
                            <Link to="/book-a-demo">See the difference live <span aria-hidden="true">↗</span></Link>
                            <a href="#compare">Compare side by side <span aria-hidden="true">↓</span></a>
                        </div>
                    </Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="shift-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">WHAT ACTUALLY CHANGES</p>
                        <h2 id="shift-title">From tools that wait to agents that act.</h2>
                        <p>The difference is not the interface. It is who does the work.</p>
                    </Reveal>
                    <Reveal><EditorialRows caption="What changes with Miraee" headers={["The job", "Today", "With Miraee"]} rows={shift} columns={2} /></Reveal>
                </section>

                <section id="compare" className="m-section m-comparison" aria-labelledby="compare-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">SIDE BY SIDE</p>
                        <h2 id="compare-title">Same trip. Different operating model.</h2>
                    </Reveal>
                    <Reveal>
                        <h3 className="m-subhead">Capability</h3>
                        <MiniTable caption="Capability comparison" headers={["Capability", "Legacy TMC", "First-gen T&E", "Miraee"]} rows={capabilityCompare} highlightLast checkmark />
                    </Reveal>
                    <Reveal delay={.08}>
                        <h3 className="m-subhead">Commercials</h3>
                        <MiniTable caption="Commercial terms comparison" headers={["Terms", "Legacy TMC", "First-gen T&E", "Miraee"]} rows={commercials} highlightLast checkmark />
                    </Reveal>
                </section>

                <section className="m-section" aria-labelledby="hard-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">THE HARD QUESTIONS</p>
                        <h2 id="hard-title">What people ask before they switch.</h2>
                    </Reveal>
                    <Reveal><Faq items={hardQuestions} /></Reveal>
                </section>

                <section className="m-section m-tint-band" aria-labelledby="switching-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">SWITCHING</p>
                        <h2 id="switching-title">Live in weeks, not quarters.</h2>
                        <p>Most of the work is decisions, not deployment.</p>
                    </Reveal>
                    <div className="m-rowlist">
                        {switching.map(([step, what, who], i) => (
                            <Reveal className="m-rowrow" key={step} delay={i * .04}>
                                <span>0{i + 1}</span>
                                <div>
                                    <h3>{step}</h3>
                                    <p>{what}</p>
                                    <p className="m-note">{who}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="m-section" aria-labelledby="honesty-title">
                    <Reveal className="m-section__head">
                        <p className="m-eyebrow">HONESTY</p>
                        <h2 id="honesty-title">When we're not the right fit.</h2>
                        <p>We would rather tell you now than in month four.</p>
                    </Reveal>
                    <Reveal><ul className="m-edlist">{notTheAnswer.map(x => <li key={x}>{x}</li>)}</ul></Reveal>
                </section>

                <section className="m-cta">
                    <Reveal>
                        <p className="m-eyebrow">SEE THE AGENT IN ACTION</p>
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
