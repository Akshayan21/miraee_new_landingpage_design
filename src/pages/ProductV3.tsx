import { Link } from "react-router-dom"
import { Reveal, V3Nav, V3Footer, Rows, Transcript } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import bookingCard from "../assets/booking-card.webp"
import changeCard from "../assets/change-card.webp"
import expensesCard from "../assets/expenses-card.webp"
import "./V3.css"

const knows = ["Who the traveler is", "Company travel policy", "Seat preferences", "Airline & hotel preferences", "Loyalty programs", "Previous behavior", "Office & location context", "Preferred timings"]

const bookingSteps = [
    { title: "Understand", body: "Miraee parses the request — dates, city, proximity to your office, return window — and applies traveler and company context." },
    { title: "Assemble", body: "Flight, hotel, and ground transportation composed as one itinerary, from global content plus your negotiated and company rates." },
    { title: "Approve", body: "If the trip needs sign-off, approval happens in the same conversation — the approver sees cost, policy fit, and alternatives." },
    { title: "Booked", body: "Confirmed end to end. Calendar holds, confirmations, and receipts organize themselves under one trip." },
]

const supportRows = [
    { title: "Proactive, not reactive", body: "Miraee watches every itinerary, contacts the traveler first, and understands exactly what a delay breaks — connections, hotels, meetings." },
    { title: "Seamless human escalation", body: "When judgment is needed, a human expert joins with the complete context. The traveler never re-explains, never re-queues." },
    { title: "Pre-trip → during → post-trip", body: "24×7 coverage across the whole journey, including VIP and executive handling for the people whose time costs the most." },
]

const expenseSteps = [
    { title: "Receipt captured", body: "Bookings file themselves; snap anything else — a taxi, a client coffee — and Miraee reads it." },
    { title: "Matched & categorized", body: "Each charge is matched to the trip, categorized, and coded against the right cost center automatically." },
    { title: "Policy checked", body: "Out-of-policy items are flagged in the moment — with context — not three weeks later by finance." },
    { title: "Prepared & submitted", body: "The report is ready before the traveler unpacks. Review, tap, done — or fully zero-touch where policy allows." },
]

export default function ProductV3() {
    usePageMeta("The Miraee experience", "Miraee understands who you are, how you fly, and what your company allows — so a trip that used to take an hour of tabs takes one sentence.")
    return (
        <div className="v3-page product-v3-page">
            <V3Nav />
            <header className="hero dark hero-simple">
                <div className="wrap subpage-hero-grid">
                    <Reveal className="subpage-hero-copy">
                        <h1 style={{ maxWidth: "18ch" }}>Your best-traveled colleague, on every trip.</h1>
                        <p className="sub">Miraee understands who you are, how you fly, and what your company allows — so a trip that used to take an hour of tabs takes one sentence.</p>
                        <div className="cta-row"><Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link></div>
                    </Reveal>
                    <Reveal className="hero-proof-panel" delay={0.08}>
                        <span className="hero-proof-panel__label">The Miraee experience</span>
                        <div className="hero-proof-panel__profile"><b>M</b><div><strong>Miraee already knows</strong><small>Who the traveler is · Company travel policy</small></div><i>Ready</i></div>
                        <div className="hero-proof-panel__rows"><span><b>01</b> Seat preferences <i>✓</i></span><span><b>02</b> Loyalty programs <i>✓</i></span><span><b>03</b> Preferred timings <i>✓</i></span></div>
                        <footer><span>One sentence</span><strong>One complete trip</strong></footer>
                    </Reveal>
                </div>
            </header>

            <section className="booking-showcase">
                <div className="wrap booking-showcase__grid">
                    <Reveal className="booking-showcase__copy">
                        <h2 className="head">One sentence. One complete trip.</h2>
                        <p className="lede">“I need to be in London Tuesday morning, close to our office, and come back Thursday evening.” That's the whole workflow. Here's what happens behind it.</p>
                        <div className="booking-context">
                            <span>Miraee already knows</span>
                            <div>{knows.map((item, index) => <p key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}</div>
                        </div>
                        <p className="lede" style={{ marginTop: 28 }}>Personalization isn't a feature in Miraee — it's the fabric. Every recommendation is already shaped to the person and the policy, so the first option shown is usually the right one.</p>
                    </Reveal>
                    <Reveal className="product-image-stage product-image-stage--booking" delay={0.08}>
                        <img src={bookingCard} alt="Miraee multi-city flight booking interface" />
                    </Reveal>
                    <div className="booking-showcase__steps">
                        <Rows items={bookingSteps} />
                        <Transcript lines={[
                            { from: "ask", text: "I need to be in London Tuesday morning, close to our office, back Thursday evening." },
                            { from: "reply", text: "— BA 178, Tue 8:40a arrival · Marriott Canary Wharf, 4 min from the office · car on landing. All in policy." },
                            { from: "ask", text: "Book it." },
                            { from: "reply", text: "Booked ✓ Itinerary on your calendar." },
                        ]} />
                    </div>
                </div>
            </section>

            <section className="dark disruption-section">
                <div className="wrap disruption-layout">
                    <Reveal className="disruption-copy">
                        <h2 className="head">AI when it's instant. Humans when it matters.</h2>
                        <p className="lede">Disruptions are where travel programs earn trust. Miraee knows about the problem before the traveler does — and never makes them start over when a human steps in.</p>
                        <div className="disruption-principles">
                            {supportRows.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
                        </div>
                    </Reveal>
                    <Reveal className="disruption-console" delay={0.08}>
                        <div className="product-change-shot"><img src={changeCard} alt="Miraee trip modification request interface" /></div>
                        <div className="disruption-console__bar"><span><i /> Active disruption</span><small>Trip · FRA 2048</small></div>
                        <div className="disruption-status"><span>Flight cancelled</span><div><b>JFK</b><i>→</i><b>FRA</b></div><small>Detected at 4:12 pm</small></div>
                        <div className="disruption-timeline">
                            <article className="disruption-event disruption-event--alert">
                                <span className="disruption-event__marker">M</span>
                                <div><small>Miraee · 4:12 pm</small><p>Your 6:30 pm to Frankfurt was just cancelled. I'm holding two alternatives: Lufthansa 7:45 pm (lands 9:10 am) or the 6:05 am tomorrow. Your hotel is flexible either way — I've already checked.</p></div>
                            </article>
                            <div className="disruption-options"><span><b>7:45 pm</b><small>Lufthansa · lands 9:10 am</small><i>Held</i></span><span><b>6:05 am</b><small>Tomorrow morning</small><i>Available</i></span></div>
                            <article className="disruption-event disruption-event--traveler">
                                <span className="disruption-event__marker">Y</span>
                                <div><small>The ask</small><p>"Take the 7:45. Can someone call me about the client dinner?"</p></div>
                            </article>
                            <article className="disruption-event disruption-event--resolved">
                                <span className="disruption-event__marker">M</span>
                                <div><small>Miraee replies</small><p>Rebooked ✓ — seat 4C, bag transferred, hotel and car adjusted. Connecting you with Priya, a senior travel expert. She has your full trip context — nothing to repeat.</p></div>
                            </article>
                        </div>
                        <footer className="human-handoff"><div><span>PS</span><p><b>Priya Shah</b><small>Senior travel expert · full context received</small></p></div><strong>Connected</strong></footer>
                    </Reveal>
                </div>
            </section>

            <section className="product-expense-section">
                <div className="wrap product-expense-grid">
                    <Reveal>
                        <h2 className="head">The best expense report is the one you never create.</h2>
                        <p className="lede">Miraee already knows what was booked, what was paid, and why. After the trip, there is no second job to do.</p>
                    </Reveal>
                    <Rows items={expenseSteps} />
                    <Reveal className="product-image-stage product-image-stage--expense" delay={0.08}><img src={expensesCard} alt="Miraee automated expense summary interface" /></Reveal>
                    <Transcript className="product-expense-transcript" lines={[
                        { from: "reply", text: "— Trip to Chicago closed. 9 receipts matched, all in policy. Expense report ready." },
                        { from: "ask", text: "Submit it." },
                        { from: "reply", text: "Submitted ✓ Reimbursement in 2–3 days." },
                    ]} />
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap">
                    <h2>Tell Miraee what you need. Miraee does the work.</h2>
                    <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
