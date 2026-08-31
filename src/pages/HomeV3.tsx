import { Link } from "react-router-dom"
import { Reveal, V3Nav, V3Footer, Transcript } from "../components/V3Kit"
import { usePageMeta } from "../hooks/usePageMeta"
import travelerHero from "../assets/miraee-traveler-hero.webp"
import bookingCard from "../assets/booking-card.webp"
import "./V3.css"

const outcomes = [
    ["01", "Save more", "Global content, negotiated fares, policy-aware AI, and behavioral nudges that continuously optimize what travel costs.", "/v3/savings"],
    ["02", "Travel better", "One request books the whole trip — flight, hotel, and ground — tuned to each traveler's preferences and loyalty programs.", "/v3/product"],
    ["03", "Get help instantly", "AI that fixes disruptions before you notice, and human experts who pick up mid-sentence — never start over.", "/v3/product"],
    ["04", "Reward your people", "Smart choices earn real rewards in the Miraee Wallet. Travel becomes a benefit, not a chore.", "/v3/hr"],
    ["05", "Stay in control", "Spend, savings, policy, approvals, and duty of care — complete visibility for the enterprise, zero friction for employees.", "/v3/enterprise"],
] as const

const broken = ["Search five tools", "Compare fares", "Decode the policy PDF", "Book flight here, hotel there", "Hold for support", "Save every receipt", "Build the expense report", "Chase the refund"]

const loop = [
    ["Employee chooses smart", "Miraee surfaces a better option and a price to beat."],
    ["Company saves", "Savings are captured and visible in real time."],
    ["Employee earns", "Rewards land in the Miraee Wallet."],
    ["Adoption grows", "More trips on Miraee — more savings next quarter."],
] as const

export default function HomeV3() {
    usePageMeta("Travel Limitless with Miraee", "One intelligent AI travel companion that understands the traveler, understands the company, and manages every journey end to end — search, booking, changes, support, and expenses in a single conversation.")
    return (
        <div className="v3-page">
            <V3Nav />
            <header className="hero">
                <div className="wrap">
                    <div className="hero-grid">
                        <Reveal className="hero-copy">
                            <h1>Travel <em className="accent-word">limitless</em> with Miraee.</h1>
                            <p className="sub">One intelligent AI travel companion that understands the traveler, understands the company, and manages every journey end to end — search, booking, changes, support, and expenses in a single conversation.</p>
                            <div className="cta-row">
                                <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                                <Link className="btn btn-line" to="/v3/product">See how it works</Link>
                            </div>
                            <div className="fact-line">
                                <span>Flights · hotels · cars</span>
                                <span className="sep">·</span>
                                <span>Savings &amp; wallet</span>
                                <span className="sep">·</span>
                                <span>AI + human support</span>
                                <span className="sep">·</span>
                                <span>Zero-touch expense</span>
                            </div>
                        </Reveal>
                        <Reveal className="hero-visual" delay={0.1}>
                            <img className="hero-visual__photo" src={travelerHero} alt="Business traveler using Miraee at an airport lounge" />
                        </Reveal>
                    </div>
                </div>
            </header>

            <section className="dark problem-section">
                <div className="wrap problem-layout">
                    <Reveal className="problem-intro">
                        <h2 className="head">Travel today is broken.</h2>
                        <p className="lede">To take one business trip, an employee or admin has to search multiple tools, compare, book, decode the policy, manage changes, call support, save receipts, and file expenses. Every step in a different place.</p>
                    </Reveal>
                    <div className="problem-flow" aria-label="The fragmented travel workflow">
                        {broken.map((item, index) => <Reveal className="problem-step" key={item} delay={index * .035}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><i aria-hidden="true">×</i></Reveal>)}
                        <Reveal className="problem-resolution" delay={.2}>
                            <span>01</span>
                            <p>Miraee replaces all of it with <strong>one conversation.</strong></p>
                            <i aria-hidden="true">→</i>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="experience-section">
                <div className="wrap experience-layout">
                    <Reveal className="experience-copy">
                        <h2 className="head">Tell Miraee what you need. Miraee does the work.</h2>
                        <p className="lede">Miraee already knows who's traveling, what the policy allows, which fares your company negotiated, and how you like to fly. You just say where you need to be.</p>
                        <div className="experience-facts" aria-label="What Miraee handles">
                            <span><b>01</b> Traveler preferences</span>
                            <span><b>02</b> Company policy</span>
                            <span><b>03</b> Negotiated fares</span>
                        </div>
                    </Reveal>

                    <Reveal className="journey-console" delay={0.08}>
                        <img className="journey-console__product" src={bookingCard} alt="Miraee multi-city booking interface" />
                        <Transcript lines={[
                            { from: "ask", text: "Get me to Chicago Monday, back Wednesday evening." },
                            { from: "reply", text: <>United 6:10a in your aisle seat, Hyatt two blocks from the client — both in policy, on your company rate. The 7:05a departure <strong>saves $61</strong> and still lands before your 9:30. Take it?</> },
                            { from: "ask", text: "Take it. Add a car." },
                            { from: "reply", text: <>Done — flight, hotel, and car booked under one trip. Approval wasn't needed; you were inside policy. <strong>+610 points</strong> to your Miraee Wallet for beating the price to beat.</> },
                        ]} />
                    </Reveal>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Five outcomes. One companion.</h2>
                    </Reveal>
                    <div className="tiles">
                        {outcomes.map(([n, title, copy, href]) => (
                            <Reveal key={title}>
                                <Link className="tile" to={href}>
                                    <span className="num">{n}</span><h3>{title}</h3><p>{copy}</p>
                                </Link>
                            </Reveal>
                        ))}
                        <Reveal>
                            <div className="tile cta-tile">
                                <span className="num">06</span>
                                <h3 style={{ color: "#fff" }}>See it live</h3>
                                <p>Twenty minutes with your policy and your routes. We'll show you the savings.</p>
                                <Link className="btn btn-solid" style={{ marginTop: 18, background: "var(--tangerine)" }} to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section style={{ paddingTop: 0 }}>
                <div className="wrap">
                    <Reveal>
                        <h2 className="head">Savings that compound on their own.</h2>
                        <p className="lede">Miraee doesn't enforce savings with restrictive policy alone — it rewards the behavior that creates them.</p>
                    </Reveal>
                    <div className="timeline">
                        {loop.map(([title, copy]) => (
                            <Reveal className="stop" key={title}><span className="dot" /><b>{title}</b><span>{copy}</span></Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="wrap">
                    <h2>Corporate travel reimagined around the traveler.</h2>
                    <Link className="btn btn-solid" to="/v3/demo">Book a demo <span className="arr">→</span></Link>
                </div>
            </section>
            <V3Footer />
        </div>
    )
}
