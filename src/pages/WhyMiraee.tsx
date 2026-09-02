import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11PageImage from "../components/V11PageImage"
import whyPageImg from "../../images/weavy/v1/solutions/v1-solutions-employees.webp"
gsap.registerPlugin(ScrollTrigger)

// --- Design tokens & shared local helpers (self-contained per V1 page pattern) --
const T = {
    ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    cream: "#FBF6F2", white: "#FFFFFF",
    muted: "rgba(var(--text-rgb),0.45)", mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

function useGSAP(cb: (gsap: any, ST: any) => void | (() => void), deps: any[] = []) {
    useEffect(() => {
        const cleanup = cb(gsap, ScrollTrigger)
        return () => { if (typeof cleanup === "function") cleanup() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const existing = document.getElementById("why-miraee-v1-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "why-miraee-v1-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

// --- Content (verbatim from WhyMiraeeV2.tsx) ----------------------------------
const shift: [string, string, string][] = [
    ["Planning a trip", "The traveler searches across tools, guesses at policy, and assembles an itinerary themselves.", "The traveler describes the trip. A policy-safe itinerary comes back in under a minute."],
    ["Staying in policy", "Policy is a document. Violations are discovered at approval, after the choice is made.", "Policy is applied at search - travel policy compliance by default, not by audit."],
    ["Getting approval", "A request sits in a queue while someone reconstructs the context to judge it.", "Routine trips book themselves. What reaches an approver is a genuine exception, with full context attached."],
    ["Handling disruption", "The traveler discovers the cancellation, then opens a ticket and waits.", "The agent detects it, prices alternatives against policy, and either rebooks or brings one decision."],
    ["Filing the expense", "The traveler collects receipts, codes them, and submits a report. Finance chases the gaps.", "The expense is captured, coded and reconciled at the transaction - automated expense reporting, no report exists to file."],
    ["Getting help", "A support queue with none of the trip context. The traveler re-explains everything.", "A travel specialist in the same thread, with the whole trip already in front of them."],
]

const capabilityCompare: [string, string, string, string][] = [
    ["Natural-language planning", "-", "-", "Included"],
    ["Policy applied before booking", "Partial", "Partial", "Included"],
    ["Proactive disruption handling", "Reactive", "-", "Included"],
    ["Expense prepared automatically", "-", "Partial", "Included"],
    ["Business and personal travel", "-", "-", "Included"],
    ["24/7 human support", "Included", "Ticket queue", "Included"],
    ["Agents that complete the work", "-", "-", "Included"],
]

const commercials: [string, string, string, string][] = [
    ["Booking fees", "Per transaction", "Usually none", "None"],
    ["Change and cancellation fees", "Per change", "Varies", "None"],
    ["Cost of speaking to a human", "Per call or service tier", "Not offered", "Included"],
    ["Expense management", "Separate contract", "Included", "Included"],
    ["Expense reports per trip", "One", "One", "Zero"],
]

const hardQuestions: [string, string][] = [
    ["“We just signed with our TMC.”", "Most travel contracts have a volume commitment rather than an exclusivity clause. Companies commonly run Miraee alongside an existing agreement for a single team or region first, then move the rest at renewal. We will read your contract with you and tell you honestly whether now is the right moment - including when it isn't."],
    ["“Our travelers won't adopt another tool.”", "They are not being asked to learn a tool. They describe the trip in a sentence and it comes back booked. Adoption resistance in corporate travel comes from tools that demand more of the traveler than the workaround does; Miraee demands less than booking it themselves on a consumer site, which is what most people currently do."],
    ["“We can't let AI book without approval.”", "Then don't. Every boundary is configurable and every default can be tightened, including requiring approval on every booking. Most companies start there and loosen the limits once they can see the audit trail. What agents may and may not do is published in full on our security page, not buried in a contract."],
    ["“Our travel policy is too complex.”", "Complex policy is the argument for this, not against it. Rules that vary by route, grade, entity and trip type are exactly what people fail to follow when policy is a document. Applied at the point of search, complexity costs the traveler nothing because they never see the options that don't apply to them - travel policy compliance without added friction."],
    ["“What happens when a trip goes badly wrong?”", "A human travel specialist, 24/7, in the same thread, with the full trip context already in front of them - included, not billed per call. Automation that cannot escalate is a trap, which is why escalation is a product decision rather than an exception."],
    ["“You're new.”", "The software is. The company is not. Miraee is built by Tabhi - a group of 23 travel businesses holding direct supplier contracts, institutionally backed, already serving travelers at global scale. We are not reselling someone else's inventory or hoping to raise the next round."],
]

const switching: [string, string, string][] = [
    ["Policy", "We translate your existing travel policy into rules the agent applies at the point of search.", "Miraee, with your travel team"],
    ["Connect", "SSO, HRIS and ERP connected. Travelers provisioned automatically.", "Miraee, with your IT team"],
    ["Pilot", "One team, real trips, live support. The rules get adjusted against reality, not assumptions.", "Both"],
    ["Roll out", "Company-wide, with traveler onboarding and admin training.", "Miraee"],
]

// --- Hero ----------------------------------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.055, ease: "easeOut" as const } }),
}

function WhyHero() {
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

    const line1 = ["Your", "travel", "program"]
    const line2 = ["isn't", "broken."]
    const line3 = ["Its", "architecture", "is."]
    const accentWords = new Set(["is."])

    let wordIdx = 0
    const renderLine = (words: string[]) => words.map((word) => {
        const idx = wordIdx++
        return (
            <span key={idx} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15, perspective: 1000, marginRight: "0.22em" }}>
                <motion.span custom={idx} variants={wordVariants} initial="hidden" animate="visible"
                    style={{ display: "inline-block", backfaceVisibility: "hidden",
                        color: accentWords.has(word) ? T.orange : T.ink, fontStyle: (word === "Its" || word === "architecture" || word === "is.") ? "italic" : "normal" }}>
                    {word}
                </motion.span>
            </span>
        )
    })

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, rgba(229,86,2,0.12), transparent 32%), var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }} />
            <div ref={heroInnerRef} style={{ position: "relative", top: isMobile ? 0 : isTablet ? 36 : 48, zIndex: 3, maxWidth: 920, textAlign: "center", padding: isMobile ? "120px 24px 80px" : isTablet ? "100px 48px 80px" : "0 64px", willChange: "transform" }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: "1px solid rgba(var(--text-rgb),0.15)", borderRadius: 100, marginBottom: 48, background: "rgba(var(--text-rgb),0.05)" }}>
                    <motion.div animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: T.ink, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Why Miraee</span>
                </motion.div>
                <h1 style={{ fontSize: isMobile ? 34 : isTablet ? 54 : 72, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 36px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line3)}</span>
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 52px", fontWeight: 400 }}>
                    Every tool in corporate travel management solved one stage and handed the traveler to the next. The problem was never the booking screen. It was the handoff.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                            See the difference live
                        </Link>
                    </motion.div>
                    <motion.a href="#compare" whileHover={{ borderColor: "rgba(var(--text-rgb),0.4)", color: T.ink, background: "rgba(var(--text-rgb),0.04)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", border: "1px solid rgba(var(--text-rgb),0.18)", color: "rgba(var(--text-rgb),0.65)", borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.22s" }}>
                        Compare side by side
                    </motion.a>
                </motion.div>
            </div>
            <motion.div style={{ position: "absolute", bottom: 36, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans", color: "rgba(var(--text-rgb),0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom,rgba(229,86,2,0.7),transparent)" }} />
            </motion.div>
        </section>
    )
}

// --- The Shift -------------------------------------------------------------------
function TheShift() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const rowsRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!rowsRef.current) return
        const rows = rowsRef.current.querySelectorAll(".shift-row")
        gsap.fromTo(rows, { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: rowsRef.current, start: "top 78%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>What Actually Changes</span>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 18px", maxWidth: 720 }}>
                            From tools that wait to agents that act.
                        </h2>
                        <p style={{ fontSize: 16, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
                            The difference is not the interface. It is who does the work.
                        </p>
                    </div>
                </Reveal>

                {!isMobile && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, padding: "0 0 14px", borderBottom: "1px solid rgba(var(--text-rgb),0.08)", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "Plus Jakarta Sans" }}>The job</span>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "Plus Jakarta Sans" }}>Today</span>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans" }}>With Miraee</span>
                    </div>
                )}

                <div ref={rowsRef}>
                    {shift.map(([job, today, withMiraee]) => (
                        <div key={job} className="shift-row" style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                            gap: isMobile ? 12 : 32,
                            padding: isMobile ? "24px 0" : "28px 0",
                            borderBottom: "1px solid rgba(var(--text-rgb),0.06)",
                        }}>
                            <h3 style={{ fontSize: isMobile ? 18 : 17, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>{job}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0 }}>
                                {isMobile && <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>Today</span>}
                                {today}
                            </p>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <div style={{ width: 16, height: 16, borderRadius: 5, background: T.orange, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                                    <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={T.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                                </div>
                                <p style={{ fontSize: 14, color: T.ink, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
                                    {isMobile && <span style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>With Miraee</span>}
                                    {withMiraee}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Side by side ------------------------------------------------------------
function CompareTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(var(--text-rgb),0.08)" }}>
            <table style={{ width: "100%", minWidth: isMobile ? 560 : 0, borderCollapse: "collapse" }} aria-label={caption}>
                <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>{caption}</caption>
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={h} scope="col" style={{
                                textAlign: "left", padding: isMobile ? "14px 16px" : "16px 22px", fontSize: 11, fontWeight: 700,
                                letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Plus Jakarta Sans",
                                color: i === headers.length - 1 ? T.orange : "rgba(var(--text-rgb),0.45)",
                                background: "rgba(var(--text-rgb),0.04)", borderBottom: "1px solid rgba(var(--text-rgb),0.08)",
                                whiteSpace: "nowrap",
                            }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid rgba(var(--text-rgb),0.06)" : "none" }}>
                            {row.map((cell, ci) => {
                                const isLast = ci === row.length - 1
                                const isDash = cell === "-"
                                return (
                                    <td key={ci} style={{
                                        padding: isMobile ? "14px 16px" : "16px 22px", fontSize: 13.5, fontFamily: "Plus Jakarta Sans",
                                        color: isDash ? "rgba(var(--text-rgb),0.22)" : isLast ? T.ink : "rgba(var(--text-rgb),0.55)",
                                        fontWeight: ci === 0 ? 600 : isLast ? 700 : 400,
                                        background: isLast ? "rgba(229,86,2,0.06)" : "transparent",
                                    }}>
                                        {ci === 0 ? cell : (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                                                {isLast && !isDash && (
                                                    <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}><path d="M2 6l3 3 5-5" stroke={T.orange} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                                                )}
                                                {cell}
                                            </span>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SideBySide() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const blocks = sectionRef.current.querySelectorAll(".compare-block")
        gsap.fromTo(blocks, { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true } })
    }, [])

    return (
        <section id="compare" ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>
                        Side by Side
                    </motion.span>
                    <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 700 }}>
                        Same trip. Different operating model.
                    </h2>
                </div>

                <div className="compare-block" style={{ marginBottom: 48 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", margin: "0 0 18px" }}>Capability</h3>
                    <CompareTable caption="Capability comparison" headers={["Capability", "Legacy TMC", "First-gen T&E", "Miraee"]} rows={capabilityCompare} />
                </div>

                <div className="compare-block">
                    <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", margin: "0 0 18px" }}>Commercials</h3>
                    <CompareTable caption="Commercial terms comparison" headers={["Terms", "Legacy TMC", "First-gen T&E", "Miraee"]} rows={commercials} />
                </div>
            </div>
        </section>
    )
}

// --- Hard questions (accordion) -----------------------------------------------
function QuestionRow({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false)
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <div style={{ borderBottom: "1px solid rgba(var(--text-rgb),0.08)" }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
                    padding: isMobile ? "22px 0" : "28px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: isMobile ? 17 : 20, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>{q}</span>
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", border: `1px solid ${T.orange}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke={T.orange} strokeWidth="1.6" strokeLinecap="round" /></svg>
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                        <p style={{ margin: isMobile ? "0 0 22px" : "0 0 28px", paddingLeft: isMobile ? 0 : 40, fontSize: 14.5, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.85, maxWidth: 720 }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function HardQuestions() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 40 : 64 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>The Hard Questions</span>
                        <h2 style={{ fontSize: isMobile ? 28 : isTablet ? 42 : 52, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
                            What people ask before they switch.
                        </h2>
                    </div>
                </Reveal>
                <Reveal>
                    <div>
                        {hardQuestions.map(([q, a], i) => (
                            <QuestionRow key={q} q={q} a={a} index={i} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// --- Switching timeline --------------------------------------------------------
function Switching() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const steps = sectionRef.current.querySelectorAll(".switch-step")
        gsap.fromTo(steps, { y: 46, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 74%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 48 : 72 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Switching</span>
                        <h2 style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 16px", maxWidth: 640 }}>
                            Live in weeks, not quarters.
                        </h2>
                        <p style={{ fontSize: 16, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
                            Most of the work is decisions, not deployment.
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: isMobile ? 0 : 20 }}>
                    {switching.map(([step, what, who], i) => (
                        <div key={step} className="switch-step" style={{
                            padding: isMobile ? "28px 0" : "32px 26px",
                            borderTop: isMobile ? "1px solid rgba(var(--text-rgb),0.08)" : `3px solid ${T.orange}`,
                            borderBottom: isMobile && i === switching.length - 1 ? "1px solid rgba(var(--text-rgb),0.08)" : "none",
                            background: isMobile ? "transparent" : "rgba(var(--text-rgb),0.03)",
                            borderRadius: isMobile ? 0 : 16,
                            position: "relative",
                        }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, display: "block", marginBottom: 14 }}>0{i + 1}</span>
                            <h3 style={{ fontSize: 21, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: "0 0 12px", letterSpacing: "-0.01em" }}>{step}</h3>
                            <p style={{ fontSize: 13.5, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 0 16px" }}>{what}</p>
                            <p style={{ fontSize: 11.5, color: T.orange, fontFamily: "Plus Jakarta Sans", fontWeight: 700, letterSpacing: "0.03em", margin: 0 }}>{who}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Closing CTA -----------------------------------------------------------------
function WhyCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        gsap.fromTo(sectionRef.current.querySelector(".cta-inner"), { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "100px 24px" : "160px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
            <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(229,86,2,0.1) 0%, transparent 60%)",
            }} />
            <div className="cta-inner" style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>
                    See the Agent in Action
                </span>
                <h2 style={{ fontSize: isMobile ? 32 : isTablet ? 48 : 60, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                    Experience the agentic travel.
                </h2>
                <p style={{ fontSize: isMobile ? 15 : 17, color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: "0 auto 44px", maxWidth: 560 }}>
                    Twenty minutes. The multi-city one, the one that always gets changed, the one nobody spends correctly. We'll run it live.
                </p>
                <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}>
                    <Link to="/book-a-demo" style={{ padding: isMobile ? "16px 34px" : "18px 46px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Book your demo
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

// --- Page ------------------------------------------------------------------------
export default function MiraeeWhyMiraeePage() {
    useEffect(() => {
        document.title = "Why Miraee - The Alternative to Legacy Corporate Travel"
        const description = "Legacy TMCs charge per transaction. First-generation tools moved the work to the traveler. Miraee is travel management software built around AI agents that complete the trip instead of simply presenting options."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) {
            meta = document.createElement("meta")
            meta.name = "description"
            document.head.appendChild(meta)
        }
        meta.content = description
    }, [])

    useGSAP(() => {
        ScrollTrigger.refresh()
        return () => { ScrollTrigger.getAll().forEach(st => st.kill()) }
    }, [])

    return (
        <div className="v1-type-page" style={{ background: "var(--page-bg)" }}>
            <SmoothScrollStyle />
            <SiteNav />
            <WhyHero />
            <V11PageImage src={whyPageImg} alt="Employee beginning a business journey with confidence" label="A better way to travel" caption="Employees get a personal experience while the business gains one continuous view of the journey." position="center 38%" mobilePosition="56% center" />
            <TheShift />
            <SideBySide />
            <HardQuestions />
            <Switching />
            <WhyCTA />
            <V1Footer />
        </div>
    )
}
