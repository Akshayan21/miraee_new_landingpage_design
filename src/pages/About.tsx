import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11PageImage from "../components/V11PageImage"
import aboutPageImg from "../../images/weavy/v1/v1-experiences-culture.webp"
import miraeeLogo from "../assets/Miraee_Logo.png"
import mondeeLogo from "../assets/mondee_logo.png"
import abheeLogo from "../assets/abhee-logo-dark.png"
gsap.registerPlugin(ScrollTrigger)

const groupLogos: Record<string, string> = { Mondee: mondeeLogo, Miraee: miraeeLogo, Abhee: abheeLogo }

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

// --- CONTENT DATA (verbatim from AboutV2.tsx) --------------------------------
const groupPlatforms = [
    ["Mondee", "The agentic AI travel marketplace", "Serves travel experts and organisations worldwide with negotiated air and hotel content - the supply layer Miraee books against."],
    ["Miraee", "The employee travel platform", "Plans, books, changes and expenses corporate trips end to end on one continuous context."],
    ["Abhee", "The hyperlocal experiential marketplace", "Hosts and curators offering immersive local experiences - the content behind Miraee's personal travel."],
]

const advantage = [
    ["Direct supply", "Wholesale contracts and direct supplier connections rather than resold inventory - which is why the rates hold rather than being claimed back later.", "500+ airlines"],
    ["Global content", "Millions of properties across every market your teams travel to, in one place.", "2M+ properties"],
    ["Volume", "The group's existing traveler base is what makes those rates possible for a company your size.", "125M+ reached"],
    ["Experience content", "Hyperlocal experiences no other corporate channel carries - because a sister company digitized them.", "Abhee network"],
    ["Financial stability", "Institutional backing, so the platform running your travel program will still be here next year.", "TCW · Morgan Stanley"],
    ["Shared AI infrastructure", "Agent architecture built and proven across the group, not a first attempt.", "One engineering group"],
]

const principles = [
    ["01", "Complete the work", "An agent that returns options has moved the task, not finished it. Ours book, rebook, code and reconcile."],
    ["02", "Autonomy inside limits", "Every agent has a written boundary on what it may do alone. Published, configurable, and logged. Autonomy never means blind trust."],
    ["03", "A person when it matters", "Automation that cannot escalate is a trap. A human is always one message away, with the full trip already in front of them."],
    ["04", "The traveler is the test", "If the person taking the trip does not find it easier, nothing else we built counts."],
]

const trustStrip = ["23 companies", "3 AI platforms", "500+ airlines", "2M+ properties", "125M+ travelers reached"]

// --- HERO ----------------------------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.055, ease: "easeOut" as const } }),
}

function AboutHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!heroRef.current || !heroInnerRef.current) return
        gsap.to(heroInnerRef.current, { y: -64, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } })
    }, [])

    const line1 = ["The", "Agentic"]
    const line2 = ["Core."]
    const accentWords = new Set(["Core."])

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
        <section ref={heroRef} style={{ position: "relative", minHeight: "100dvh", background: "radial-gradient(circle at 50% 0%, rgba(229,86,2,0.12), transparent 30%), var(--page-bg)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }}/>
            <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(229,86,2,0.14), transparent 65%)",
                filter: "blur(10px)",
            }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div ref={heroInnerRef} style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: 900, textAlign: "center", padding: isMobile ? "128px 24px 88px" : isTablet ? "156px 48px 100px" : "176px 64px 100px", willChange: "transform" }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: "1px solid rgba(var(--text-rgb),0.15)", borderRadius: 100, marginBottom: 48, background: "rgba(var(--text-rgb),0.05)" }}>
                    <motion.div animate={{ scale: [1,1.6,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: T.ink, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>The Company · Miraee</span>
                </motion.div>
                <h1 style={{ fontSize: isMobile ? 40 : isTablet ? 62 : 84, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.035em", margin: "0 0 36px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                </h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 52px", fontWeight: 400 }}>
                    Built by Tabhi, a travel group with direct supplier contracts, institutional backing, and a marketplace already moving travelers at global scale.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                            See Miraee live
                        </Link>
                    </motion.div>
                    <motion.a href="#tabhi" whileHover={{ borderColor: "rgba(var(--text-rgb),0.4)", color: T.ink, background: "rgba(var(--text-rgb),0.04)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", border: "1px solid rgba(var(--text-rgb),0.18)", color: "rgba(var(--text-rgb),0.65)", borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.22s" }}>
                        Meet the group
                    </motion.a>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: isMobile ? 16 : 28, justifyContent: "center", flexWrap: "wrap" }}>
                    {trustStrip.map((x) => (
                        <span key={x} style={{ fontSize: 12, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: "rgba(var(--text-rgb),0.5)", letterSpacing: "0.04em", padding: "6px 14px", border: "1px solid rgba(var(--text-rgb),0.12)", borderRadius: 100 }}>{x}</span>
                    ))}
                </motion.div>
            </div>
            <motion.div style={{ position: "absolute", bottom: 18, left: 0, right: 0, display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4, pointerEvents: "none" }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans", color: "rgba(var(--text-rgb),0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom,rgba(229,86,2,0.7),transparent)" }}/>
            </motion.div>
        </section>
    )
}

// --- ORIGIN STORY ----------------------------------------------------------
function StoryPanel({ eyebrow, heading, paragraphs, closing, markLines, reverse }: {
    eyebrow: string; heading: React.ReactNode; paragraphs: string[]; closing?: string; markLines: string[]; reverse?: boolean
}) {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <Reveal>
            <div style={{
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr", gap: isMobile ? 32 : 56,
                alignItems: "center", padding: isMobile ? "56px 24px" : "80px 80px",
                maxWidth: 1200, margin: "0 auto",
                direction: reverse && !isMobile ? "rtl" as const : "ltr" as const,
            }}>
                <div style={{ direction: "ltr" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>{eyebrow}</span>
                    <h2 style={{ fontSize: isMobile ? 30 : 46, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 22px" }}>{heading}</h2>
                    {paragraphs.map((p, i) => (
                        <p key={i} style={{ fontSize: 15, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.85, margin: "0 0 16px", maxWidth: 520 }}>{p}</p>
                    ))}
                    {closing && (
                        <p style={{ fontSize: 16, color: T.ink, fontFamily: "Cardo,serif", fontStyle: "italic", lineHeight: 1.6, margin: "20px 0 0", maxWidth: 520, borderLeft: `2px solid ${T.orange}`, paddingLeft: 16 }}>{closing}</p>
                    )}
                </div>
                <div style={{ direction: "ltr", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                        width: "100%", aspectRatio: isMobile ? "auto" : "1/0.85", minHeight: isMobile ? 160 : 240,
                        borderRadius: 24, background: "rgba(229,86,2,0.06)", border: "1px solid rgba(229,86,2,0.16)",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
                    }}>
                        {markLines.map((line, i) => (
                            <span key={i} style={{ display: "block", fontSize: isMobile ? 26 : 34, fontFamily: "Cardo,serif", fontWeight: 700, color: T.orange, lineHeight: 1.25, whiteSpace: "nowrap" }}>{line}</span>
                        ))}
                    </div>
                </div>
            </div>
        </Reveal>
    )
}

function OriginStory() {
    return (
        <section style={{ padding: "40px 0", background: "var(--page-bg)" }}>
            <StoryPanel
                eyebrow="The Origin Story"
                heading={<>We ran the trips.<br/>We saw the handoffs.</>}
                paragraphs={[
                    "Tabhi has been moving travelers for years, through a marketplace, through travel experts, through contracts held directly with airlines and hotels. Corporate travel was the one journey that never got simpler. Every tool solved a single stage and handed the traveler to the next one.",
                    "We didn't set out to build another booking tool. We had already seen what happens when you connect one to an expense tool and a support desk: five owners, four handoffs, and a traveler doing the coordinating.",
                ]}
                markLines={["5 owners.", "4 handoffs."]}
            />
            <StoryPanel
                eyebrow="The Answer"
                heading={<>One agent.<br/>One thread.</>}
                paragraphs={[
                    "So we built the opposite. One agent, one thread, one continuous travel and expense management context, running on supply we already own. Miraee is what happens when the company that holds the contracts also writes the software.",
                ]}
                closing="Most travel software is built on someone else's inventory. Ours isn't."
                markLines={["1 thread.", "0 handoffs."]}
                reverse
            />
        </section>
    )
}

// --- TABHI GROUP -------------------------------------------------------------
function TabhiGroup() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".tabhi-card")
        gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section id="tabhi" ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 56 : 80 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Backed by Tabhi</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 auto 20px", maxWidth: 640 }}>
                            23 companies. Three platforms. One vision.
                        </h2>
                        <p style={{ fontSize: 15, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
                            Tabhi brought together more than twenty travel businesses into a single AI-first group. Miraee is the corporate platform. Two others sit alongside it.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
                    {groupPlatforms.map(([name, what, does]) => (
                        <motion.div key={name} className="tabhi-card"
                            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(var(--text-rgb),0.1)" }}
                            style={{ background: "var(--surface)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(var(--text-rgb),0.06)" }}>
                            <div style={{ height: 4, background: T.orange }}/>
                            <div style={{ padding: isMobile ? "28px 24px" : "36px 32px" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", marginBottom: 14 }}>{what}</div>
                                {groupLogos[name]
                                    ? <img src={groupLogos[name]} alt={name} style={{ height: isMobile ? 26 : 30, width: "auto", display: "block", marginBottom: 16, objectFit: "contain" }} />
                                    : <h3 style={{ fontSize: isMobile ? 24 : 28, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{name}</h3>}
                                <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0 }}>{does}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <Reveal delay={0.08}>
                    <p style={{ textAlign: "center", fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, maxWidth: 640, margin: "40px auto 0" }}>
                        Institutionally backed, with ownership including affiliates of TCW Asset Management and Morgan Stanley Investment Management.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// --- THE ADVANTAGE -------------------------------------------------------------
function TheAdvantage() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".adv-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".adv-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.045, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 70%", once: true } })
        }
        if (gridRef.current) {
            const rows = gridRef.current.querySelectorAll(".adv-row")
            gsap.fromTo(rows, { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 72%", once: true } })
        }
    }, [])

    const headingWords = ["Why", "this", "matters", "to", "your", "travel", "program."]

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>
                        The Advantage
                    </motion.span>
                    <h2 className="adv-heading" style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px", maxWidth: 780 }}>
                        {headingWords.map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="adv-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(var(--text-rgb),0.45)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 560, margin: 0 }}>
                        Group ownership only matters to a buyer if it changes what they get.
                    </p>
                </div>
                <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: 1, borderTop: "1px solid rgba(var(--text-rgb),0.08)" }}>
                    {advantage.map(([what, means, proof]) => (
                        <div key={what} className="adv-row" style={{
                            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 200px", gap: isMobile ? 8 : 32,
                            padding: isMobile ? "22px 4px" : "28px 8px", borderBottom: "1px solid rgba(var(--text-rgb),0.08)", alignItems: isMobile ? "flex-start" : "center",
                        }}>
                            <h3 style={{ fontSize: isMobile ? 17 : 18, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, margin: 0, letterSpacing: "-0.01em" }}>{what}</h3>
                            <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: 0 }}>{means}</p>
                            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: T.orange, fontFamily: "Plus Jakarta Sans", textTransform: "uppercase", justifySelf: isMobile ? "flex-start" : "flex-end", textAlign: isMobile ? "left" : "right" }}>{proof}</span>
                        </div>
                    ))}
                </div>
                <Reveal delay={0.1}>
                    <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.4)", fontFamily: "Plus Jakarta Sans", fontStyle: "italic", margin: "32px 0 0" }}>
                        Most platforms compete on software. We compete on software and supply.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// --- HOW WE BUILD -------------------------------------------------------------
function HowWeBuild() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".principle-card")
        gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 56 : 80, textAlign: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>How We Build</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 52, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 18px", maxWidth: 660 }}>
                            Agents that do the work, not chat about it.
                        </h2>
                        <p style={{ fontSize: 15, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
                            Four principles that decide what we ship and what we refuse to.
                        </p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 20 }}>
                    {principles.map(([num, title, body]) => (
                        <motion.div key={title} className="principle-card"
                            whileHover={{ borderColor: "rgba(229,86,2,0.35)", y: -4 }}
                            style={{ padding: isMobile ? "28px 24px" : "40px 40px", borderRadius: 20, background: "rgba(var(--text-rgb),0.03)", border: "1px solid rgba(var(--text-rgb),0.08)", position: "relative", overflow: "hidden" }}>
                            <span style={{ fontSize: 13, fontFamily: "monospace", color: T.orange, fontWeight: 700, letterSpacing: "0.05em" }}>{num}</span>
                            <h3 style={{ fontSize: isMobile ? 20 : 24, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.015em", margin: "14px 0 12px" }}>{title}</h3>
                            <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0 }}>{body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- PLACEHOLDER SECTIONS (Leadership / Global / Newsroom) --------------------
function PlaceholderSection({ id, eyebrow, heading, note, dark }: { id: string; eyebrow: string; heading: string; note: string; dark?: boolean }) {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section id={id} style={{ padding: isMobile ? "64px 24px" : "96px 80px", background: dark ? "var(--surface-2)" : "var(--page-bg)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>{eyebrow}</span>
                    <h2 style={{ fontSize: isMobile ? 26 : 40, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.15, letterSpacing: "-0.025em", margin: "0 0 16px" }}>{heading}</h2>
                    <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", fontStyle: "italic", margin: 0 }}>{note}</p>
                </Reveal>
            </div>
        </section>
    )
}

function Leadership() {
    return <PlaceholderSection id="leadership" eyebrow="The People" heading="Who's building it." note="Team bios are on their way — check back soon." />
}

function GlobalPresence() {
    return <PlaceholderSection id="global" eyebrow="Global" heading="On the ground where your teams travel." note="Office locations and open roles are on their way — check back soon." dark />
}

function Newsroom() {
    return <PlaceholderSection id="newsroom" eyebrow="Newsroom" heading="Announcements and press." note="No announcements yet — check back soon." />
}

// --- CLOSING CTA -------------------------------------------------------------
function AboutCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ padding: isMobile ? "80px 24px" : "150px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(229,86,2,0.1), transparent 70%)`, pointerEvents: "none" }}/>
            <Reveal>
                <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>See The Agent In Action</span>
                    <h2 style={{ fontSize: isMobile ? 34 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
                        Bring a real trip.
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(var(--text-rgb),0.5)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: "0 0 40px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We'll run it live.
                    </p>
                    <motion.div whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                        <Link to="/book-a-demo" style={{ padding: isMobile ? "14px 30px" : "17px 44px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                            Book your demo
                        </Link>
                    </motion.div>
                </div>
            </Reveal>
        </section>
    )
}

// --- PAGE ----------------------------------------------------------------
export default function MiraeeAboutPage() {
    useEffect(() => {
        document.title = "About Miraee - Built by Tabhi, the AI-Native Travel Group"
        const description = "Miraee is an employee travel platform built by Tabhi - a travel group of 23 companies with direct supplier contracts, institutional backing and a marketplace already serving travelers at global scale."
        let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta) }
        meta.content = description
    }, [])

    return (
        <div className="v1-type-page" style={{ background: "var(--page-bg)", minHeight: "100vh" }}>
            <SmoothScrollStyle />
            <ScrollBar />
            <SiteNav />
            <AboutHero />
            <V11PageImage src={aboutPageImg} alt="Business traveler discovering a local cultural experience" label="Travel beyond the itinerary" caption="Miraee is built around the full experience of travel, including the moments people remember after the workday ends." position="center top" mobilePosition="center 18%" />
            <OriginStory />
            <TabhiGroup />
            <TheAdvantage />
            <HowWeBuild />
            <Leadership />
            <GlobalPresence />
            <Newsroom />
            <AboutCTA />
            <V1Footer />
        </div>
    )
}
