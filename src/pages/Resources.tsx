import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import { usePageMeta } from "../hooks/usePageMeta"
import V11PageImage from "../components/V11PageImage"
import resourcesPageImg from "../../images/weavy/v1/solutions/v1-solutions-travelleads.webp"
gsap.registerPlugin(ScrollTrigger)

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

// --- HERO ----------------------------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.05, ease: "easeOut" as const } }),
}

function ResourcesHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!heroRef.current || !heroInnerRef.current) return
        gsap.to(heroInnerRef.current, { y: -120, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } })
    }, [])

    const line1 = ["Everything", "you", "need", "to", "shape"]
    const line2 = ["the", "future", "of", "corporate", "travel."]
    const allWords = [...line1, ...line2]
    const accentWords = new Set(["travel."])

    let wordIdx = 0
    const renderLine = (words: string[]) => words.map((word) => {
        const idx = wordIdx++
        return (
            <span key={idx} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15, perspective: 1000, marginRight: "0.22em" }}>
                <motion.span custom={idx} variants={wordVariants} initial="hidden" animate="visible"
                    style={{ display: "inline-block", backfaceVisibility: "hidden",
                        color: accentWords.has(word) ? T.orange : T.ink }}>
                    {word}
                </motion.span>
            </span>
        )
    })

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "88vh", background: `radial-gradient(ellipse 62% 55% at 50% 0%, rgba(229,86,2,0.12), transparent 62%), var(--page-bg)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>

            <div ref={heroInnerRef} style={{ position: "relative", top: isMobile ? 0 : isTablet ? 36 : 48, zIndex: 3, maxWidth: 920, textAlign: "center", padding: isMobile ? "140px 24px 80px" : isTablet ? "120px 48px 80px" : "60px 64px", willChange: "transform" }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: "1px solid rgba(var(--text-rgb),0.12)", borderRadius: 100, marginBottom: 44, background: "rgba(var(--text-rgb),0.04)" }}>
                    <motion.div animate={{ scale: [1,1.6,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: T.ink, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Resources · Miraee</span>
                </motion.div>

                <h1 style={{ fontSize: isMobile ? 34 : isTablet ? 52 : 68, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 32px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                </h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + allWords.length * 0.05 + 0.15, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 620, margin: "0 auto", fontWeight: 400 }}>
                    Research, tools, and guidance for finance, travel, and people leaders building the <strong style={{ color: T.ink, fontWeight: 700 }}>agentic travel</strong> program.
                </motion.p>
            </div>
        </section>
    )
}

// --- GUIDES & REPORTS ------------------------------------------------------
const GUIDES: [string, string][] = [
    ["The $255B Opportunity in Unmanaged Travel", "why the mid-market is the next battleground."],
    ["From Cost Center to ROI Engine", "a finance leader's guide to measurable travel."],
    ["The Agentic Era of Corporate Travel", "what changes when AI agents run the trip."],
    ["Six Systems, One Trip", "the hidden cost of a disconnected travel stack."],
]

function Guides() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".gd-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".gd-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.045, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 76%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".gd-card")
            gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 70%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="guides" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>
                        01 / Guides &amp; reports
                    </motion.span>
                    <h2 className="gd-heading" style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 720 }}>
                        {["Go", "deep", "on", "the", "shift", "to", "agentic", "travel."].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="gd-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
                    {GUIDES.map(([title, description], index) => (
                        <motion.div key={title} className="gd-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.4)", y: -4 }}
                            style={{ padding: isMobile ? "26px 22px" : "36px 32px", borderRadius: 20, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)", position: "relative", overflow: "hidden" }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.04em" }}>0{index + 1}</span>
                            <h3 style={{ fontSize: isMobile ? 19 : 22, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.28, letterSpacing: "-0.015em", margin: "14px 0 10px" }}>{title}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: 0 }}>
                                <span aria-hidden="true">- </span>{description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- CALCULATORS -----------------------------------------------------------
const CALCULATORS: [string, string][] = [
    ["ROI / Savings Calculator", "hours reclaimed, spend brought under management, projected return."],
    ["Unmanaged Spend Estimator", "how much of your travel budget is invisible today."],
    ["Tool Consolidation Calculator", "the cost of your current 6+ tool stack vs. one platform."],
]

function Calculators() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".cc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".cc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.05, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 76%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".cc-card")
            gsap.fromTo(cards, { y: 55, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 70%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="calculators" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 48 : 64 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>
                        02 / Calculators
                    </motion.span>
                    <h2 className="cc-heading" style={{ fontSize: isMobile ? 30 : isTablet ? 44 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: 0, maxWidth: 640 }}>
                        {["Put", "numbers", "to", "the", "opportunity."].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="cc-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14, marginBottom: isMobile ? 36 : 48 }}>
                    {CALCULATORS.map(([title, description], index) => (
                        <motion.div key={title} className="cc-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.5)", y: -4 }}
                            style={{ padding: isMobile ? "26px 22px" : "32px 28px", borderRadius: 20, background: "rgba(var(--text-rgb),0.04)", border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                            <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.04em" }}>0{index + 1}</span>
                            <h3 style={{ fontSize: isMobile ? 18 : 20, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.01em", margin: "14px 0 10px" }}>{title}</h3>
                            <p style={{ fontSize: 13.5, color: "rgba(var(--text-rgb),0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: 0 }}>
                                <span aria-hidden="true">- </span>{description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <motion.a href="mailto:hello@miraee.ai?subject=Miraee%20calculator%20access"
                        whileHover={{ x: 4 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Try the calculators <span aria-hidden="true">↗</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}

// --- WEBINARS + HELP CENTER -------------------------------------------------
function WebinarsAndHelp() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".wh-card")
        gsap.fromTo(cards, { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "0 24px 80px" : "0 80px 130px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                <div id="webinars" className="wh-card" style={{ padding: isMobile ? "34px 26px" : "48px 44px", borderRadius: 24, background: T.maroon, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 340, height: 340, background: "radial-gradient(circle, rgba(229,86,2,0.14) 0%, transparent 65%)", pointerEvents: "none" }}/>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>03 / Webinars</span>
                    <h2 style={{ fontSize: isMobile ? 26 : 32, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px", maxWidth: 380 }}>Learn from the teams building the agentic era.</h2>
                    <p style={{ fontSize: 14.5, color: "rgba(251,246,242,0.55)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 400 }}>
                        Live and on-demand sessions on AI in travel, <strong style={{ color: T.cream, fontWeight: 700 }}>expense automation</strong>, MICE, and building a measurable travel program.
                    </p>
                    <motion.a href="mailto:hello@miraee.ai?subject=Miraee%20webinars" whileHover={{ x: 4 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontFamily: "Plus Jakarta Sans", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                        Browse webinars <span aria-hidden="true">↗</span>
                    </motion.a>
                </div>

                <div id="help-center" className="wh-card" style={{ padding: isMobile ? "34px 26px" : "48px 44px", borderRadius: 24, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>04 / Help center</span>
                    <h2 style={{ fontSize: isMobile ? 26 : 32, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 16px", maxWidth: 380 }}>Answers, fast.</h2>
                    <p style={{ fontSize: 14.5, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 400 }}>
                        Setup guides, admin documentation, traveler how-tos, and integration walkthroughs - searchable and always current.
                    </p>
                    <motion.div whileHover={{ x: 4 }} style={{ display: "inline-block" }}>
                        <Link to="/support" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontFamily: "Plus Jakarta Sans", fontWeight: 700, color: T.orange, textDecoration: "none" }}>
                            Visit the Help Center <span aria-hidden="true">↗</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// --- FAQ ---------------------------------------------------------------------
const FAQS: [string, React.ReactNode][] = [
    ["How does Miraee handle policy?", "Automatically, on every booking, with instant exception routing."],
    ["Which systems does it integrate with?", "ERP, accounting, HRIS, corporate card/payment networks, and GDS."],
    ["How long is implementation?", "Pilots reach full deployment in as little as 90 days."],
    ["Does it cover group travel and events?", <>Yes - <strong>MICE</strong> is native.</>],
    ["Is my data safe?", "Enterprise-grade security, full audit trails, and governance are built in."],
]

function FaqRow({ question, answer, index }: { question: string; answer: React.ReactNode; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.05 }}
            style={{ borderBottom: "1px solid rgba(var(--text-rgb),0.1)" }}>
            <button onClick={() => setOpen(o => !o)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 16, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{question}</span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", border: `1px solid ${T.orange}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.orange, fontSize: 16, lineHeight: 1 }}>
                    +
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" as const }}
                        style={{ overflow: "hidden" }}>
                        <p style={{ fontSize: 14.5, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 0 22px", maxWidth: 560 }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function ResourcesFAQ() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "380px 1fr", gap: isMobile ? 36 : 64, alignItems: "start" }}>
                <Reveal>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>05 / FAQs</span>
                    <h2 style={{ fontSize: isMobile ? 30 : 42, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.025em", margin: 0 }}>Common questions, clearly answered.</h2>
                </Reveal>
                <div>
                    {FAQS.map(([question, answer], index) => (
                        <FaqRow key={question} question={question} answer={answer} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- CLOSING CTA ---------------------------------------------------------------
function ClosingCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".rcta-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".rcta-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.06, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 78%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} id="demo" style={{ padding: isMobile ? "90px 24px" : "150px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(229,86,2,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
                <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>
                    See the agent in action
                </motion.span>
                <h2 className="rcta-heading" style={{ fontSize: isMobile ? 34 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 22px" }}>
                    {["Bring", "a", "real", "trip."].map((word, i) => (
                        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                            <span className="rcta-w" style={{ display: "inline-block" }}>{word}</span>
                        </span>
                    ))}
                </h2>
                <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontSize: isMobile ? 15 : 17, color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 auto 40px", maxWidth: 460 }}>
                    Twenty minutes. Your route, your policy, your edge cases. We'll run it live.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.32 }}>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 44px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "0.01em" }}>
                            Book your demo <span aria-hidden="true">↗</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeResourcesPage(_props: any) {
    usePageMeta(
        "Resources for Agentic Corporate Travel | Miraee",
        "Research, tools, and guidance for finance, travel, and people leaders building the future of agentic corporate travel.",
    )

    useEffect(() => {
        let meta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null
        if (!meta) {
            meta = document.createElement('meta') as HTMLMetaElement
            meta.name = 'viewport'
            document.head.appendChild(meta)
        }
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=5'
    }, [])

    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "var(--page-bg)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle/>
            <ScrollBar/>
            <SiteNav />
            <ResourcesHero/>
            <V11PageImage src={resourcesPageImg} alt="Travel leader moving through an airport with live journey context" label="Guidance for modern travel teams" caption="Practical thinking for teams building a more connected, responsive, and human travel program." position="center 42%" mobilePosition="42% center" />
            <Guides/>
            <Calculators/>
            <WebinarsAndHelp/>
            <ResourcesFAQ/>
            <ClosingCTA/>
            <V1Footer />
        </div>
    )
}
