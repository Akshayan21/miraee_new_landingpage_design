import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11PageImage from "../components/V11PageImage"
import technologyPageImg from "../../images/weavy/v1/solutions/v1-solutions-admins.webp"
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

function useMouseParallax() {
    const x = useMotionValue(0); const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 60, damping: 18 }); const sy = useSpring(y, { stiffness: 60, damping: 18 })
    useEffect(() => {
        if (typeof window === "undefined") return
        const h = (e: MouseEvent) => { x.set((e.clientX - window.innerWidth / 2) * 0.05); y.set((e.clientY - window.innerHeight / 2) * 0.05) }
        window.addEventListener("mousemove", h)
        return () => window.removeEventListener("mousemove", h)
    }, [])
    return { x: sx, y: sy }
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
// ─── 3.1 HERO ────────────────────────────────────────────────────────────────
function TechHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const pathname = useLocation().pathname
    const isV11 = pathname === "/v1.1" || pathname.startsWith("/v1.1/")
    const mouse = useMouseParallax()
    const titleRef = useRef<HTMLHeadingElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)
    const scanLineRef = useRef<HTMLDivElement>(null)

    // Particle field
    useEffect(() => {
        if (typeof window === "undefined" || !canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")!
        let animId: number
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener("resize", resize)
        const pts = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.8 + 0.4,
        }))
        let mx = canvas.width / 2, my = canvas.height / 2
        const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
        window.addEventListener("mousemove", onMove)
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const p of pts) {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(229,86,2,0.5)"; ctx.fill()
            }
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 130) {
                        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
                        ctx.strokeStyle = `rgba(229,86,2,${0.15 * (1 - d / 130)})`; ctx.lineWidth = 0.7; ctx.stroke()
                    }
                }
                const mdx = pts[i].x - mx, mdy = pts[i].y - my
                const md = Math.sqrt(mdx * mdx + mdy * mdy)
                if (md < 200) {
                    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my)
                    ctx.strokeStyle = `rgba(229,86,2,${0.25 * (1 - md / 200)})`; ctx.lineWidth = 1; ctx.stroke()
                }
            }
            animId = requestAnimationFrame(draw)
        }
        draw()
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove) }
    }, [])

    // Entry animation
    useGSAP((gsap) => {
        const tl = gsap.timeline({ delay: 0.2 })
        if (badgeRef.current) tl.fromTo(badgeRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0)
        if (titleRef.current) {
            const words = titleRef.current.querySelectorAll(".w-inner")
            tl.fromTo(words, { y: "105%", rotationX: -55, transformOrigin: "50% 100%", opacity: 0 }, { y: "0%", rotationX: 0, opacity: 1, duration: 0.95, stagger: 0.055, ease: "power4.out" }, 0.25)
        }
        if (subRef.current) tl.fromTo(subRef.current, { y: 30, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power3.out" }, 1.05)
        if (ctaRef.current) tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 1.25)
        // scan line sweep
        if (scanLineRef.current) {
            tl.fromTo(scanLineRef.current, { scaleX: 0, transformOrigin: "left center", opacity: 1 }, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.4)
            tl.to(scanLineRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, 2.5)
        }
    }, [])

    // Scroll parallax (scrub)
    useGSAP((gsap, ST) => {
        if (isV11) {
            if (heroInnerRef.current) gsap.set(heroInnerRef.current, { clearProps: "transform" })
            return
        }
        if (!heroRef.current) return
        if (heroInnerRef.current) {
            gsap.to(heroInnerRef.current, {
                y: -200, ease: "none",
                scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
            })
        }
        if (canvasRef.current) {
            gsap.to(canvasRef.current, {
                y: 100, ease: "none",
                scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 2.5 }
            })
        }
    }, [isV11])

    const words = "The Intelligence Engine Beneath Every Trip.".split(" ")

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "100dvh", background: "radial-gradient(circle at 50% 0%, rgba(229,86,2,0.10), transparent 45%), linear-gradient(rgba(var(--text-rgb),0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.035) 1px, transparent 1px), var(--page-bg)", backgroundSize: "auto, 64px 64px, 64px 64px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* horizontal scan line */}
            <div ref={scanLineRef} style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent 0%, rgba(229,86,2,0.5) 40%, rgba(229,86,2,0.5) 60%, transparent 100%)", pointerEvents: "none", zIndex: 5, opacity: 0 }}/>
            <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.75 }} />
            <motion.div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", background: `radial-gradient(ellipse 72% 68% at 50% 50%, transparent 0%, rgba(229,86,2,0.10) 40%, rgba(229,86,2,0.05) 65%, transparent 88%)`, top: "50%", left: "50%", translateX: "-50%", translateY: "-50%", x: mouse.x, y: mouse.y, zIndex: 1, pointerEvents: "none" }}/>
            {/* subtle vignette bottom, blends into next section's surface */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 220, background: `linear-gradient(to bottom, transparent, var(--surface-2))`, zIndex: 2, pointerEvents: "none" }}/>
            <div ref={heroInnerRef} style={{ position: "relative", zIndex: 3, maxWidth: 900, textAlign: "center", padding: isMobile ? "124px 24px 80px" : isV11 ? "124px 48px 72px" : "0 48px", willChange: isV11 ? "auto" : "transform" }}>
                <div ref={badgeRef} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", border: "1px solid rgba(var(--text-rgb),0.12)", borderRadius: 100, marginBottom: 40, backdropFilter: "blur(8px)", background: "rgba(var(--text-rgb),0.04)" }}>
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }}/>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: "rgba(var(--text-rgb),0.65)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>AI-Native Technology · Miraee</span>
                </div>
                <h1 ref={titleRef} style={{ fontSize: isMobile ? 36 : isTablet ? 54 : 76, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.03em", margin: "0 0 32px", perspective: 1200, textAlign: "center" }}>
                    {words.map((word, i) => [
                        <span key={`w-${i}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15 }}>
                            <span className="w-inner" style={{ display: "inline-block", backfaceVisibility: "hidden" }}>
                                {word === words[words.length - 1] ? <span style={{ color: T.orange }}>{word}</span> : word}
                            </span>
                        </span>,
                        i < words.length - 1 ? " " : null
                    ])}
                </h1>
                <p ref={subRef} style={{ fontSize: isMobile ? 16 : 18, color: "rgba(var(--text-rgb),0.55)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 44px" }}>
                    Miraee is AI-native by design — a coordinated multi-agent AI system sitting on owned global supply. It turns "I need to travel" into a booked, compliant, reconciled, and measured outcome.
                </p>
                <div ref={ctaRef} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <motion.a href="#agentic" whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(229,86,2,0.5)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "13px 28px" : "16px 38px", background: T.orange, color: T.white, borderRadius: 10, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", letterSpacing: "0.01em", display: "inline-block" }}>
                        See how it works
                    </motion.a>
                    <motion.a href="#agents" whileHover={{ borderColor: "rgba(var(--text-rgb),0.4)", color: T.ink }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "13px 28px" : "16px 38px", border: "1px solid rgba(var(--text-rgb),0.15)", color: "rgba(var(--text-rgb),0.6)", borderRadius: 10, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}>
                        See the 8 agents →
                    </motion.a>
                </div>
            </div>
            <motion.div style={{ position: "absolute", bottom: 36, left: "50%", translateX: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontSize: 10, fontFamily: "Plus Jakarta Sans", color: "rgba(var(--text-rgb),0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(229,86,2,0.6),transparent)" }}/>
            </motion.div>
        </section>
    )
}

// ─── 3.2 WHAT IS AGENTIC AI ────────────────────────────────────────────────
function AgenticAI() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLDivElement>(null)
    const headRef = useRef<HTMLHeadingElement>(null)
    const kickerRef = useRef<HTMLSpanElement>(null)
    const subHeadRef = useRef<HTMLParagraphElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLDivElement>(null)
    const [activeStep, setActiveStep] = useState(0)
    const statNumRef0 = useRef<HTMLDivElement>(null)
    const statNumRef1 = useRef<HTMLDivElement>(null)
    const statNumRef2 = useRef<HTMLDivElement>(null)

    const steps = [
        { label: "You describe the goal", old: "Answers, drafts, and waits for you to execute.", new: "Understands intent — natural-language requests become structured itineraries." },
        { label: "AI takes action", old: "You manually pick options and fill forms.", new: "Autonomous booking decisions select the optimal option across owned supply." },
        { label: "Policy applied", old: "Approvals chased after booking.", new: "Real-time policy enforcement — every action is checked before any option surfaces." },
        { label: "Disruption handled", old: "You call a helpdesk. Hold music.", new: "Rebooking and coordination happen proactively — before you know there's a problem." },
        { label: "Expense captured", old: "Photo the receipt. Email it. Enter it again.", new: "Automated expense reporting — capture, coding, and ERP sync need no manual entry." },
    ]

    const headWords = [
        { text: "From", s: {} }, { text: "assistants", s: {} }, { text: "that", s: {} },
        { text: "talk", s: { fontStyle: "italic" as const, color: T.accent } },
        { text: "to", s: {} }, { text: "agents", s: {} }, { text: "that", s: {} },
        { text: "do.", s: { fontStyle: "italic" as const, color: T.orange } },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return

        // kicker slide up
        if (kickerRef.current) {
            gsap.fromTo(kickerRef.current, { y: 16, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
                  scrollTrigger: { trigger: kickerRef.current, start: "top 80%", once: true }
                }
            )
        }

        // heading words clip-path reveal
        if (headRef.current) {
            const wds = headRef.current.querySelectorAll(".ag-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.8, stagger: 0.045, ease: "power4.out",
                  scrollTrigger: { trigger: headRef.current, start: "top 72%", once: true }
                }
            )
        }

        // subheading
        if (subHeadRef.current) {
            gsap.fromTo(subHeadRef.current, { y: 20, opacity: 0, clipPath: "inset(0 0 100% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.out",
                  scrollTrigger: { trigger: subHeadRef.current, start: "top 75%", once: true }
                }
            )
        }

        // rows slide from left with stagger
        if (tableRef.current) {
            const cards = tableRef.current.querySelectorAll(".step-card")
            gsap.fromTo(cards, { x: -70, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.75, stagger: 0.11, ease: "power3.out",
                  scrollTrigger: { trigger: tableRef.current, start: "top 68%", once: true }
                }
            )
        }

        // vertical scan line draws down the left edge of table
        if (scanRef.current && tableRef.current) {
            gsap.fromTo(scanRef.current,
                { scaleY: 0, transformOrigin: "top center", opacity: 1 },
                { scaleY: 1, duration: 1.4, ease: "power3.inOut",
                  scrollTrigger: { trigger: tableRef.current, start: "top 65%", once: true }
                }
            )
        }

        // stat counters
        const counters = [
            { ref: statNumRef0, from: 450, to: 500, suffix: "+" },
            { ref: statNumRef1, from: 0, to: 60, suffix: "s" },
            { ref: statNumRef2, from: 47, to: 0, suffix: "" },
        ]
        counters.forEach(({ ref, from, to, suffix }) => {
            if (!ref.current) return
            const obj = { val: from }
            gsap.to(obj, {
                val: to, duration: 2, ease: "power2.out",
                scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
                onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix }
            })
        })
    }, [])

    return (
        <section id="agentic" ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: isMobile ? 64 : 96 }}>
                    <span ref={kickerRef} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 18 }}>What Is Agentic AI?</span>
                    <h2 ref={headRef} style={{ fontSize: isMobile ? 32 : isTablet ? 46 : 62, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 auto 20px", maxWidth: 720, perspective: 1000 }}>
                        {headWords.map((wd, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="ag-w" style={{ display: "inline-block", ...wd.s }}>{wd.text}</span>
                            </span>
                        ))}
                    </h2>
                    <p ref={subHeadRef} style={{ fontSize: 17, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
                        Most AI travel products suggest while you execute. Miraee takes action end to end — agentic AI travel, not an assistant with a travel skin.
                    </p>
                </div>

                {/* Column headers */}
                {!isMobile && (
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "Plus Jakarta Sans", paddingLeft: 20 }}>Scenario</div>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "Plus Jakarta Sans", textAlign: "center" }}>Assistant AI</div>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", textAlign: "center" }}>Agentic AI · Miraee</div>
                    </motion.div>
                )}

                {/* Table with scan line */}
                <div style={{ position: "relative" }}>
                    <div ref={scanRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent, rgba(229,86,2,0.5) 30%, rgba(229,86,2,0.5) 70%, transparent)", pointerEvents: "none", zIndex: 1 }}/>
                    <div ref={tableRef} style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 2 }}>
                        {steps.map((step, i) => (
                            <motion.div key={i} className="step-card"
                                onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                                whileHover={{ x: 4, boxShadow: "0 6px 30px rgba(var(--text-rgb),0.07)" }}
                                style={{
                                    display: isMobile ? "block" : "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: 24,
                                    padding: isMobile ? "20px" : "22px 24px",
                                    borderRadius: 14,
                                    background: activeStep === i ? "rgba(229,86,2,0.04)" : "white",
                                    border: activeStep === i ? `1px solid rgba(229,86,2,0.3)` : "1px solid rgba(var(--text-rgb),0.06)",
                                    cursor: "pointer",
                                    transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                                    boxShadow: activeStep === i ? "0 4px 24px rgba(229,86,2,0.08)" : "none",
                                    position: "relative",
                                }}>
                                {activeStep === i && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: T.orange, borderRadius: "14px 0 0 14px" }}/>}
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 9, background: activeStep === i ? T.orange : "rgba(var(--text-rgb),0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Plus Jakarta Sans", color: activeStep === i ? T.white : T.muted }}>0{i + 1}</span>
                                    </div>
                                    <span style={{ fontSize: 15, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>{step.label}</span>
                                </div>
                                {isMobile ? (
                                    <AnimatePresence>
                                        {activeStep === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                                style={{ overflow: "hidden", marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                                <div style={{ padding: "12px 14px", background: "rgba(var(--text-rgb),0.04)", borderRadius: 10, borderLeft: "3px solid rgba(var(--text-rgb),0.15)" }}>
                                                    <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "Plus Jakarta Sans" }}>Old way</div>
                                                    <p style={{ margin: 0, fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{step.old}</p>
                                                </div>
                                                <div style={{ padding: "12px 14px", background: "rgba(229,86,2,0.06)", borderRadius: 10, borderLeft: `3px solid ${T.orange}` }}>
                                                    <div style={{ fontSize: 10, fontWeight: 700, color: T.orange, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, fontFamily: "Plus Jakarta Sans" }}>Miraee</div>
                                                    <p style={{ margin: 0, fontSize: 13, color: T.ink, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{step.new}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                ) : (
                                    <>
                                        <div style={{ padding: "10px 14px", background: "rgba(var(--text-rgb),0.04)", borderRadius: 10, borderLeft: "3px solid rgba(var(--text-rgb),0.15)", alignSelf: "center" }}>
                                            <p style={{ margin: 0, fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{step.old}</p>
                                        </div>
                                        <div style={{ padding: "10px 14px", background: "rgba(229,86,2,0.06)", borderRadius: 10, borderLeft: `3px solid ${T.orange}`, alignSelf: "center" }}>
                                            <p style={{ margin: 0, fontSize: 13, color: T.ink, fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{step.new}</p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Stat cards with counter */}
                <Reveal delay={0.2}>
                    <div style={{ marginTop: isMobile ? 56 : 80, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 12 : 20 }}>
                        {[
                            { numRef: statNumRef0, initial: "500+", label: "Airlines on owned, direct supply", icon: (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="14" r="11" stroke={T.maroon} strokeWidth="1.5"/>
                                    <ellipse cx="14" cy="14" rx="5" ry="11" stroke={T.maroon} strokeWidth="1.5"/>
                                    <line x1="3" y1="14" x2="25" y2="14" stroke={T.maroon} strokeWidth="1.5"/>
                                    <path d="M5 9h18M5 19h18" stroke={T.maroon} strokeWidth="1" strokeOpacity="0.5"/>
                                </svg>
                            )},
                            { numRef: statNumRef1, initial: "60s", label: "To a policy-enforced itinerary", icon: (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="14" cy="15" r="10" stroke={T.maroon} strokeWidth="1.5"/>
                                    <path d="M14 9v6l4 2.5" stroke={T.maroon} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11 3.5h6" stroke={T.maroon} strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            )},
                            { numRef: statNumRef2, initial: "0", label: "Manual expense entries — auto-coded to ERP", icon: (
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="6" y="4" width="16" height="20" rx="2.5" stroke={T.maroon} strokeWidth="1.5"/>
                                    <path d="M10 10h8M10 14h8M10 18h5" stroke={T.maroon} strokeWidth="1.5" strokeLinecap="round"/>
                                    <circle cx="21" cy="21" r="5" fill="white" stroke={T.maroon} strokeWidth="1.5"/>
                                    <path d="M19 21l1.5 1.5L23 19" stroke={T.maroon} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )},
                        ].map((stat, i) => (
                            <motion.div key={i}
                                initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(var(--text-rgb),0.1)" }}
                                style={{ padding: isMobile ? "24px 18px" : "32px 28px", background: "white", borderRadius: 18, border: "1px solid rgba(var(--text-rgb),0.06)", textAlign: "center", transition: "box-shadow 0.3s" }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{stat.icon}</div>
                                <div ref={stat.numRef} style={{ fontSize: isMobile ? 40 : 48, fontFamily: "Cardo,serif", fontWeight: 700, color: T.maroon, lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em" }}>{stat.initial}</div>
                                <div style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.5 }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
// ─── 3.3 WHAT THE AGENTS DO ──────────────────────────────────────────────────
function WhatAgentsDo() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const headRef = useRef<HTMLHeadingElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const pipelineSvgRef = useRef<SVGSVGElement>(null)
    const [activeAgent, setActiveAgent] = useState<number | null>(null)

    const agents = [
        { num: "01", name: "Plan", icon: "◎", color: "#E55602", desc: "Intent understanding — natural-language requests become structured itineraries.", detail: "No forms, no filters. If you say 'Berlin next Tuesday for two nights', it handles dates, city lookup, and preference matching automatically." },
        { num: "02", name: "Negotiate", icon: "⇌", color: "#C94A00", desc: "Predictive cost optimization — fare and rate intelligence lowers spend.", detail: "Runs concurrent lookups across owned supply — 500+ airlines and 2M+ hotels. Picks the option with the best total cost, not just the lowest fare." },
        { num: "03", name: "Apply Policy", icon: "✦", color: "#A83C00", desc: "Real-time policy enforcement — every action is checked against company policy.", detail: "Policy is parsed once and enforced at every lookup, before any option surfaces. No post-booking audits, no exceptions that slip through." },
        { num: "04", name: "Approve", icon: "✓", color: "#E55602", desc: "Human in the loop — genuine exceptions pause for human judgment.", detail: "In-policy bookings move automatically. Everything else routes for one-click sign-off, with escalation chains configurable per trip type, cost threshold, or destination." },
        { num: "05", name: "Book", icon: "◈", color: "#C94A00", desc: "Autonomous booking decisions — the optimal option, confirmed end to end.", detail: "Flight, hotel, and cab confirmed in one coordinated transaction. If one leg fails, the whole transaction rolls back — no orphaned hotel with no flight." },
        { num: "06", name: "Monitor", icon: "◉", color: "#A83C00", desc: "AI spend management — a clear view of travel spend as it happens.", detail: "Finance and admins see every active trip and its cost in real time — delays, gate changes, cancellations, and risk flags included." },
        { num: "07", name: "Rebook", icon: "↻", color: "#E55602", desc: "Disruption handling — rebooking and coordination happen proactively.", detail: "A cancellation triggers an instant, in-policy rebook. The traveller gets a push notification with the new itinerary — before they know there's a problem." },
        { num: "08", name: "Reconcile", icon: "≡", color: "#C94A00", desc: "Automated expense reporting — capture, coding, and ERP sync need no manual entry.", detail: "Three-way matching: booking confirmation, receipt, card charge. Exceptions flagged for review. Month-end close cuts from days to hours." },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return

        // Heading words clip reveal
        if (headRef.current) {
            const words = headRef.current.querySelectorAll(".wd-w")
            gsap.fromTo(words, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.07, ease: "power4.out",
                  scrollTrigger: { trigger: headRef.current, start: "top 72%", once: true }
                }
            )
        }

        // 3D card entrance — rotationY flip + scale
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".agent-card")
            gsap.fromTo(cards,
                { y: 80, rotationY: -18, scale: 0.88, opacity: 0, transformOrigin: "50% 50%" },
                {
                    y: 0, rotationY: 0, scale: 1, opacity: 1,
                    duration: 0.75, stagger: { each: 0.07, from: "start" }, ease: "power3.out",
                    scrollTrigger: { trigger: gridRef.current, start: "top 70%", once: true }
                }
            )
        }

        // Pipeline SVG path draw
        if (pipelineSvgRef.current) {
            const paths = pipelineSvgRef.current.querySelectorAll(".pipe")
            paths.forEach((path: any) => {
                const len = path.getTotalLength ? path.getTotalLength() : 200
                gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
                gsap.to(path, {
                    strokeDashoffset: 0, duration: 2, ease: "power2.inOut",
                    scrollTrigger: { trigger: gridRef.current, start: "top 65%", once: true }
                })
            })
        }

        // Ambient scan sweep
        const scanEl = sectionRef.current.querySelector(".grid-scan")
        if (scanEl) {
            gsap.fromTo(scanEl, { x: "-100%" }, {
                x: "120%", duration: 3.5, ease: "power2.inOut", repeat: -1, repeatDelay: 5,
                scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: false }
            })
        }
    }, [])

    const cols = isMobile ? 1 : isTablet ? 2 : 4

    return (
        <section ref={sectionRef} id="agents" style={{ padding: isMobile ? "80px 24px" : isTablet ? "130px 48px" : "130px 80px", background: "var(--page-bg)", position: "relative", overflow: "hidden" }}>
            {/* grid background */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(var(--text-rgb),0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }}/>
            {/* ambient scan sweep */}
            <div className="grid-scan" style={{ position: "absolute", top: 0, bottom: 0, width: "25%", background: "linear-gradient(to right, transparent, rgba(229,86,2,0.04), transparent)", pointerEvents: "none", zIndex: 1 }}/>

            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
                {/* heading with word-by-word reveal */}
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "block", marginBottom: 18 }}>
                        What the Agents Do, Daily
                    </motion.span>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 20 }}>
                        <h2 ref={headRef} style={{ fontSize: isMobile ? 32 : 54, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.025em", margin: 0, maxWidth: 520 }}>
                            {["Eight", "AI", "agents."].map((word, i) => (
                                <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.15 }}>
                                    <span className="wd-w" style={{ display: "inline-block" }}>{word}</span>
                                </span>
                            ))}
                            <br/>
                            {["Zero", "manual", "steps."].map((word, i) => (
                                <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.15 }}>
                                    <span className="wd-w" style={{ display: "inline-block" }}>{word}</span>
                                </span>
                            ))}
                        </h2>
                        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ fontSize: 15, color: "rgba(var(--text-rgb),0.45)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
                            Each agent runs a discrete part of the travel workflow, bounded by policy, budget, and human judgment where it matters. Together, they run the whole thing.
                        </motion.p>
                    </div>
                </div>

                {/* Agent cards grid — 3D entrance */}
                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 14, perspective: 1000 }}>
                    {agents.map((agent, i) => (
                        <motion.div key={i} className="agent-card"
                            role="button" tabIndex={0}
                            aria-pressed={activeAgent === i}
                            onClick={() => setActiveAgent(activeAgent === i ? null : i)}
                            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveAgent(activeAgent === i ? null : i) } }}
                            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(229,86,2,0.45)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            style={{
                                padding: isMobile ? "22px 18px" : "28px 24px", borderRadius: 20,
                                background: activeAgent === i ? "rgba(229,86,2,0.05)" : "rgba(var(--text-rgb),0.04)",
                                border: activeAgent === i ? "1px solid rgba(229,86,2,0.5)" : "1px solid rgba(var(--text-rgb),0.08)",
                                cursor: "pointer", transition: "border-color 0.2s, background 0.2s",
                                position: "relative", overflow: "hidden", outline: "none",
                            }}
                            whileFocus={{ borderColor: "rgba(229,86,2,0.7)", boxShadow: "0 0 0 3px rgba(229,86,2,0.25)" }}>
                            {/* active glow */}
                            {activeAgent === i && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% -10%,rgba(229,86,2,0.15),transparent 65%)", pointerEvents: "none" }}/>}
                            {/* hover shimmer */}
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 40%, rgba(229,86,2,0.03) 100%)", pointerEvents: "none" }}/>
                            <div style={{ position: "absolute", top: 14, right: 14, fontSize: 11, fontFamily: "monospace", color: "rgba(var(--text-rgb),0.2)", fontWeight: 700 }}>{agent.num}</div>
                            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}
                                style={{ fontSize: 28, marginBottom: 16, color: agent.color, lineHeight: 1, display: "inline-block" }}>
                                {agent.icon}
                            </motion.div>
                            <div style={{ fontSize: 15, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>{agent.name}</div>
                            <div style={{ fontSize: 13, color: "rgba(var(--text-rgb),0.45)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.65 }}>{agent.desc}</div>
                            <AnimatePresence>
                                {activeAgent === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                                        style={{ overflow: "hidden" }}>
                                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(229,86,2,0.2)", fontSize: 13, color: "rgba(var(--text-rgb),0.65)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.7 }}>
                                            {agent.detail}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                    style={{ marginTop: 48, textAlign: "center" }}>
                    <p style={{ fontSize: 14, color: "rgba(var(--text-rgb),0.3)", fontFamily: "Plus Jakarta Sans", fontStyle: "italic" }}>Click any agent to learn more</p>
                </motion.div>
            </div>
        </section>
    )
}

// ─── 3.4 BRAIN & HEART ────────────────────────────────────────────────────────
function BrainAndHeart() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const [active, setActive] = useState<"tabhi" | "mondee">("tabhi")
    const sectionRef = useRef<HTMLDivElement>(null)
    const headWordsRef = useRef<HTMLHeadingElement>(null)
    const visualPanelRef = useRef<HTMLDivElement>(null)
    const toggleRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return

        // Heading words clip reveal
        if (headWordsRef.current) {
            const words = headWordsRef.current.querySelectorAll(".bh-w")
            gsap.fromTo(words, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.9, stagger: 0.065, ease: "power4.out",
                  scrollTrigger: { trigger: headWordsRef.current, start: "top 72%", once: true }
                }
            )
        }

        // Toggle buttons pop in
        if (toggleRef.current) {
            const btns = toggleRef.current.querySelectorAll("button")
            gsap.fromTo(btns, { y: 24, opacity: 0, scale: 0.92 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)",
                  scrollTrigger: { trigger: toggleRef.current, start: "top 80%", once: true }
                }
            )
        }

        // Visual panel parallax (scrub as section scrolls)
        if (visualPanelRef.current) {
            gsap.to(visualPanelRef.current, {
                y: -60, ease: "none",
                scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 }
            })
        }

        // Quote banner clip-path reveal
        if (quoteRef.current) {
            gsap.fromTo(quoteRef.current,
                { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1, ease: "power3.inOut",
                  scrollTrigger: { trigger: quoteRef.current, start: "top 80%", once: true }
                }
            )
        }
    }, [])

    const tabhi = {
        label: "Tabhi", role: "The Brain",
        color: T.orange, bg: T.maroon, text: T.cream,
        tagline: "The AI-first travel group building the coordinated multi-agent system behind Miraee — autonomy with guardrails.",
        points: [
            "Agent architecture built and proven across the group, not a first attempt",
            "Every agent action recorded in a full, attributable audit trail",
            "Policy and budget guardrails bound what every agent may do alone",
            "Human in the loop — genuine exceptions pause for human judgment",
        ],
        stat: { num: "23", label: "companies in the Tabhi group" },
    }
    const mondee = {
        label: "Mondee", role: "The Heart",
        color: T.orange, bg: "#0F0407", text: T.cream,
        tagline: "The agentic AI travel marketplace — the supply layer Miraee books against.",
        points: [
            "500+ airlines and 2M+ properties via direct supplier connections, not resold inventory",
            "Wholesale rates that travel with the trip, applied at booking",
            "125M+ travelers already reached across the group",
            "Live availability, not cached aggregator data",
        ],
        stat: { num: "500+", label: "airlines on direct supply" },
    }

    const current = active === "tabhi" ? tabhi : mondee

    return (
        <section ref={sectionRef} id="demo" style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--page-bg)", overflow: "hidden" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 18 }}>
                        The Foundation
                    </motion.span>
                    <h2 ref={headWordsRef} style={{ fontSize: isMobile ? 32 : isTablet ? 46 : 64, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.03em", margin: "0 auto 20px", maxWidth: 640 }}>
                        {["Brain", "meets", "heart."].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="bh-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                        <br/>
                        {["Travel,", "solved."].map((word, i) => (
                            <span key={i + 3} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                <span className="bh-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                    </h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
                        style={{ fontSize: 17, color: "rgba(var(--text-rgb),0.55)", fontFamily: "Plus Jakarta Sans", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                        Miraee is powered by two forces: Tabhi's coordinated multi-agent AI system and Mondee's owned global supply.
                    </motion.p>
                </div>

                {/* Toggle */}
                <div ref={toggleRef} style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: isMobile ? 36 : 48 }}>
                    {([["tabhi", "Tabhi — Brain"], ["mondee", "Mondee — Heart"]] as const).map(([key, lbl]) => (
                        <motion.button key={key} onClick={() => setActive(key)}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            style={{ padding: "11px 28px", borderRadius: 40, border: `1.5px solid ${active === key ? T.orange : "rgba(var(--text-rgb),0.16)"}`, background: active === key ? T.orange : "transparent", color: active === key ? T.white : "rgba(var(--text-rgb),0.55)", fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 600, cursor: "pointer", transition: "all 0.25s" }}>
                            {lbl}
                        </motion.button>
                    ))}
                </div>

                {/* Main panel */}
                <AnimatePresence mode="wait">
                    <motion.div key={active}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ borderRadius: 24, overflow: "hidden", background: current.bg, border: `1px solid rgba(251,246,242,0.06)`, boxShadow: "0 20px 60px rgba(251,246,242,0.08)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 0, minHeight: 440 }}>
                            {/* Left: content */}
                            <div style={{ padding: isMobile ? "40px 28px" : "64px 60px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div>
                                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: `rgba(251,246,242,0.08)`, marginBottom: 28 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: current.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Plus Jakarta Sans" }}>{current.role}</span>
                                    </motion.div>
                                    <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
                                        style={{ fontSize: isMobile ? 28 : 40, fontFamily: "Cardo,serif", fontWeight: 700, color: current.text, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px" }}>
                                        {current.label}
                                    </motion.h3>
                                    <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
                                        style={{ fontSize: 16, color: "rgba(251,246,242,0.55)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: "0 0 32px", maxWidth: 380 }}>
                                        {current.tagline}
                                    </motion.p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        {current.points.map((pt, i) => (
                                            <motion.div key={pt} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                                                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                                <motion.div whileHover={{ scale: 1.2 }}
                                                    style={{ width: 20, height: 20, borderRadius: 6, background: current.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                                    <span style={{ fontSize: 10, color: T.white, fontWeight: 700 }}>✓</span>
                                                </motion.div>
                                                <span style={{ fontSize: 14, color: T.cream, fontFamily: "Plus Jakarta Sans", lineHeight: 1.65 }}>{pt}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                    style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(251,246,242,0.08)" }}>
                                    <div style={{ fontSize: isMobile ? 48 : 60, fontFamily: "Cardo,serif", fontWeight: 700, color: current.color, lineHeight: 1, letterSpacing: "-0.03em" }}>{current.stat.num}</div>
                                    <div style={{ fontSize: 14, color: "rgba(251,246,242,0.45)", fontFamily: "Plus Jakarta Sans", marginTop: 6 }}>{current.stat.label}</div>
                                </motion.div>
                            </div>
                            {/* Right: visual with parallax */}
                            <div ref={visualPanelRef} style={{ background: "rgba(251,246,242,0.04)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: isMobile ? 240 : "auto", position: "relative", overflow: "hidden", willChange: "transform" }}>
                                {active === "tabhi" ? <NeuralOrbit /> : <MondeeGlobe />}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Quote banner — clip-path reveal */}
                <div ref={quoteRef} style={{ marginTop: isMobile ? 48 : 72, padding: isMobile ? "32px 24px" : "44px 56px", background: "#0F0407", borderRadius: 22, textAlign: "center", position: "relative", overflow: "hidden" }}>
                    {/* decorative corner lines */}
                    <div style={{ position: "absolute", top: 16, left: 16, width: 40, height: 40, borderTop: `1px solid rgba(229,86,2,0.3)`, borderLeft: `1px solid rgba(229,86,2,0.3)`, borderRadius: "8px 0 0 0" }}/>
                    <div style={{ position: "absolute", bottom: 16, right: 16, width: 40, height: 40, borderBottom: `1px solid rgba(229,86,2,0.3)`, borderRight: `1px solid rgba(229,86,2,0.3)`, borderRadius: "0 0 8px 0" }}/>
                    <p style={{ fontSize: isMobile ? 20 : 28, fontFamily: "Cardo,serif", fontStyle: "italic", color: T.cream, margin: 0, lineHeight: 1.5, position: "relative" }}>
                        "Agentic AI travel, not an assistant with a travel skin. <span style={{ color: T.orange }}>AI governance for travel, not a compliance afterthought.</span>"
                    </p>
                </div>
            </div>
        </section>
    )
}

function NeuralOrbit() {
    const ref = useRef<SVGSVGElement>(null)
    useGSAP((gsap) => {
        if (!ref.current) return
        const nodes = ref.current.querySelectorAll(".n")
        const edges = ref.current.querySelectorAll(".e")
        gsap.to(nodes, { scale: 1.35, transformOrigin: "center", duration: 1.4, stagger: { each: 0.18, repeat: -1, yoyo: true }, ease: "sine.inOut" })
        gsap.fromTo(edges, { opacity: 0.08 }, { opacity: 0.65, duration: 1.1, stagger: { each: 0.12, repeat: -1, yoyo: true }, ease: "sine.inOut" })
        // animate the entry of edges (draw)
        edges.forEach((edge: any) => {
            const len = edge.getTotalLength ? edge.getTotalLength() : 60
            gsap.set(edge, { strokeDasharray: len, strokeDashoffset: len })
            gsap.to(edge, { strokeDashoffset: 0, duration: 0.6, delay: Math.random() * 1.5, ease: "power2.out" })
        })
    }, [])
    const pts = [{ x:60,y:90 },{ x:160,y:45 },{ x:160,y:130 },{ x:270,y:20 },{ x:270,y:90 },{ x:270,y:155 },{ x:380,y:50 },{ x:380,y:120 },{ x:440,y:85 }]
    const edgePairs = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7],[6,8],[7,8]]
    return (
        <svg ref={ref} viewBox="0 0 500 195" style={{ width: "88%", maxWidth: 400 }}>
            {edgePairs.map(([a,b],i) => <line key={i} className="e" x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke="rgba(229,86,2,0.45)" strokeWidth="1.5"/>)}
            {pts.map((p,i) => (
                <g key={i}>
                    {(i===0||i===pts.length-1) && <circle cx={p.x} cy={p.y} r="12" fill="rgba(229,86,2,0.15)"/>}
                    <circle className="n" cx={p.x} cy={p.y} r={i===0||i===pts.length-1?7:5} fill={i===0||i===pts.length-1?"#E55602":"rgba(229,86,2,0.75)"}/>
                </g>
            ))}
        </svg>
    )
}

function MondeeGlobe() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: 48 }}>
            <div style={{ position: "relative", width: 140, height: 140 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(69,14,20,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div style={{ position: "absolute", top: -5, left: "50%", width: 8, height: 8, borderRadius: "50%", background: T.maroon, translateX: "-50%" }}/>
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1.5px dashed rgba(69,14,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div style={{ position: "absolute", top: -4, left: "50%", width: 6, height: 6, borderRadius: "50%", background: "rgba(69,14,20,0.4)", translateX: "-50%" }}/>
                </motion.div>
                <div style={{ position: "absolute", inset: 40, borderRadius: "50%", background: T.maroon, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(69,14,20,0.3)" }}>
                    <span style={{ fontSize: 22 }}>✈</span>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, color: T.muted, fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}>Global inventory network</div>
                <div style={{ fontSize: 12, color: "rgba(var(--text-rgb),0.3)", fontFamily: "Plus Jakarta Sans", marginTop: 5 }}>500+ airlines · 2M+ hotels · 50+ partners</div>
            </div>
        </div>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeTechnologyPage(_props: any) {

    // Fix viewport meta for mobile responsiveness
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
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "#0F0407", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle/>
            <ScrollBar/>
            <SiteNav />
            <TechHero/>
            <V11PageImage src={technologyPageImg} alt="Administrator working with the Miraee platform" label="Intelligence in context" caption="The platform connects live travel context with company controls so every action remains useful, governed, and visible." position="center top" mobilePosition="center top" />
            <AgenticAI/>
            <WhatAgentsDo/>
            <BrainAndHeart/>
            <V1Footer />
        </div>
    )
}
