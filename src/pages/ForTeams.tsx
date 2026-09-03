import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11Hero from "../components/V11Hero"
import PersonaExperience, { PERSONA_SCRIPTS } from "../components/PersonaExperience"
import forTeamsImg from "../../images/weavy/v1/solutions/v1-solutions-managers.webp"
import "./HomeV12.css"

// ─── Page 3. For Teams ────────────────────────────────────────────────────────
// Copy is taken verbatim from the website content document (Part 3, Page 3).
// Section order: hero → fit → six role views → use cases → duty of care → CTA.

const T = {
    ink: "var(--text)",
    maroon: "#450E14",
    orange: "#E55602",
    cream: "#FBF6F2",
    muted: "rgba(var(--text-rgb),0.45)",
    mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

const F = "Plus Jakarta Sans, sans-serif"
const SERIF = "Cardo, serif"

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

function Label({ text }: { text: string }) {
    return (
        <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, marginBottom: 18 }}>
            {text}
        </div>
    )
}

// ─── 2 Fit ────────────────────────────────────────────────────────────────────
function Fit() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <Label text="Fit" />
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Who Miraee is <span style={{ color: T.accent, fontStyle: "italic" }}>for.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: isMobile ? 16 : 18, lineHeight: 1.75, color: T.muted, margin: "0 0 36px" }}>
                        Miraee is built for upper-SMB and mid-market companies, typically 100 to 3,000 employees and $500K to $5M in annual travel spend, running six or more disconnected tools today. Growth-stage teams get a program with no admin overhead. Multi-region companies get entity-level control, MICE and consolidated reporting on the same platform.
                    </p>
                    <a href="/book-a-demo" style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Find your fit →
                    </a>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 3 One platform, six views ────────────────────────────────────────────────
type Role = { label: string; slug: string; shift: string; rows: string[]; cta: string; href: string }

const ROLES: Role[] = [
    {
        label: "Employees",
        slug: "employees",
        shift: "You used to assemble a trip. Now you describe one.",
        rows: [
            "Trip planning from a sentence",
            "Policy applied before you see options",
            "Rebooking handled in the same thread",
            "Receipts captured, no report to file",
            "Personal trips on the same agent",
        ],
        cta: "See a trip get planned",
        href: "/v1.1/product",
    },
    {
        label: "Finance",
        slug: "finance",
        shift: "You used to reconcile the past. Now you watch the present.",
        rows: [
            "Committed spend visible at booking",
            "Automated reconciliation and ERP sync",
            "Wholesale rates 20 to 30% below published fares*",
            "Full exportable audit trail",
            "What finance still controls: chart of accounts, approval chains, spend ceilings, permitted suppliers, final sign-off, exportable log",
        ],
        cta: "Run the ROI calculator",
        href: "/v1.1/resources",
    },
    {
        label: "Travel leads",
        slug: "travel-leads",
        shift: "You used to process bookings. Now you run a program.",
        rows: [
            "Program-wide analytics by team, entity and route",
            "Direct supply through Mondee",
            "MICE and group booking built in",
            "Exceptions routed to you with context",
        ],
        cta: "See the console",
        href: "/v1.1/product",
    },
    {
        label: "Admins",
        slug: "admins",
        shift: "You used to police every trip. Now you set the rule once.",
        rows: [
            "Per diem and policy enforced at search",
            "Approval routing by role and threshold",
            "Unified traveler profiles from HRIS",
            "One dashboard for the whole program",
        ],
        cta: "See policy setup",
        href: "/v1.1/product",
    },
    {
        label: "CHROs",
        slug: "chros",
        shift: "You used to enforce policy. Now you support people.",
        rows: [
            "Consumer-grade traveler experience",
            "Duty of care and disruption support",
            "Policy applied the same way for everyone",
            "Optional incentives for cost-efficient choices",
        ],
        cta: "See the traveler experience",
        href: "/v1.1/product",
    },
    {
        label: "Managers",
        slug: "managers",
        shift: "You used to chase approvals. Now only exceptions reach you.",
        rows: [
            "Routine trips self-book inside limits",
            "Exceptions arrive with full context",
            "Team-level visibility without a report",
        ],
        cta: "See approval flow",
        href: "/v1.1/product",
    },
]

function RoleViews() {
    const w = useWindowWidth()
    const isMobile = w < 900
    const [active, setActive] = useState(0)
    const role = ROLES[active]

    // Home links each of its three cards to a role here (e.g. #finance), so
    // open that tab on arrival and keep responding to in-page hash changes.
    useEffect(() => {
        const openFromHash = () => {
            const slug = window.location.hash.replace("#", "")
            if (!slug) return
            const i = ROLES.findIndex(r => r.slug === slug)
            if (i >= 0) setActive(i)
        }
        openFromHash()
        window.addEventListener("hashchange", openFromHash)
        return () => window.removeEventListener("hashchange", openFromHash)
    }, [])

    return (
        <section id="roles" style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px", scrollMarginTop: 90 }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <Label text="One platform, six views" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: 0 }}>
                            What changes, <span style={{ color: T.accent, fontStyle: "italic" }}>role by role.</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(220px, 0.5fr) minmax(0, 1fr)", gap: isMobile ? 24 : 56, alignItems: "start" }}>
                    {/* Tabs */}
                    <div role="tablist" aria-label="Explore Miraee by role"
                        style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : undefined, flexDirection: isMobile ? undefined : "column", gap: isMobile ? 8 : 0, borderTop: isMobile ? "none" : `1px solid ${T.mutedLight}` }}>
                        {ROLES.map((r, i) => {
                            const on = i === active
                            return (
                                <button key={r.label} id={r.slug} role="tab" aria-selected={on} onClick={() => setActive(i)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 12, width: "100%", minHeight: isMobile ? 48 : 66,
                                        padding: isMobile ? "10px 14px" : "0 14px", cursor: "pointer", textAlign: "left",
                                        border: isMobile ? `1px solid ${on ? T.orange : T.mutedLight}` : "none",
                                        borderBottom: isMobile ? undefined : `1px solid ${T.mutedLight}`,
                                        borderLeft: isMobile ? undefined : `3px solid ${on ? T.orange : "transparent"}`,
                                        borderRadius: isMobile ? 12 : 0,
                                        background: on ? "rgba(229,86,2,0.06)" : "transparent",
                                        fontFamily: F, transition: "background .25s, border-color .25s",
                                    }}>
                                    <span style={{ fontFamily: F, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: T.orange }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <b style={{ fontFamily: F, fontSize: isMobile ? 14 : 16, fontWeight: 650, color: on ? T.ink : T.muted }}>{r.label}</b>
                                </button>
                            )
                        })}
                    </div>

                    {/* Panel — keyed so it re-animates on every role switch. */}
                    <div>
                        <motion.div key={role.label}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            style={{ background: T.maroon, borderRadius: 24, padding: isMobile ? "32px 26px" : "48px 44px", color: T.cream }}>
                            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,246,242,0.55)", marginBottom: 16 }}>
                                {role.label}
                            </div>
                            <h3 style={{ fontFamily: SERIF, fontSize: isMobile ? 26 : "clamp(28px, 2.6vw, 38px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", color: T.cream, margin: "0 0 28px" }}>
                                {role.shift}
                            </h3>
                            {/* Doc: each tab opens with the scripted experience; the
                                feature rows sit beneath it as the readable summary. */}
                            <div style={{ marginBottom: 32 }}>
                                <PersonaExperience script={PERSONA_SCRIPTS[role.slug]} autoPlay />
                            </div>
                            <ul style={{ listStyle: "none", margin: "0 0 34px", padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>
                                {role.rows.map((row, i) => (
                                    <li key={row} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid rgba(251,246,242,0.14)" }}>
                                        <span aria-hidden="true" style={{ color: T.orange, fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>—</span>
                                        <span style={{ fontFamily: F, fontSize: isMobile ? 14.5 : 15.5, lineHeight: 1.65, color: "rgba(251,246,242,0.88)" }}>{row}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href={role.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.orange, color: T.cream, fontFamily: F, fontSize: 14.5, fontWeight: 700, padding: "14px 28px", borderRadius: 100, textDecoration: "none" }}>
                                {role.cta} →
                            </a>
                        </motion.div>
                    </div>
                </div>

                <Reveal delay={0.15}>
                    <p style={{ fontFamily: F, fontSize: 13, lineHeight: 1.7, color: T.muted, marginTop: 32 }}>
                        * On comparable itineraries. Results vary.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 4 Use cases ──────────────────────────────────────────────────────────────
const USE_CASES: [string, string][] = [
    ["Business travel", "End-to-end booking, changes and expense for everyday trips, inside policy without a queue."],
    ["Meetings and events", "MICE, group booking, venue sourcing and attendee management on the same platform and ledger."],
    ["Executive travel", "White-glove handling with the agent learning preferences over time and a named human on call."],
    ["Global mobility", "Cross-border travel for distributed teams, with entity-level policy, currency and data residency handled."],
    ["Emergency and disruption", "Proactive rebooking, traveler location and one thread for the whole response."],
]

function UseCases() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section id="use-cases" style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px", scrollMarginTop: 90 }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <Label text="Use cases" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: 0 }}>
                            Every kind of trip <span style={{ color: T.accent, fontStyle: "italic" }}>your company takes.</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : w < 1100 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 24 }}>
                    {USE_CASES.map(([title, body], i) => (
                        <Reveal key={title} delay={i * 0.07}>
                            <div style={{ height: "100%", boxSizing: "border-box", background: "var(--page-bg)", border: `1px solid ${T.mutedLight}`, borderRadius: 20, padding: "34px 30px" }}>
                                <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: T.accent, opacity: 0.55, marginBottom: 14 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: T.ink, lineHeight: 1.25, margin: "0 0 12px" }}>{title}</h3>
                                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 5 Duty of care ───────────────────────────────────────────────────────────
const DUTY_ROWS: [string, string][] = [
    ["Real-time location", "Know where every traveler is, from booked segments and check-ins, with role-based access."],
    ["Risk monitoring", "Disruption, weather and advisory alerts matched to itineraries."],
    ["Instant response", "Rebook, reroute or reach a human from the same thread."],
    ["Audit-ready records", "Every action logged with actor, rule, time and cost."],
]

function DutyOfCare() {
    const isMobile = useWindowWidth() < 900
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: isMobile ? 40 : 80, alignItems: "start" }}>
                <Reveal>
                    <div>
                        <Label text="Duty of care" />
                        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(30px, 3.4vw, 50px)", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.03em", margin: "0 0 26px" }}>
                            Your people travel everywhere. <span style={{ color: T.accent, fontStyle: "italic" }}>No one is ever alone out there.</span>
                        </h2>
                        <a href="/v1.1/security" style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            How agent actions are governed →
                        </a>
                    </div>
                </Reveal>
                <div>
                    {DUTY_ROWS.map(([title, body], i) => (
                        <Reveal key={title} delay={i * 0.08}>
                            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 18, padding: "26px 0", borderTop: `1px solid ${T.mutedLight}` }}>
                                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: T.orange, paddingTop: 4 }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{title}</h3>
                                    <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── 6 Closing CTA (universal, Part 2.2) ──────────────────────────────────────
function ClosingCTA() {
    const isMobile = useWindowWidth() < 768
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "140px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "6%", right: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
                <Reveal>
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Bring a<br /><span style={{ color: T.accent }}>real trip.</span>
                    </h2>
                    <p style={{ fontFamily: F, fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 44px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We run it live.
                    </p>
                    <a href="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: T.maroon, color: T.cream, fontFamily: F, fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, textDecoration: "none" }}>
                        Book your demo ↗
                    </a>
                    <p style={{ fontFamily: F, fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts. No heavy IT lift. Live in as little as 90 days.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

export default function ForTeamsPage() {
    useEffect(() => {
        // Title tag + meta description per the doc's For Teams SEO brief.
        document.title = "For Employees, Finance and Travel Teams | Miraee"
        const description = "What changes for employees, finance, travel leads, admins, HR and managers when one agent runs the trip. Use cases from MICE to executive travel and disruption."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])

    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: F, background: "var(--page-bg)" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SiteNav />
            <V11Hero
                kicker="For Teams"
                title="Built for everyone"
                accent="behind the journey."
                sub="From the person taking the trip to the people paying for it and running the program."
                primaryCta={{ label: "Book a demo", href: "/book-a-demo" }}
                secondaryCta={{ label: "See the roles ↓", href: "#roles" }}
                image={{ src: forTeamsImg, alt: "Manager reviewing an approval with a colleague" }}
                chips={["Employees", "Finance", "Travel leads", "Admins", "CHROs", "Managers", "Use cases"]} />
            <Fit />
            <RoleViews />
            <UseCases />
            <DutyOfCare />
            <ClosingCTA />
            <V1Footer />
        </div>
    )
}
