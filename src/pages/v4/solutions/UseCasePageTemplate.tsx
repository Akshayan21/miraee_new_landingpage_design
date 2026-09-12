import React from "react"
import { Link } from "react-router-dom"
import { V4Page, Reveal } from "../../../components/V4Kit"
import "./UseCasesShowcase.css"
import "../V4.css"

export interface UseCaseBlock {
    title: string
    body: string
}

export interface UseCaseConfig {
    slug: string
    title: string
    headline: string
    subline: string
    blocks: UseCaseBlock[]
    accentTag: string
    simulation: React.ReactNode
}

const ALL_USE_CASES = [
    { slug: "business-travel", title: "Business Travel", path: "/v4/solutions/business-travel" },
    { slug: "meetings-events", title: "MICE & Bleisure", path: "/v4/solutions/meetings-events" },
    { slug: "executive-travel", title: "Executive Travel", path: "/v4/solutions/executive-travel" },
    { slug: "global-mobility", title: "Global Mobility", path: "/v4/solutions/global-mobility" },
    { slug: "emergency-disruption", title: "Emergency & Disruption", path: "/v4/solutions/emergency-disruption" },
]

export default function UseCasePageTemplate({
    slug,
    title,
    headline,
    subline,
    blocks,
    accentTag,
    simulation,
}: UseCaseConfig) {
    const otherCases = ALL_USE_CASES.filter((item) => item.slug !== slug)

    return (
        <V4Page
            title={`${title} | Use Cases | Miraee`}
            description={subline}>

            {/* Tight header with exact same styling as RoleShowcasePage to eliminate excess gap */}
            <section className="v4-section" style={{ paddingTop: "clamp(90px, 10vw, 112px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
                <div className="v4-shell">
                    <header className="v4-role-header-content">
                        <Reveal>
                            <span className="v4-role-eyebrow">BY USE CASE</span>
                            <h1 className="v4-role-title">{headline}</h1>
                            <p className="v4-role-lede">{subline}</p>
                        </Reveal>
                    </header>

                    {/* Creative Animated Showcase Card */}
                    <div className="v4-uc-stage" style={{ marginTop: 24 }}>
                        {/* Left Column: Context + CTA */}
                        <div className="v4-uc-stage-content">
                            <div className="v4-uc-meta-top">
                                <span className="v4-uc-badge">BY USE CASE</span>
                                <span className="v4-uc-tag">{accentTag}</span>
                            </div>

                            <h2 className="v4-uc-title" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
                                {title}
                            </h2>

                            {/* Action CTA */}
                            <div style={{ marginTop: 28 }}>
                                <Link to="/book-demo" className="v4-btn v4-btn--solid">
                                    Book a demo for {title}
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Live Simulated UI Console */}
                        <div className="v4-uc-stage-preview">
                            <div className="v4-uc-sim-screen">
                                <div className="v4-uc-sim-header">
                                    <div className="v4-uc-sim-dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <span className="v4-uc-sim-title">
                                        {title.toUpperCase()} SIMULATION
                                    </span>
                                    <span className="v4-uc-sim-status">
                                        <span className="v4-uc-live-dot" /> LIVE
                                    </span>
                                </div>

                                <div className="v4-uc-sim-body">
                                    {simulation}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Use case blocks */}
                    {blocks && blocks.length > 0 && (
                        <div className="v4-navan-pillars-wrap">
                            <div className="v4-navan-pillars-grid">
                                {blocks.map((b, i) => (
                                    <Reveal className="v4-navan-pillar-card" key={b.title} delay={i * 0.08}>
                                        <span className="v4-navan-pillar-num">0{i + 1}</span>
                                        <h3 className="v4-navan-pillar-heading">{b.title}</h3>
                                        <p className="v4-navan-pillar-desc">{b.body}</p>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick navigation to other use cases */}
                    <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--m-line)" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--m-muted)", marginBottom: 16 }}>
                            Explore other use cases
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                            {otherCases.map((item) => (
                                <Link
                                    key={item.slug}
                                    to={item.path}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 16px",
                                        borderRadius: 12,
                                        background: "var(--m-surface)",
                                        border: "1px solid var(--m-line)",
                                        textDecoration: "none",
                                        color: "var(--m-maroon)",
                                        fontWeight: 700,
                                        fontSize: "0.92rem",
                                        transition: "border-color 0.2s ease, transform 0.2s ease",
                                    }}>
                                    <span>{item.title}</span>
                                    <span style={{ color: "var(--m-orange)" }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </V4Page>
    )
}
