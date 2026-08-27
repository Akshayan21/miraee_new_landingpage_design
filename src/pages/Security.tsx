import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
gsap.registerPlugin(ScrollTrigger)

const T = {
    ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    cream: "#FBF6F2", white: "#FFFFFF",
    muted: "rgba(var(--text-rgb),0.45)", mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

const SECURITY_EMAIL = "mailto:hello@miraee.ai?subject=Security%20package%20request"

function useGSAP(cb: (gsap: any, ST: any) => void | (() => void), deps: any[] = []) {
    useEffect(() => {
        const cleanup = cb(gsap, ScrollTrigger)
        return () => { if (typeof cleanup === "function") cleanup() }
    }, deps)
}

function useWindowWidth() {
    const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1440)
    useEffect(() => {
        const fn = () => setW(window.innerWidth)
        window.addEventListener("resize", fn)
        return () => window.removeEventListener("resize", fn)
    }, [])
    return w
}

function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })
    const initMap: Record<string, any> = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref} initial={init} animate={inView ? { x: 0, y: 0, opacity: 1 } : init} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

function SmoothScrollStyle() {
    useEffect(() => {
        if (typeof document === "undefined") return
        const existing = document.getElementById("tech-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "tech-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

function ScrollBar() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        if (typeof window === "undefined") return
        const h = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? window.scrollY / max : 0)
        }
        window.addEventListener("scroll", h)
        return () => window.removeEventListener("scroll", h)
    }, [])
    return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: T.orange, transformOrigin: "left", scaleX: progress, zIndex: 200 }} />
}

// --- CONTENT DATA (verbatim from SecurityV2) ---------------------------------
const mayDoWithoutAsking: [string, string, string][] = [
    ["Search inventory and assemble an itinerary", "Always permitted", "Fixed control"],
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

const humanSits: [string, string][] = [
    ["Setting policy and limits", "You. Always. No agent may write a rule."],
    ["Routine in-policy booking", "The agent, inside your limits."],
    ["Anything out of policy", "A named human approver you designate."],
    ["Disruption inside the fare band", "The agent, with notification."],
    ["Disruption above the fare band", "A human, with the agent's recommendation attached."],
    ["Escalation to a person", "The traveler, at any point, with full context carried over."],
]

const trustLayers: [string, string, string, string][] = [
    ["01", "Identity", "SSO / SCIM", "People and agents get only the access their role requires."],
    ["02", "Policy", "Configurable", "Every action is checked against your rules before execution."],
    ["03", "Approval", "Human when needed", "Thresholds route exceptions to the right decision-maker."],
    ["04", "Evidence", "Always logged", "Actor, rule, time and cost are recorded for every action."],
]

const accessGrid: [string, string][] = [
    ["SAML + OIDC", "Single sign-on"],
    ["SCIM", "Automatic provisioning and deprovisioning"],
    ["Role based", "Traveler, approver, finance and admin access"],
    ["Entity isolated", "Segregation for multi-company groups"],
    ["MFA", "Session controls and enforced multi-factor authentication"],
]

const faqs: [string, string][] = [
    ["Where is our data stored?", "Miraee stores and processes customer data in the region you select at contract: United States, European Union or India. Data does not leave the selected region except where a booking must be transmitted to a supplier to be fulfilled."],
    ["Do Miraee's AI agents use our company data to train models?", "No. Your trip data is used to personalise your own organisation's experience and is not used to train foundation models or to improve outcomes for any other customer. Personalisation is scoped to your tenant."],
    ["What can Miraee's agents do without human approval?", "Miraee's agents can search inventory, assemble itineraries, book trips that fall fully within your policy, rebook disruptions inside a fare band you define, and code expenses to your finance system. Anything out of policy, above your thresholds, or outside pre-authorised payment rails requires a named human approver. Every boundary is configurable and every action is logged."],
    ["Can we see what an agent did and why?", "Yes. Every agent action is recorded with the action taken, the agent responsible, the timestamp, the policy rule applied and the cost involved. The full audit trail is exportable at any time and cannot be altered or deleted by any agent."],
    ["How does Miraee handle traveler personal data?", "Miraee collects only the traveler data required to book and support a trip, including identity details, preferences, loyalty memberships and the itinerary itself. Access is role-based, agents cannot act on personal data beyond the scope of the trip in hand, and retention periods are published."],
]

// --- HERO ----------------------------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.055, ease: "easeOut" as const } }),
}

function SecurityHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!heroRef.current || !heroInnerRef.current) return
        gsap.to(heroInnerRef.current, { y: -140, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } })
    }, [])

    const line1 = ["Fast", "for", "people."]
    const line2 = ["Safe", "for", "the", "business."]
    const accentWords = new Set(["business."])

    let wordIdx = 0
    const renderLine = (words: string[]) => words.map((word) => {
        const idx = wordIdx++
        return (
            <span key={idx} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15, perspective: 1000, marginRight: "0.22em" }}>
                <motion.span custom={idx} variants={wordVariants} initial="hidden" animate="visible"
                    style={{ display: "inline-block", backfaceVisibility: "hidden",
                        color: accentWords.has(word) ? T.orange : T.ink, fontStyle: accentWords.has(word) ? "italic" : "normal" }}>
                    {word}
                </motion.span>
            </span>
        )
    })

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "92vh", background: "var(--page-bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                <div style={{ position: "absolute", top: "-10%", left: "20%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.10) 0%, transparent 65%)" }} />
                <div style={{ position: "absolute", bottom: "0%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.07) 0%, transparent 65%)" }} />
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>

            <div ref={heroInnerRef} style={{ position: "relative", zIndex: 3, maxWidth: 900, textAlign: "center", padding: isMobile ? "140px 24px 80px" : isTablet ? "120px 48px 80px" : "100px 64px", willChange: "transform" }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: "1px solid rgba(229,86,2,0.3)", borderRadius: 100, marginBottom: 40, background: "rgba(229,86,2,0.12)" }}>
                    <motion.div animate={{ scale: [1,1.6,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: T.orange, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Trust · Miraee</span>
                </motion.div>
                <h1 style={{ fontSize: isMobile ? 38 : isTablet ? 58 : 76, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.035em", margin: "0 0 32px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 44px", fontWeight: 400 }}>
                    Every agent action is governed, permissioned, traceable and reversible. Autonomy never means blind trust.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                    <motion.a href={SECURITY_EMAIL} whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Request the security package
                    </motion.a>
                    <motion.a href="#governance" whileHover={{ borderColor: "rgba(69,14,20,0.3)", color: T.ink, background: "rgba(69,14,20,0.04)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", border: "1px solid rgba(69,14,20,0.14)", color: T.muted, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.22s" }}>
                        See the boundaries
                    </motion.a>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.45, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    {["SOC 2", "GDPR", "SSO / SCIM", "Audit logs"].map(c => (
                        <span key={c} style={{ padding: "7px 16px", borderRadius: 100, border: "1px solid rgba(69,14,20,0.14)", background: "rgba(69,14,20,0.03)", fontSize: 12, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: T.muted }}>{c}</span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// --- CERTIFICATIONS -------------------------------------------------------
function Certifications() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)

    const marks = [
        { label: "SOC 2", status: "In progress" },
        { label: "GDPR", status: "Compliant" },
        { label: "SSO / SCIM", status: "Identity management" },
        { label: "Audit logs", status: "Every agent action" },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".cert-card")
        gsap.fromTo(cards, { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} id="certifications" style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 48 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Certifications</span>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 auto 18px", maxWidth: 620 }}>
                            Independently verified, not self-declared.
                        </h2>
                        <p style={{ fontSize: 15, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 auto", maxWidth: 560 }}>
                            Security controls, data protection, identity management, and agent actions are documented with a clear status for procurement review.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 16 }}>
                    {marks.map((m) => (
                        <motion.div key={m.label} className="cert-card" whileHover={{ y: -6, borderColor: "rgba(229,86,2,0.4)" }}
                            style={{ padding: isMobile ? "24px 18px" : "32px 24px", background: "var(--surface)", borderRadius: 16, border: "1px solid rgba(var(--text-rgb),0.08)", textAlign: "center" }}>
                            <div style={{ fontSize: isMobile ? 18 : 22, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, marginBottom: 8 }}>{m.label}</div>
                            <div style={{ fontSize: 12, color: T.orange, fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>{m.status}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- DATA RESIDENCY --------------------------------------------------------
function DataResidency() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    const regions = [
        { code: "US", name: "United States" },
        { code: "EU", name: "European Union" },
        { code: "IN", name: "India" },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".region-card")
        gsap.fromTo(cards, { y: 50, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "#0F0407", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(251,246,242,0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(251,246,242,0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Data Residency</span>
                        <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 42 : 50, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 18px", maxWidth: 640 }}>
                            Your data stays where you need it.
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(251,246,242,0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 620, margin: 0 }}>
                            Choose the region your traveler and transaction data is stored and processed in. For organisations operating across the US, Europe and India, this is a procurement requirement rather than a preference.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16 }}>
                    {regions.map((r) => (
                        <div key={r.code} className="region-card"
                            style={{ padding: isMobile ? "28px 24px" : "36px 32px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20 }}>
                            <div style={{ fontSize: 13, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 16 }}>{r.code}</div>
                            <div style={{ fontSize: isMobile ? 20 : 24, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, marginBottom: 8 }}>{r.name}</div>
                            <div style={{ fontSize: 13, color: "rgba(251,246,242,0.4)", fontFamily: "Plus Jakarta Sans" }}>Regional processing</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- AI GOVERNANCE (the differentiating section) ---------------------------
function AIGovernance() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const headRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current || !headRef.current) return
        const wds = headRef.current.querySelectorAll(".gov-w")
        gsap.fromTo(wds, { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.8, stagger: 0.045, ease: "power4.out",
              scrollTrigger: { trigger: headRef.current, start: "top 75%", once: true } })

        const layers = sectionRef.current.querySelectorAll(".trust-layer")
        gsap.fromTo(layers, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true } })

        const decisions = sectionRef.current.querySelectorAll(".decision-card")
        gsap.fromTo(decisions, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 40%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} id="governance" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Section heading */}
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>
                        AI Governance
                    </motion.span>
                    <div ref={headRef}>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 46 : 58, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 18px", maxWidth: 760 }}>
                            {["Autonomy", "never", "means"].map((word, i) => (
                                <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                    <span className="gov-w" style={{ display: "inline-block" }}>{word}</span>
                                </span>
                            ))}
                            <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                <span className="gov-w" style={{ display: "inline-block", color: T.orange, fontStyle: "italic" }}>blind trust.</span>
                            </span>
                        </h2>
                    </div>
                    <p style={{ fontSize: 15, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0, maxWidth: 560 }}>
                        Agents act inside boundaries you set. Here are the boundaries, in writing.
                    </p>
                </div>

                {/* Trust layers row */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)", gap: 16, marginBottom: isMobile ? 64 : 96 }}>
                    {trustLayers.map(([n, title, label, copy]) => (
                        <div key={title} className="trust-layer" style={{ padding: isMobile ? "22px 20px" : "28px 24px", background: "var(--surface)", borderRadius: 16, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <div style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, marginBottom: 14 }}>{n}</div>
                            <div style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>{label}</div>
                            <div style={{ fontSize: 18, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, marginBottom: 10 }}>{title}</div>
                            <div style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.65 }}>{copy}</div>
                        </div>
                    ))}
                </div>

                {/* Decision matrix */}
                <Reveal>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 16, marginBottom: 28 }}>
                        <div>
                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 10 }}>Decision Matrix</span>
                            <h3 style={{ fontSize: isMobile ? 22 : 30, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.02em" }}>What agents may do without asking</h3>
                        </div>
                        <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", margin: 0, maxWidth: 320 }}>Every one of these defaults is configurable, and every boundary can be tightened.</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 12, marginBottom: isMobile ? 64 : 96 }}>
                    {mayDoWithoutAsking.map(([action, rule, config]) => {
                        const approval = rule.includes("Requires") || rule.includes("Never")
                        const accent = approval ? T.orange : "#3FAE6A"
                        return (
                            <div key={action} className="decision-card"
                                style={{ padding: isMobile ? "20px 18px" : "24px 26px", borderRadius: 16, background: approval ? "rgba(229,86,2,0.06)" : "rgba(63,174,106,0.06)", border: `1px solid ${approval ? "rgba(229,86,2,0.22)" : "rgba(63,174,106,0.22)"}` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                    <span aria-hidden="true" style={{ color: accent, fontSize: 14, fontWeight: 700 }}>{approval ? "↗" : "✓"}</span>
                                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: accent }}>{approval ? "Human approval" : "Agent permitted"}</span>
                                </div>
                                <h4 style={{ fontSize: 16, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 8px", lineHeight: 1.3 }}>{action}</h4>
                                <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6, margin: 0 }}>{config === "Fixed control" ? rule : config}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Hard limits */}
                <Reveal>
                    <div style={{ marginBottom: 28 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 10 }}>Hard Limits</span>
                        <h3 style={{ fontSize: isMobile ? 22 : 30, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 8px", letterSpacing: "-0.02em" }}>What agents never do</h3>
                        <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", margin: 0 }}>Not configurable in any tenant or under any setting.</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ padding: isMobile ? "8px 0" : "12px 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: isMobile ? 64 : 96 }}>
                        {neverDo.map((x) => (
                            <div key={x} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: isMobile ? "16px 18px" : "18px 22px", background: "rgba(69,14,20,0.5)", border: "1px solid rgba(229,86,2,0.18)", borderRadius: 14 }}>
                                <span aria-hidden="true" style={{ color: T.orange, fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{"✕"}</span>
                                <span style={{ fontSize: 13.5, color: "rgba(251,246,242,0.7)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{x}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Human in the loop */}
                <Reveal>
                    <div style={{ marginBottom: 28 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 10 }}>Human in the Loop</span>
                        <h3 style={{ fontSize: isMobile ? 22 : 30, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Where the human sits</h3>
                        <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", margin: 0 }}>Routine work moves automatically. Exceptions arrive with context.</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 3, marginBottom: isMobile ? 64 : 96, borderRadius: 20, overflow: "hidden" }}>
                        {humanSits.map(([stage, who], i) => (
                            <div key={stage} style={{ padding: isMobile ? "24px 20px" : "30px 26px", background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)" }}>
                                <div style={{ fontSize: 11, fontFamily: "monospace", color: T.orange, fontWeight: 700, marginBottom: 12 }}>{String(i + 1).padStart(2, "0")}</div>
                                <h4 style={{ fontSize: 16, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>{stage}</h4>
                                <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6, margin: 0 }}>{who}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>

                {/* Data lifecycle */}
                <Reveal>
                    <div style={{ marginBottom: 28 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 10 }}>Data Lifecycle</span>
                        <h3 style={{ fontSize: isMobile ? 22 : 30, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 8px", letterSpacing: "-0.02em" }}>What data trains what</h3>
                        <p style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", margin: 0 }}>Plain-language commitments for security and procurement teams.</p>
                    </div>
                </Reveal>
                <Reveal>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: isMobile ? 64 : 96 }}>
                        <div style={{ padding: isMobile ? "26px 22px" : "34px 30px", background: "var(--surface)", borderRadius: 18, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <h4 style={{ fontSize: 18, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 12px", lineHeight: 1.35 }}>Your data stays scoped to your organisation.</h4>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0 }}>Your trip data personalises your organisation's experience and nothing else. It is not used to train foundation models or improve outcomes for another customer. Personalisation is scoped to your tenant.</p>
                        </div>
                        <div style={{ padding: isMobile ? "26px 22px" : "34px 30px", background: "var(--surface)", borderRadius: 18, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <h4 style={{ fontSize: 18, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 12px", lineHeight: 1.35 }}>Retention and deletion are documented.</h4>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0 }}>Retention periods, traveler deletion rights, tax and audit obligations, and contract-end return formats are defined in the security package for your deployment.</p>
                        </div>
                    </div>
                </Reveal>

                {/* Audit trail callout */}
                <motion.div initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" as const }}
                    style={{ padding: isMobile ? "28px 24px" : "40px 48px", background: "#0F0407", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", borderLeft: `3px solid ${T.orange}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 14 }}>The Audit Trail</span>
                    <h3 style={{ fontSize: isMobile ? 22 : 30, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Every action. Every actor. Every reason.</h3>
                    <p style={{ fontSize: 15, color: "rgba(251,246,242,0.55)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: 0, maxWidth: 640 }}>
                        Each agent action is logged with what was done, which agent did it, when, under which rule, and what it cost. The complete record is exportable at any time.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

// --- ACCESS CONTROL --------------------------------------------------------
function AccessControl() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".access-card")
        gsap.fromTo(cards, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 48 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Access</span>
                        <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 42 : 50, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto", maxWidth: 700 }}>
                            The right people. The right data. Nothing more.
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(5,1fr)", gap: 14 }}>
                    {accessGrid.map(([mark, copy], i) => (
                        <motion.div key={mark} className="access-card" whileHover={{ y: -6, borderColor: "rgba(229,86,2,0.4)" }}
                            style={{ padding: isMobile ? "22px 20px" : "26px 22px", background: "var(--surface)", borderRadius: 16, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <div style={{ fontSize: 11, fontFamily: "monospace", color: T.orange, fontWeight: 700, marginBottom: 14 }}>{String(i + 1).padStart(2, "0")}</div>
                            <div style={{ fontSize: 16, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, marginBottom: 8 }}>{mark}</div>
                            <div style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{copy}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- RELIABILITY -------------------------------------------------------------
function Reliability() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".ops-card")
        gsap.fromTo(cards, { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "#0F0407", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(251,246,242,0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(251,246,242,0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Reliability</span>
                        <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 42 : 50, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0, maxWidth: 640 }}>
                            Travel doesn't wait for maintenance windows.
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16, marginBottom: 40 }}>
                    {[
                        { n: "01", label: "Uptime", title: "Uptime commitment", body: "Defined in your service agreement." },
                        { n: "02", label: "Live status", title: "Public incident history", link: "https://status.miraee.ai", linkLabel: "status.miraee.ai" },
                        { n: "03", label: "Support", title: "Human help, 24/7", body: "A defined incident escalation path for administrators." },
                    ].map((c) => (
                        <div key={c.n} className="ops-card" style={{ padding: isMobile ? "26px 22px" : "32px 28px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18 }}>
                            <div style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, marginBottom: 14 }}>{c.n}</div>
                            <div style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.orange, marginBottom: 8 }}>{c.label}</div>
                            <h3 style={{ fontSize: 19, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, margin: "0 0 10px" }}>{c.title}</h3>
                            {c.body && <p style={{ fontSize: 13.5, color: "rgba(251,246,242,0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.65, margin: 0 }}>{c.body}</p>}
                            {c.link && (
                                <a href={c.link} target="_blank" rel="noreferrer" style={{ fontSize: 13.5, color: T.orange, fontFamily: "Plus Jakarta Sans", fontWeight: 600, textDecoration: "none" }}>
                                    {c.linkLabel} <span aria-hidden="true">{"↗"}</span>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
                <Reveal>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 20, padding: isMobile ? "26px 22px" : "32px 40px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18 }}>
                        <div>
                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 10 }}>Subprocessors</span>
                            <h3 style={{ fontSize: 20, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, margin: "0 0 8px" }}>Who else touches your data.</h3>
                            <p style={{ fontSize: 13.5, color: "rgba(251,246,242,0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.65, margin: 0, maxWidth: 480 }}>A current list of every subprocessor, what they process and where. Subscribe to be notified before the list changes.</p>
                        </div>
                        <a href={SECURITY_EMAIL} style={{ flexShrink: 0, padding: "13px 26px", border: "1px solid rgba(251,246,242,0.25)", color: T.cream, borderRadius: 10, fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                            Request the current list <span aria-hidden="true">{"↗"}</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// --- SECURITY FAQ (accordion) ------------------------------------------------
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ borderBottom: "1px solid rgba(var(--text-rgb),0.08)" }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "22px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 16, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink }}>{q}</span>
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: 20, color: T.orange, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" as const }} style={{ overflow: "hidden" }}>
                        <p style={{ margin: "0 0 24px 40px", fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 680 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SecurityFAQ() {
    const w = useWindowWidth()
    const isMobile = w < 768

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 40 : 56 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Security FAQ</span>
                        <h2 style={{ fontSize: isMobile ? 28 : 44, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
                            Questions procurement asks first.
                        </h2>
                    </div>
                </Reveal>
                <Reveal>
                    <div>
                        {faqs.map(([q, a], i) => <FaqItem key={q} q={q} a={a} index={i} />)}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// --- CLOSING CTA ---------------------------------------------------------
function SecurityCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768

    return (
        <section id="demo" style={{ padding: isMobile ? "80px 24px 96px" : "130px 80px 150px", background: "#0F0407", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(229,86,2,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
                <Reveal>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>Diligence</span>
                    <h2 style={{ fontSize: isMobile ? 30 : 50, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
                        Send us your<br/>security questionnaire.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(251,246,242,0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: "0 0 40px" }}>
                        We'll return it completed, with the documentation attached.
                    </p>
                    <motion.a href={SECURITY_EMAIL} whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Request the security package
                    </motion.a>
                </Reveal>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeSecurityPage(_props: any) {
    useEffect(() => {
        document.title = "Security, Compliance and AI Governance - Miraee"
        const description = "How Miraee secures traveler data, where it is stored, and exactly what our AI agents may and may not do without a human. Certifications, controls and the full governance model."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description

        let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!viewport) {
            viewport = document.createElement('meta') as HTMLMetaElement
            viewport.name = 'viewport'
            document.head.appendChild(viewport)
        }
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5'
    }, [])

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "var(--page-bg)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle/>
            <ScrollBar/>
            <SiteNav />
            <SecurityHero/>
            <Certifications/>
            <DataResidency/>
            <AIGovernance/>
            <AccessControl/>
            <Reliability/>
            <SecurityFAQ/>
            <SecurityCTA/>
            <V1Footer/>
        </div>
    )
}
