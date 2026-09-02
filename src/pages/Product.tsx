import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiteNav, V1Footer } from "../components/LegalFormKit"
import V11PageImage from "../components/V11PageImage"
import productPageImg from "../../images/weavy/v1/v1-home-hero.webp"
import miraeeFavicon from "../assets/favicon-180.png"
gsap.registerPlugin(ScrollTrigger)

// ─── Design tokens ───────────────────────────────────────────────────────────
const T = {
    ink:    "var(--text)",
    maroon: "#450E14",
    orange: "#E55602",
    cream:  "#FBF6F2",
    white:  "#FFFFFF",
    muted:  "rgba(var(--text-rgb),0.45)",
    mutedLight: "rgba(var(--text-rgb),0.12)",
    accent: "var(--accent-strong)",
}

// ─── GSAP (npm) ──────────────────────────────────────────────────────────────
function useGSAP(cb: (gsap: any, ST: any) => void | (() => void), deps: any[] = []) {
    useEffect(() => {
        const cleanup = cb(gsap, ScrollTrigger)
        return () => { if (typeof cleanup === "function") cleanup() }
    }, deps)
}

// ─── Mouse parallax ──────────────────────────────────────────────────────────
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
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 60, damping: 18 })
    const sy = useSpring(y, { stiffness: 60, damping: 18 })
    useEffect(() => {
        if (typeof window === "undefined") return
        const h = (e: MouseEvent) => {
            x.set((e.clientX - window.innerWidth / 2) * 0.04)
            y.set((e.clientY - window.innerHeight / 2) * 0.04)
        }
        window.addEventListener("mousemove", h)
        return () => window.removeEventListener("mousemove", h)
    }, [])
    return { x: sx, y: sy }
}

// ─── Ripple hook ─────────────────────────────────────────────────────────────
function useRipple() {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
    const trigger = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const id = Date.now()
        setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600)
    }, [])
    const rippleEls = ripples.map(r => (
        <motion.span key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ position: "absolute", borderRadius: "50%", width: 40, height: 40, background: "rgba(255,255,255,0.35)", pointerEvents: "none", left: r.x - 20, top: r.y - 20, zIndex: 10 }} />
    ))
    return { trigger, rippleEls }
}

// ─── Tilt card ───────────────────────────────────────────────────────────────
function TiltCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const onMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setTilt({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 14, y: ((e.clientY - rect.top) / rect.height - 0.5) * -14 })
    }, [])
    return (
        <div ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
            onMouseMove={onMove}
            style={{
                transform: hovered ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : "perspective(900px) rotateX(0deg) rotateY(0deg)",
                transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease",
                ...style,
            }}>
            {children}
        </div>
    )
}

// ─── Reveal wrapper ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none" }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.25 })
    const initMap = { up: { y: 48, opacity: 0 }, left: { x: -48, opacity: 0 }, right: { x: 48, opacity: 0 }, none: { opacity: 0 } }
    const init = initMap[direction]
    return (
        <motion.div ref={ref}
            initial={init}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : init}
            transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}>
            {children}
        </motion.div>
    )
}

// ─── Smooth scroll ────────────────────────────────────────────────────────────
function SmoothScrollStyle() {
    useEffect(() => {
        if (typeof document === "undefined") return
        const existing = document.getElementById("prod-scroll-style")
        if (existing) return
        const s = document.createElement("style")
        s.id = "prod-scroll-style"
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;}`
        document.head.appendChild(s)
    }, [])
    return null
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
function useMagnet(strength = 0.35) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 18 })
    const sy = useSpring(y, { stiffness: 200, damping: 18 })
    const onMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
    }, [strength, x, y])
    const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])
    useEffect(() => {
        const el = ref.current; if (!el) return
        el.addEventListener("mousemove", onMove); el.addEventListener("mouseleave", onLeave)
        return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
    }, [onMove, onLeave])
    return { ref, sx, sy }
}

// ─── Scroll counter ───────────────────────────────────────────────────────────
function useScrollCounter(target: number, suffix = "", decimals = 0) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.5 })
    useEffect(() => {
        if (ref.current) ref.current.textContent = (decimals > 0 ? target.toFixed(decimals) : Math.round(target)) + suffix
    }, [])
    useGSAP((gsap) => {
        if (!inView || !ref.current) return
        const obj = { val: 0 }
        gsap.to(obj, {
            val: target, duration: 1.8, ease: "power2.out",
            onUpdate: () => {
                if (ref.current) ref.current.textContent = (decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val)) + suffix
            }
        })
    }, [inView])
    return ref
}

// ─── Section label ────────────────────────────────────────────────────────────
function Label({ text }: { text: string }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>
                {text}
            </span>
        </div>
    )
}

// ─── 2.1 HERO ────────────────────────────────────────────────────────────────
function ProductHero() {
    const ww = useWindowWidth()
    const isMobile = ww < 768
    const { trigger, rippleEls } = useRipple()
    const words = ["One", "system.", "The", "entire", "journey."]

    return (
        <section style={{ minHeight: "100vh", background: "var(--page-bg)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
            {/* Noise grain overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px", pointerEvents: "none", zIndex: 1 }} />

            {/* Radial glows */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                <div style={{ position: "absolute", top: "-10%", left: "20%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.10) 0%, transparent 65%)" }} />
                <div style={{ position: "absolute", bottom: "0%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.07) 0%, transparent 65%)" }} />
            </div>

            {/* Main content — single centered column */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 860, width: "100%", margin: "0 auto", padding: isMobile ? "140px 20px 80px" : "160px 64px 100px", position: "relative", zIndex: 2, boxSizing: "border-box", textAlign: "center" }}>

                {/* Pill label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(229,86,2,0.12)", border: "1px solid rgba(229,86,2,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 36 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                    <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange }}>The Platform</span>
                </motion.div>

                {/* Headline — two-line reveal, matching the V1 home hero pattern */}
                <h1 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 32px", textAlign: "center", overflow: "hidden" }}>
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ display: "block", color: T.ink }}>
                            One system.
                        </motion.span>
                    </span>
                    <span style={{ display: "block", overflow: "hidden" }}>
                        <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ display: "block", color: T.orange }}>
                            The entire journey.
                        </motion.span>
                    </span>
                </h1>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.65, ease: [0.16,1,0.3,1] }}
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 19, lineHeight: 1.7, color: T.muted, margin: "0 auto 48px", maxWidth: 620 }}>
                    Six capabilities running on one continuous context inside a single corporate travel platform. Miraee doesn't pass your trip between tools. It carries it.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85, duration: 0.6 }}
                    style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    <motion.a href="/book-a-demo"
                        whileHover={{ scale: 1.04, boxShadow: "0 20px 56px rgba(229,86,2,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{ position: "relative", overflow: "hidden", background: T.orange, color: T.white, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, fontWeight: 700, padding: "16px 36px", borderRadius: 12, border: "none", cursor: "pointer", letterSpacing: "-0.01em", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>See Miraee live ↗
                    </motion.a>
                    <motion.a href="#capabilities" onClick={trigger}
                        whileHover={{ scale: 1.04, borderColor: "rgba(69,14,20,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        style={{ position: "relative", overflow: "hidden", background: "transparent", color: T.muted, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, fontWeight: 500, padding: "16px 32px", borderRadius: 12, border: "1px solid rgba(69,14,20,0.14)", cursor: "pointer", transition: "border-color 0.25s", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                        {rippleEls}
                        Jump to a capability ↓
                    </motion.a>
                </motion.div>

                {/* Feature chips */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.6 }}
                    style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 40, justifyContent: "center" }}>
                    {["PLAN", "BOOK", "EXPENSE", "CHANGE", "SUPPORT", "PERSONAL"].map((c) => (
                        <div key={c} style={{ padding: "7px 14px", borderRadius: 100, border: "1px solid rgba(69,14,20,0.14)", background: "rgba(69,14,20,0.03)" }}>
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: T.muted }}>{c}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Trust bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    style={{ display: "flex", gap: 28, marginTop: 48, flexWrap: "wrap", justifyContent: "center" }}>
                    {[["500+", "Airlines"], ["2M+", "Properties"], ["<60s", "To itinerary"], ["97%", "Journey agent-managed"]].map(([n, l]) => (
                        <div key={l} style={{ borderLeft: "1px solid rgba(69,14,20,0.12)", paddingLeft: 16, textAlign: "left" }}>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>{n}</div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: T.muted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom fade into next section */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, transparent, var(--surface))`, pointerEvents: "none", zIndex: 2 }} />
        </section>
    )
}

// ─── Animated stat group for WhatIsMiraee ─────────────────────────────────────
function WhatStats() {
    const r1 = useScrollCounter(500, "+")
    const r2 = useScrollCounter(2, "M+")
    const r3 = useScrollCounter(60, "s")
    return (
        <div style={{ display: "flex", gap: 40 }}>
            {[
                { ref: r1, label: "Airlines" },
                { ref: r2, label: "Properties" },
                { ref: r3, label: "To itinerary" },
            ].map(({ ref, label }) => (
                <div key={label}>
                    <div style={{ fontFamily: "Cardo, serif", fontSize: 36, fontWeight: 700, color: T.maroon, letterSpacing: "-0.03em" }}>
                        <span ref={ref}>0</span>
                    </div>
                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: T.muted, marginTop: 2 }}>{label}</div>
                </div>
            ))}
        </div>
    )
}

// ─── 2.2 WHAT IS MIRAEE ──────────────────────────────────────────────────────
function WhatIsMiraee() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 80, alignItems: "center" }}>
                <div>
                    <Reveal direction="left">
                        <Label text="What is Miraee" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
                            One system.<br />
                            <span style={{ color: T.maroon, fontStyle: "italic" }}>The entire journey.</span>
                        </h2>
                    </Reveal>
                    <Reveal direction="left" delay={0.1}>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 20px" }}>
                            Miraee runs six capabilities — plan, book, expense, change, support, and personal travel — on one continuous context. It doesn't pass your trip between tools. It carries it, from request to reconciliation.
                        </p>
                    </Reveal>
                    <Reveal direction="left" delay={0.2}>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 36px" }}>
                            No portals. No expense forms. No month-end surprises. Just one agent that carries the trip, start to finish.
                        </p>
                    </Reveal>
                    <Reveal direction="left" delay={0.3}>
                        <WhatStats />
                    </Reveal>
                </div>
                <Reveal direction="right" delay={0.15}>
                    <TiltCard>
                        <div style={{ background: "var(--page-bg)", borderRadius: 24, padding: "48px 44px", border: `1px solid ${T.mutedLight}`, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 70%)" }} />
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 28, fontStyle: "italic", color: T.ink, lineHeight: 1.45, marginBottom: 28, position: "relative" }}>
                                "One agent carries one context, from request to reconciliation. Nothing is handed off."
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                                    <img src={miraeeFavicon} alt="Miraee" width="40" height="40" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13, color: T.ink }}>Miraee Platform</div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, color: T.muted }}>Built on Mondee inventory · Tabhi AI</div>
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.3 UNIFIED EXPERIENCE ───────────────────────────────────────────────────
function UnifiedExperience() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.3 })

    const before = [
        "Search a booking tool for flight options",
        "Email a manager for approval",
        "Book the hotel separately, in another tool",
        "Wait on a call when the itinerary changes",
        "Photograph the receipt, file an expense report",
        "Chase finance for reimbursement next month",
    ]
    const after = [
        "Ask once, in plain language",
        "One agent carries it — start to finish.",
    ]

    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="Unified Experience" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Before Miraee vs. After Miraee
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 520, margin: "0 auto" }}>
                            Four disconnected stages become one continuous thread.
                        </p>
                    </Reveal>
                </div>
                <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32 }}>
                    {/* Before */}
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: "var(--surface)", borderRadius: 24, padding: "40px 36px", border: `1px solid ${T.mutedLight}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(var(--text-rgb),0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: 14 }}>✕</span>
                            </div>
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 15, color: T.ink }}>Without Miraee</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {before.map((step, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 1 }}
                                    animate={inView ? { opacity: 0.4 } : { opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                                    style={{ position: "relative" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                        <div style={{ minWidth: 24, height: 24, borderRadius: 6, background: "rgba(var(--text-rgb),0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, color: T.muted }}>{i + 1}</span>
                                        </div>
                                        <motion.span
                                            animate={inView ? { textDecoration: "line-through" } : {}}
                                            transition={{ delay: 0.8 + i * 0.12 }}
                                            style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: T.ink, lineHeight: 1.5, textDecoration: "none" }}>
                                            {step}
                                        </motion.span>
                                    </div>
                                    <motion.div
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={inView ? { scaleX: 1 } : {}}
                                        transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                                        style={{ position: "absolute", top: "50%", left: 36, right: 0, height: 1.5, background: T.muted, transformOrigin: "left" }} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* After */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ background: T.maroon, borderRadius: 24, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -40, right: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(251,246,242,0.06)" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(251,246,242,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: 14, color: T.cream }}>✓</span>
                            </div>
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 15, color: T.cream }}>With Miraee</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {after.map((step, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 1.6 + i * 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                                    <div style={{ minWidth: 28, height: 28, borderRadius: 8, background: T.orange, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 800, color: T.white }}>{i + 1}</span>
                                    </div>
                                    <span style={{ fontFamily: i === 1 ? "Cardo, serif" : "Plus Jakarta Sans, sans-serif", fontSize: i === 1 ? 32 : 20, fontWeight: 700, color: T.cream, lineHeight: 1.2, letterSpacing: i === 1 ? "-0.02em" : 0 }}>
                                        {step}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 2.5, duration: 0.6 }}
                            style={{ marginTop: 48, padding: "20px 24px", background: "rgba(251,246,242,0.10)", borderRadius: 14 }}>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "rgba(251,246,242,0.7)", marginBottom: 6 }}>Every segment, monitored</div>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 40, fontWeight: 700, color: T.cream, letterSpacing: "-0.03em" }}>24/7</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// ─── 2.4 PERSONALISATION ENGINE ───────────────────────────────────────────────
function PersonalisationEngine() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cards = [
        {
            num: "01",
            tag: "Traveler context",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.5" stroke={T.maroon} strokeWidth="1.8"/>
                    <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={T.maroon} strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            body: "Preferences, loyalty programs, seat and cabin history, dietary and access needs, the routes they fly most, seat preferences. Asked once. Applied always.",
            accent: T.maroon,
        },
        {
            num: "02",
            tag: "Company context",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke={T.orange} strokeWidth="1.8"/>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.2" fill={T.orange}/>
                </svg>
            ),
            body: "Per diem policy enforcement, corporate card expense management, budget ownership. Approval chains. Preferred suppliers. Entity & cost centre. Set once. Enforced everywhere.",
            accent: T.orange,
        },
        {
            num: "03",
            tag: "Trip state",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#1a6b4a" strokeWidth="1.8"/>
                    <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="#1a6b4a" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            body: "Every search, decision, booking, change, payment and receipt - live, in one place, for the whole life of the trip.",
            accent: "#1a6b4a",
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="One Continuous Context" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            The context <span style={{ color: T.maroon }}>never resets.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, lineHeight: 1.7, color: T.muted, maxWidth: 640, margin: "0 auto" }}>
                            Integrated tools pass records to each other. Miraee holds a single thread as one travel and expense management system, so the agent that plans your trip is the agent that rebooks it, and the same agent that closes the expense.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 28 }}>
                    {cards.map((c, i) => (
                        <Reveal key={c.tag} direction="up" delay={i * 0.12}>
                            <TiltCard style={{ height: "100%" }}>
                                <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "40px 36px", border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${c.accent}10` }} />
                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            {c.icon}
                                        </div>
                                        <span style={{ fontFamily: "Cardo, serif", fontSize: 22, fontWeight: 700, color: c.accent, opacity: 0.7 }}>{c.num}</span>
                                    </div>
                                    <div style={{ display: "inline-block", background: `${c.accent}15`, color: c.accent, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                                        {c.tag}
                                    </div>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{c.body}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>

                {/* Closing strip */}
                <Reveal delay={0.3} direction="none">
                    <div style={{ marginTop: 56, textAlign: "center" }}>
                        <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: 14, padding: "14px 28px", borderRadius: 100, background: `${T.maroon}0D`, border: `1px solid ${T.mutedLight}`, marginBottom: 20 }}>
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.maroon }}>
                                One thread · One policy layer · One data layer
                            </span>
                        </div>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.7, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                            Integration moves data between systems. Continuous context means there was never a second system.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.4b SIX CAPABILITIES — DEEP DIVES ───────────────────────────────────────
function CapabilityCard({ cap, index, open, onToggle }: { cap: any; index: number; open: boolean; onToggle: () => void }) {
    return (
        <div style={{ background: "var(--surface)", borderRadius: 20, border: `1px solid ${T.mutedLight}`, overflow: "hidden" }}>
            <button onClick={onToggle} aria-expanded={open}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 24, padding: "28px 32px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "Cardo, serif", fontSize: 32, fontWeight: 700, color: T.maroon, opacity: 0.55, flexShrink: 0, minWidth: 48 }}>{cap.num}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>{cap.tag}</div>
                    <h3 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(19px, 2vw, 24px)", fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.25 }}>{cap.headline}</h3>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, fontWeight: 700, color: T.maroon, whiteSpace: "nowrap" }}>{cap.proof}</div>
                    <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ fontSize: 24, color: T.orange, lineHeight: 1 }}>+</motion.span>
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" as const }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 32px 32px 32px", display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 760, marginLeft: 72 }}>
                            <div>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>Trigger</div>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.trigger}</p>
                            </div>
                            <div>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>What the agent does</div>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.does}</p>
                            </div>
                            <div>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 6 }}>What you control</div>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.ink, margin: 0 }}>{cap.control}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SixCapabilities() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const [openIdx, setOpenIdx] = useState<number>(0)

    const caps = [
        {
            num: "01", tag: "Plan",
            headline: "Describe the trip. Get the itinerary.",
            trigger: "A sentence. “Singapore next Tuesday, back Friday, window seat, within policy.”",
            does: "The agent reads the intent, checks the calendar, searches live inventory, applies company policy per employee role before options are projected in front of the employee. It returns one recommended journey with alternates, each of them compliant with the policy already.",
            control: "The employee stays in control, choosing from options that are already compliant. Approval thresholds. Preferred suppliers. Which trips need sign-off before booking.",
            proof: "< 60s to a per diem policy enforcement",
        },
        {
            num: "02", tag: "Book",
            headline: "One approval. Everything booked together.",
            trigger: "Approval of the recommended journey or automatic booking, if the trip sits inside limits you have already set.",
            does: "Books flight, hotel, rail and car as one trip rather than four transactions. Applies wholesale rates, issues a virtual card for the booking, and syncs the itinerary to the traveler's calendar.",
            control: "Payment method and virtual card rules. Entity and cost centre allocation. What may be booked without human review.",
            proof: "20–30% below published fares",
        },
        {
            num: "03", tag: "Expense",
            headline: "The report writes itself.",
            trigger: "The transaction. Nothing needs to be submitted.",
            does: "Captures the receipt, codes the expense to the right category, entity and cost centre, matches it to the original booking, processes the invoice, and posts it to your ERP — AI expense management and automated expense reporting that runs end to end.",
            control: "Chart of accounts mapping. Coding rules. Exception thresholds. Final approval before posting, if employees want it.",
            proof: "0 forms filed by the traveler",
        },
        {
            num: "04", tag: "Change",
            headline: "The trip changes. Employees get one decision.",
            trigger: "A cancellation, a delay, a schedule change, or a message from the traveler.",
            does: "Detects the disruption, often before the airline notifies, finds alternatives, prices each against cost and policy, and brings back one clear recommendation. Inside pre-agreed limits, it simply rebooks and informs employees.",
            control: "What the agent may rebook without asking. Spend ceilings for autonomous changes. Who gets notified, and when.",
            proof: "97% of the journey agent-managed",
        },
        {
            num: "05", tag: "Continuous support",
            headline: "A real person, in the same thread.",
            trigger: "Anything the traveler would rather hand to a human.",
            does: "Escalates to a travel specialist with the full trip context already attached: every search, booking, policy check and change. The traveler never re-explains the trip.",
            control: "Escalation rules. Which trip types, travelers or regions always route to a human first.",
            proof: "24/7 human support",
        },
        {
            num: "06", tag: "Personal travel",
            headline: "The same agent. Separate spend.",
            trigger: "A personal trip request, in the same conversation as the work ones.",
            does: "Plans and books it on the traveler's own card, with corporate rates applied where your agreements permit. Company money is never touched and personal trips never enter company reporting — bleisure travel without the reporting headache.",
            control: "Whether personal travel is enabled at all, and which negotiated rates extend to it.",
            proof: "1 agent, 2 ledgers",
        },
    ]

    return (
        <section id="capabilities" style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="Six Capabilities" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            One agent. <span style={{ color: T.maroon, fontStyle: "italic" }}>Six jobs.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                            Plan, book, expense, change, support, personal — each with its own trigger, its own work, and a proof point behind it.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {caps.map((cap, i) => (
                        <Reveal key={cap.num} direction="up" delay={i * 0.05}>
                            <CapabilityCard cap={cap} index={i} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
                        </Reveal>
                    ))}
                </div>

                {/* Savings callout */}
                <Reveal delay={0.2} direction="none">
                    <div style={{ marginTop: 40, background: T.maroon, borderRadius: 20, padding: isMobile ? "28px 28px" : "36px 44px", display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: 24 }}>
                        <div style={{ minWidth: 4, alignSelf: "stretch", borderRadius: 2, background: T.orange, display: isMobile ? "none" : "block" }} />
                        <div>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.65, color: T.cream, margin: "0 0 10px", fontWeight: 600 }}>
                                Savings of 20–30% against published fares on comparable itineraries, achieved through wholesale rates and direct supplier connections.
                            </p>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12.5, lineHeight: 1.6, color: "rgba(251,246,242,0.5)", margin: 0 }}>
                                Based on itineraries booked, compared with publicly available fares for the same route, travel date, cabin, and booking window. Individual results may vary by route, lead time, and travel mix.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.4c HOW IT WORKS ─────────────────────────────────────────────────────────
function HowItWorks() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const stages = [
        {
            num: "01", title: "Understands intent",
            works: "Dates and how flexible they are, cabin and seat preference, the policy band for that route and grade, calendar conflicts, whether an approval is required at all.",
            see: "One recommended journey, two alternates, the policy status of each.",
            proof: "< 60 sec",
        },
        {
            num: "02", title: "Completes the work",
            works: "Which fare and rate combination is cheapest as a whole trip rather than segment by segment. Which card to issue. Who needs to know.",
            see: "One approval. Then a confirmed trip in the calendar.",
            proof: "One approval",
        },
        {
            num: "03", title: "Stays ahead",
            works: "Every segment is monitored continuously. Disruption detected, alternatives priced against policy before anyone asks.",
            see: "A notification that it is handled or one decision if it genuinely needs you.",
            proof: "24/7",
        },
        {
            num: "04", title: "Closes the loop",
            works: "Receipts matched, expenses coded, transactions reconciled, entries posted to the ERP.",
            see: "Account managed and automated invoice processed already, autonomously.",
            proof: "Zero forms",
        },
    ]
    return (
        <section style={{ background: "#0F0407", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <Reveal direction="none">
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,246,242,0.45)" }}>How It Works</span>
                        </div>
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Ask once. <span style={{ color: T.orange }}>Keep moving.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: "rgba(251,246,242,0.5)", maxWidth: 560, margin: "0 auto 32px" }}>
                            One request. Four stages. No restarts, no repeating yourself, no managing the process.
                        </p>
                        <div style={{ display: "inline-block", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(251,246,242,0.12)", borderRadius: 14, padding: "18px 28px" }}>
                            <span style={{ fontFamily: "Cardo, serif", fontSize: 19, fontStyle: "italic", color: T.cream }}>"Singapore next Tuesday. Window seat. Within policy."</span>
                        </div>
                    </Reveal>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 20 }}>
                    {stages.map((s, i) => (
                        <Reveal key={s.num} direction="up" delay={i * 0.1}>
                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,246,242,0.10)", borderRadius: 18, padding: "28px 24px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                                <span style={{ fontFamily: "Cardo, serif", fontSize: 30, fontWeight: 700, color: T.orange, opacity: 0.8, marginBottom: 12 }}>{s.num}</span>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(251,246,242,0.5)", marginBottom: 14 }}>{s.title}</div>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13.5, lineHeight: 1.6, color: "rgba(251,246,242,0.55)", margin: "0 0 16px" }}>{s.works}</p>
                                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(251,246,242,0.10)" }}>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.orange, marginBottom: 6 }}>You see</div>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13.5, lineHeight: 1.55, color: T.cream, margin: "0 0 12px" }}>{s.see}</p>
                                    <div style={{ fontFamily: "Cardo, serif", fontSize: 18, fontWeight: 700, color: T.cream }}>{s.proof}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.3} direction="none">
                    <div style={{ marginTop: 40, textAlign: "center" }}>
                        <div style={{ display: "inline-block", padding: "12px 24px", borderRadius: 100, background: "rgba(229,86,2,0.12)", border: "1px solid rgba(229,86,2,0.3)" }}>
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.05em", color: T.orange }}>
                                JOURNEY STATE: Everything handled. Plan · book · protect · expense
                            </span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.5 ANALYTICS & INSIGHTS ─────────────────────────────────────────────────
function AnalyticsInsights() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const chartRef = useRef<HTMLDivElement>(null)
    const inView = useInView(chartRef, { once: true, amount: 0.4 })
    const bars = [
        { label: "Jan", value: 45, color: T.maroon },
        { label: "Feb", value: 62, color: T.maroon },
        { label: "Mar", value: 38, color: T.maroon },
        { label: "Apr", value: 78, color: T.orange },
        { label: "May", value: 55, color: T.maroon },
        { label: "Jun", value: 88, color: T.maroon },
    ]
    const m1 = useScrollCounter(30, "%")
    const m2 = useScrollCounter(97, "%")
    const m3 = useScrollCounter(24, "/7")
    const metricRefs = [m1, m2, m3]
    const metrics = [
        { label: "Below published fares", sub: "wholesale rates, applied automatically", accent: T.orange },
        { label: "Of the journey", sub: "agent-managed, end to end", accent: T.maroon },
        { label: "Segments monitored", sub: "disruption caught before you ask", accent: T.maroon },
    ]
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <div>
                        <Reveal direction="left">
                            <Label text="Analytics & Insights" />
                            <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                                Every trip,<br />
                                <span style={{ color: T.maroon, fontStyle: "italic" }}>visible in real time.</span>
                            </h2>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 48px" }}>
                                A console built for finance and travel teams — policy, approvals, live spend, duty of care, reporting, and the supplier program. Catch issues while you can still act, not at month-end when it's too late.
                            </p>
                        </Reveal>
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            {metrics.map((m, i) => (
                                <Reveal key={m.label} direction="left" delay={0.15 + i * 0.1}>
                                    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                                        <div style={{ minWidth: 4, height: 52, borderRadius: 2, background: m.accent }} />
                                        <div>
                                            <div style={{ fontFamily: "Cardo, serif", fontSize: 36, fontWeight: 700, color: T.ink, letterSpacing: "-0.03em", lineHeight: 1 }}>
                                                <span ref={metricRefs[i]}>0</span>
                                            </div>
                                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: T.ink, fontWeight: 600, marginTop: 2 }}>{m.label}</div>
                                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, color: T.muted }}>{m.sub}</div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Animated dashboard mockup */}
                    <Reveal direction="right" delay={0.1}>
                        <div style={{ background: "var(--surface)", borderRadius: 24, padding: 32, boxShadow: "0 24px 64px rgba(var(--text-rgb),0.1)", border: `1px solid ${T.mutedLight}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 15, color: T.ink }}>Travel Spend</div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, color: T.muted, marginTop: 2 }}>Jan — Jun 2025</div>
                                </div>
                                <div style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", padding: "6px 12px", borderRadius: 100, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 700 }}>
                                    ↓ 20–30% vs. published fares
                                </div>
                            </div>
                            <div ref={chartRef} style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 160, padding: "0 0 0", marginBottom: 16 }}>
                                {bars.map((b, i) => (
                                    <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={inView ? { height: `${b.value}%` } : {}}
                                            transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ width: "100%", borderRadius: "6px 6px 0 0", background: b.color, opacity: b.label === "Apr" ? 1 : 0.7 }} />
                                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: T.muted }}>{b.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ borderTop: `1px solid ${T.mutedLight}`, paddingTop: 16, display: "flex", gap: 20 }}>
                                {[{ k: "Total", v: "$142K" }, { k: "Savings", v: "$40K" }, { k: "OOP", v: "2.1%" }].map(({ k, v }) => (
                                    <div key={k}>
                                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: T.muted }}>{k}</div>
                                        <div style={{ fontFamily: "Cardo, serif", fontSize: 20, fontWeight: 700, color: T.ink }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// ─── 2.6 PLATFORM ARCHITECTURE ────────────────────────────────────────────────
function PlatformArchitecture() {
    const ww = useWindowWidth()
    const isMobile = ww < 768

    const layers = [
        {
            num: "01",
            title: "Conversational Interface",
            body: "One request, in plain language. Miraee reads dates and flexibility, cabin and seat preference, the policy band for that route and grade, and calendar conflicts — before a single option appears.",
            color: T.orange,
            glow: "rgba(229,86,2,0.18)",
        },
        {
            num: "02",
            title: "Six Specialised Agents",
            body: "Not one assistant wearing different hats — booking, policy, negotiation, rebooking, expense and support agents, each with a written limit on what it may do alone, all reading the same trip thread.",
            color: T.maroon,
            glow: "rgba(69,14,20,0.25)",
        },
        {
            num: "03",
            title: "Mondee Inventory & Settlement",
            body: "500+ airlines, 2M+ properties — wholesale rates and direct connections sourced through Mondee, Tabhi's own supply marketplace. Booking, expense capture, and reconciliation happen automatically.",
            color: "#1a4e6b",
            glow: "rgba(26,78,107,0.25)",
        },
    ]

    return (
        <section style={{ background: "#0F0407", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Heading */}
                <Reveal direction="none">
                    <div style={{ textAlign: "center", marginBottom: 80 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,246,242,0.45)" }}>Platform Architecture</span>
                        </div>
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.cream, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Three layers.<br /><span style={{ color: T.orange }}>One seamless experience.</span>
                        </h2>
                    </div>
                </Reveal>

                {/* Cards with connecting line */}
                <div style={{ position: "relative" }}>
                    {/* Vertical connector line */}
                    <div style={{
                        position: "absolute", left: 59, top: 48, bottom: 48, width: 2,
                        background: `linear-gradient(to bottom, ${T.orange}, ${T.maroon}, #1a4e6b)`,
                        borderRadius: 2, opacity: 0.35, zIndex: 0,
                    }} />

                    <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 }}>
                        {layers.map((l, i) => (
                            <Reveal key={l.num} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                                <motion.div
                                    whileHover={{
                                        x: 6,
                                        backgroundColor: l.glow,
                                        boxShadow: `0 0 40px ${l.glow}`,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        display: "grid", gridTemplateColumns: "80px 1fr", gap: 36,
                                        padding: "36px 40px", borderRadius: 18,
                                        border: "1px solid rgba(251,246,242,0.10)",
                                        cursor: "default", position: "relative", overflow: "hidden",
                                    }}>
                                    {/* Left accent bar */}
                                    <div style={{
                                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                                        background: `linear-gradient(to bottom, ${l.color}, transparent)`,
                                        borderRadius: "18px 0 0 18px",
                                    }} />
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                                        <span style={{ fontFamily: "Cardo, serif", fontSize: 48, fontWeight: 700, color: l.color, lineHeight: 1, opacity: 0.9 }}>{l.num}</span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "Cardo, serif", fontSize: 26, fontWeight: 700, color: T.cream, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{l.title}</h3>
                                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(251,246,242,0.55)", margin: 0 }}>{l.body}</p>
                                    </div>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Quote block */}
                <Reveal direction="none" delay={0.15}>
                    <div style={{ marginTop: 64, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(251,246,242,0.10)", borderRadius: 20, padding: "44px 48px", display: "flex", alignItems: "flex-start", gap: 24 }}>
                        <div style={{ minWidth: 4, height: 72, borderRadius: 2, background: T.orange, marginTop: 4 }} />
                        <div>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 24, fontStyle: "italic", color: T.cream, lineHeight: 1.5, marginBottom: 16 }}>
                                "Singapore next Tuesday. Window seat. Within policy."
                            </div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "rgba(251,246,242,0.45)" }}>
                                That's the entire request. Dates, cabin, the policy band for that route and grade, and calendar conflicts — worked out before a single option appears.
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Not one agent. A workforce. */}
                <div style={{ marginTop: 96, textAlign: "center" }}>
                    <Reveal direction="none">
                        <Label text="The Architecture" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Not one agent. <span style={{ color: T.orange }}>A workforce.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, lineHeight: 1.7, color: "rgba(251,246,242,0.5)", maxWidth: 700, margin: "0 auto 56px" }}>
                            Specialized agents, each owning a job, all reading the same thread — a multi agent AI system built for travel, not a single assistant wearing different hats. They don't answer questions, they complete work.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
                    {[
                        { num: "01", name: "Booking agent", body: "Searches live inventory, assembles the trip, issues payment, confirms." },
                        { num: "02", name: "Policy agent", body: "Read your rules and apply them before options are shown, not after they are chosen." },
                        { num: "03", name: "Negotiation agent", body: "Works wholesale contracts and direct connections to price the trip below published fares." },
                        { num: "04", name: "Rebooking agent", body: "Watches every segment and resolve disruption inside the limits you set." },
                        { num: "05", name: "Expense agent", body: "Captures, codes, matches and reconciles without the traveler touching a form." },
                        { num: "06", name: "Support agent", body: "Routes to a human with the full trip context attached." },
                    ].map((a, i) => (
                        <Reveal key={a.num} direction="up" delay={i * 0.06}>
                            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,246,242,0.10)", borderRadius: 16, padding: "26px 28px", height: "100%", boxSizing: "border-box" }}>
                                <span style={{ fontFamily: "Cardo, serif", fontSize: 26, fontWeight: 700, color: T.orange, opacity: 0.7, flexShrink: 0 }}>{a.num}</span>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 16, color: T.cream, marginBottom: 8 }}>{a.name}</div>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "rgba(251,246,242,0.55)", margin: 0 }}>{a.body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.2} direction="none">
                    <div style={{ marginTop: 40, display: "flex", flexDirection: isMobile ? "column" : "row", gap: 20, alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,246,242,0.10)", borderRadius: 16, padding: "28px 32px" }}>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, lineHeight: 1.65, color: "rgba(251,246,242,0.55)", margin: 0, maxWidth: 600 }}>
                            An agent is a bounded, permissioned worker with one job, its own tools, and a written limit on what it may do alone.
                        </p>
                        <div style={{ fontFamily: "Cardo, serif", fontSize: 22, fontWeight: 700, color: T.cream, whiteSpace: "nowrap" }}>6 specialized agents <span style={{ color: T.orange }}>in production</span></div>
                    </div>
                </Reveal>

            </div>
        </section>
    )
}

// ─── 2.6b THE MONDEE ADVANTAGE ─────────────────────────────────────────────────
function MondeeAdvantage() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const rows = [
        { num: "01", title: "Global content", body: "Millions of properties and airline partners, sourced through direct connections and wholesale agreements rather than resold inventory.", proof: "2M+ properties" },
        { num: "02", title: "Wholesale economics", body: "Negotiated rates that travel with the trip, applied automatically at booking rather than claimed back later.", proof: "500+ airlines" },
        { num: "03", title: "Reach", body: "The Tabhi network already serves a traveler base at global scale, that volume is what makes the rates possible.", proof: "125M+ travelers reached" },
        { num: "04", title: "Local experiences", body: "Festivals, performances, markets and makers, content that no corporate channel has ever carried.", proof: "Hyperlocal" },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="The Mondee Advantage" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Global reach. <span style={{ color: T.maroon, fontStyle: "italic" }}>Personal execution.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, lineHeight: 1.7, color: T.muted, maxWidth: 720, margin: "0 auto" }}>
                            Miraee runs on Tabhi's own supply marketplace, Mondee, the supply depth behind enterprise travel solutions that others resell rather than own. An inventory full of wholesale contracts, direct connections, and hyperlocal content that nobody else has digitized.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
                    {rows.map((r, i) => (
                        <Reveal key={r.num} direction="up" delay={i * 0.08}>
                            <TiltCard style={{ height: "100%" }}>
                                <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "34px 32px", border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                        <span style={{ fontFamily: "Cardo, serif", fontSize: 24, fontWeight: 700, color: T.maroon, opacity: 0.6 }}>{r.num}</span>
                                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, fontWeight: 700, color: T.orange }}>{r.proof}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "Cardo, serif", fontSize: 21, fontWeight: 700, color: T.ink, margin: "0 0 12px" }}>{r.title}</h3>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{r.body}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.25} direction="none">
                    <p style={{ textAlign: "center", marginTop: 48, fontFamily: "Cardo, serif", fontSize: 20, fontStyle: "italic", color: T.ink }}>
                        Most platforms compete on software. We compete on software and supply.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7 INTEGRATIONS ─────────────────────────────────────────────────────────
function Integrations() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cats = [
        {
            title: "Identity",
            pills: ["SSO", "SAML", "SCIM", "Okta", "Entra"],
            body: "Provision and deprovision travelers automatically. No orphaned accounts.",
        },
        {
            title: "People",
            pills: ["HRIS"],
            body: "Grades, entities, cost centres and managers stay current without manual upkeep.",
        },
        {
            title: "Finance",
            pills: ["ERP", "Accounting systems", "Card networks"],
            body: "Automated expense reporting end to end. Coded expenses post directly, corporate card expenses are managed automatically, and accounts payable is reconciled at source.",
        },
        {
            title: "Work",
            pills: ["Calendar", "Email", "Chat"],
            body: "Itineraries and changes appear where people already work.",
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="Connected Systems" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Fits the stack<br />
                            <span style={{ color: T.maroon, fontStyle: "italic" }}>you already run.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 480, margin: "0 auto" }}>
                            Identity, people, finance and work tools, connected once, then quiet.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
                    {cats.map((c, ci) => (
                        <Reveal key={c.title} direction="up" delay={ci * 0.1}>
                            <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "32px 32px", border: `1px solid ${T.mutedLight}` }}>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 14, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>{c.title}</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                                    {c.pills.map((p, pi) => (
                                        <motion.div key={p}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: ci * 0.1 + pi * 0.06 }}
                                            whileHover={{ scale: 1.05, background: T.maroon, color: T.cream }}
                                            style={{ padding: "8px 16px", borderRadius: 100, background: "var(--surface)", border: `1px solid ${T.mutedLight}`, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, fontWeight: 600, color: T.ink, cursor: "default", transition: "background 0.2s, color 0.2s" }}>
                                            {p}
                                        </motion.div>
                                    ))}
                                </div>
                                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14.5, lineHeight: 1.6, color: T.muted, margin: 0 }}>{c.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.3} direction="none">
                    <div style={{ textAlign: "center", marginTop: 56, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
                        <h3 style={{ fontFamily: "Cardo, serif", fontSize: 24, fontWeight: 700, color: T.ink, margin: "0 0 14px" }}>
                            Bring Miraee into the tools your teams already use.
                        </h3>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.7, color: T.muted, margin: 0 }}>
                            Ask for a trip status, approve a booking, or pull a spend report without leaving the assistant you already have open. Everything in one chat, just command.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7b MIRAEE VS LEGACY TMCS ────────────────────────────────────────────────
function LegacyComparison() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const rows = [
        { gen: "Legacy TMC", solved: "Expert humans brokering complex trips, with negotiated rates and real support behind them.", left: "Offline, slow, and priced per transaction, so the vendor earned more the more friction there was." },
        { gen: "First-generation T&E", solved: "Self-serve booking and digital expense, which removed the phone call and the paper receipt.", left: "The work moved to the traveler. Booking, approval, changes and expense stayed in four separate stages with four separate owners." },
        { gen: "Agentic", solved: "The stages collapse. One agent carries one context from request to reconciliation.", left: "—" },
    ]
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="Miraee vs Legacy TMCs" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Built different from<br /><span style={{ color: T.maroon, fontStyle: "italic" }}>the tools you're used to.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 560, margin: "0 auto" }}>
                            While there are other tools in the market, Miraee sits distinctly away. Let's show you how:
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {rows.map((r, i) => (
                        <Reveal key={r.gen} direction="up" delay={i * 0.1}>
                            <div style={{
                                display: "grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 1fr", gap: isMobile ? 16 : 32,
                                background: r.gen === "Agentic" ? T.maroon : "var(--surface)", borderRadius: 20, padding: isMobile ? "28px 24px" : "36px 40px",
                                border: r.gen === "Agentic" ? "none" : `1px solid ${T.mutedLight}`,
                            }}>
                                <div style={{ fontFamily: "Cardo, serif", fontSize: 21, fontWeight: 700, color: r.gen === "Agentic" ? T.cream : T.ink }}>{r.gen}</div>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: r.gen === "Agentic" ? "rgba(251,246,242,0.5)" : T.muted, marginBottom: 8 }}>Solved</div>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14.5, lineHeight: 1.6, color: r.gen === "Agentic" ? T.cream : T.ink, margin: 0 }}>{r.solved}</p>
                                </div>
                                <div>
                                    <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: r.gen === "Agentic" ? "rgba(251,246,242,0.5)" : T.muted, marginBottom: 8 }}>Left behind</div>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14.5, lineHeight: 1.6, color: r.gen === "Agentic" ? "rgba(251,246,242,0.7)" : T.muted, margin: 0 }}>{r.left}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.25} direction="none">
                    <p style={{ textAlign: "center", marginTop: 48, fontFamily: "Cardo, serif", fontSize: 22, fontWeight: 700, color: T.ink }}>
                        The New Generation of Travel Planning. <span style={{ color: T.maroon, fontStyle: "italic" }}>Powered by Agentic AI.</span>
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.7c ONE PLATFORM, TWO VIEWS ──────────────────────────────────────────────
function TwoViews() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <Reveal direction="none">
                        <Label text="One Platform, Two Views" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 0" }}>
                            A console for the program.<br /><span style={{ color: T.maroon, fontStyle: "italic" }}>An app for the trip.</span>
                        </h2>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 28 }}>
                    <Reveal direction="left">
                        <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "40px 36px", border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box" }}>
                            <div style={{ display: "inline-block", background: `${T.maroon}15`, color: T.maroon, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 20 }}>Web console</div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: T.muted, marginBottom: 6 }}>Who</div>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 20, fontWeight: 700, color: T.ink, marginBottom: 24 }}>Finance and travel teams</div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: T.muted, marginBottom: 6 }}>Holds</div>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.75, color: T.ink, margin: 0 }}>
                                Policy, approvals, live spend, <strong>duty of care</strong>, reporting, supplier program.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal direction="right" delay={0.1}>
                        <div style={{ background: T.maroon, borderRadius: 20, padding: "40px 36px", height: "100%", boxSizing: "border-box" }}>
                            <div style={{ display: "inline-block", background: "rgba(251,246,242,0.15)", color: T.cream, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 20 }}>Mobile app</div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "rgba(251,246,242,0.55)", marginBottom: 6 }}>Who</div>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 20, fontWeight: 700, color: T.cream, marginBottom: 24 }}>Travelers</div>
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "rgba(251,246,242,0.55)", marginBottom: 6 }}>Holds</div>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.75, color: T.cream, margin: 0 }}>
                                Ask, book, change, support, receipts, personal trips, live itinerary.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

// ─── 2.7d FAQ ───────────────────────────────────────────────────────────────────
function ProductFaqItem({ q, a, index }: { q: string; a: React.ReactNode; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ borderBottom: `1px solid ${T.mutedLight}` }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "22px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: T.orange, fontWeight: 700, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 16, fontFamily: "Cardo, serif", fontWeight: 700, color: T.ink }}>{q}</span>
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: 20, color: T.orange, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" as const }} style={{ overflow: "hidden" }}>
                        <p style={{ margin: "0 0 24px 40px", fontSize: 14.5, color: T.muted, fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.8, maxWidth: 680 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ProductFAQ() {
    const w = useWindowWidth()
    const isMobile = w < 768

    const faqs: [string, React.ReactNode][] = [
        ["What is Miraee?", <>Miraee is an AI-native <strong>employee travel platform</strong> that plans, books, changes and expenses business trips end to end. Rather than connecting a booking tool to an expense tool, Miraee runs the entire journey as one continuous travel and expense management system, so the same agent that plans a trip also rebooks it during disruption and closes the expense afterwards.</>],
        ["How is Miraee different from a travel management company?", <>A <strong>travel management company</strong> processes bookings and charges per transaction, with changes and support billed separately. Miraee is software: it understands a request in natural language, applies company policy before showing options, books the whole trip as one item, and handles changes and expenses automatically. Human travel specialists are included rather than charged per call.</>],
        ["What does it mean that Miraee uses AI agents?", "Miraee runs a multi agent AI system: bounded, permissioned workers that complete tasks rather than answer questions. Separate agents own booking, policy, negotiation, rebooking, expense and support, and all of them read the same trip thread. Each agent has a written limit on what it may do without human approval, and every action it takes is logged."],
        ["Does Miraee enforce our travel policy automatically?", "Yes. Miraee enforces travel policy compliance automatically, applying company policy before search results are shown, so travelers see options that are already in policy rather than discovering violations at approval. Policy can be set by route, grade, trip type and entity, and out-of-policy requests are either flagged for review or blocked, depending on how the rules are configured."],
        ["Do travelers still have to file expense reports?", "No. Miraee captures the receipt at the point of transaction, codes it to the correct category, entity and cost centre, matches it against the original booking, and posts it to the finance system, making expense reimbursement process easier. Travelers do not submit reports and finance teams do not chase receipts — this is automated expense reporting, not a task travelers manage."],
        ["What happens when a flight is cancelled or delayed?", "Miraee monitors every segment of every trip continuously and detects most disruptions before the airline notifies the traveler. The agent finds alternatives, prices each against company policy, and either rebooks automatically inside limits you have set or presents one clear recommendation for approval."],
        ["Can employees book personal travel through Miraee?", "Yes. The same agent plans personal trips using the traveler's own payment card, with corporate negotiated rates applied where supplier agreements permit. Personal spend never enters company reporting and company funds are never used, so business and personal travel stay entirely separate while sharing one experience — this is how Miraee supports bleisure travel without adding a second process."],
        ["What travel inventory does Miraee have access to?", "Miraee books flights, hotels, rail and car hire from live inventory sourced through direct supplier connections and wholesale agreements held by the Tabhi group, covering over 500 airlines and more than 2 million properties. It also carries hyperlocal experience content that is not available through other corporate travel channels."],
        ["Which systems does Miraee integrate with?", "Miraee connects to identity providers via SSO and SCIM, to HRIS platforms for traveler and cost centre data, to ERP and accounting systems for expense posting, to corporate card networks for payment, and to calendar and messaging tools for itineraries."],
        ["How long does implementation take?", "Pilots reach full deployment in as little as 90 days."],
    ]

    return (
        <section style={{ padding: isMobile ? "80px 24px" : "120px 80px", background: "var(--page-bg)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ marginBottom: isMobile ? 40 : 56, textAlign: "center" }}>
                        <Label text="FAQ" />
                        <h2 style={{ fontSize: isMobile ? 28 : 44, fontFamily: "Cardo, serif", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
                            Questions people ask before they book a demo.
                        </h2>
                    </div>
                </Reveal>
                <Reveal>
                    <div>
                        {faqs.map(([q, a], i) => <ProductFaqItem key={q} q={q} a={a} index={i} />)}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── 2.8 DEMO CTA ─────────────────────────────────────────────────────────────
function DemoCTA() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const { trigger, rippleEls } = useRipple()
    const { ref: magRef, sx, sy } = useMagnet(0.4)
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "140px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(69,14,20,0.06) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.07) 0%, transparent 70%)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto" }}>
                <Reveal direction="none">
                    <Label text="See The Agent In Action" />
                    <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Bring a<br />
                        <span style={{ color: T.maroon }}>real trip.</span>
                    </h2>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 56px" }}>
                        Twenty minutes. Your route, your policy, your edge cases. We'll run it live.
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <motion.div ref={magRef} style={{ display: "inline-block" }}>
                        <motion.a
                            href="/book-a-demo"
                            onClick={trigger}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ boxShadow: "0 24px 64px rgba(69,14,20,0.4)" }}
                            style={{ position: "relative", overflow: "hidden", background: T.maroon, color: T.cream, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, letterSpacing: "-0.01em", textDecoration: "none" }}>
                            <motion.span style={{ display: "flex", alignItems: "center", gap: 12, x: sx, y: sy }}>
                                {rippleEls}
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 0 3px rgba(34,197,94,0.3)" }} />
                                Book your demo ↗
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </Reveal>
                <Reveal delay={0.35}>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts · No heavy IT lift · Full deployment in as little as 90 days
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
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
    return (
        <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: T.orange, transformOrigin: "left", scaleX: progress, zIndex: 200 }} />
    )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeProductPage(_props: { style?: React.CSSProperties }) {

    // Meta title/description + viewport meta for mobile responsiveness
    useEffect(() => {
        document.title = "One Agent for the Entire Business Trip"
        const description = "Miraee is travel management software that unifies corporate travel and expense management, live travel spend analytics, and outcomes into one AI-native platform, so the systems that used to fight each other finally work as one."
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

        // The page is long and several sections mount with dynamic content, so
        // ScrollTrigger's cached start/end positions can go stale before the
        // full-page layout settles. Force a recalculation once everything below
        // has painted, otherwise triggers further down the page never fire.
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
        return () => cancelAnimationFrame(raf)
    }, [])
    return (
        <div className="v1-type-page" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: "Plus Jakarta Sans, sans-serif", background: "var(--page-bg)" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle />
            <ScrollProgress />
            <SiteNav />
            <ProductHero />
            <V11PageImage src={productPageImg} alt="Business traveler using Miraee during a journey" label="One connected journey" caption="Planning, booking, changes, support, and expenses stay connected from the first request to the final receipt." position="center 42%" mobilePosition="58% center" />
            <WhatIsMiraee />
            <UnifiedExperience />
            <PersonalisationEngine />
            <SixCapabilities />
            <HowItWorks />
            <AnalyticsInsights />
            <PlatformArchitecture />
            <MondeeAdvantage />
            <Integrations />
            <LegacyComparison />
            <TwoViews />
            <ProductFAQ />
            <DemoCTA />
            <V1Footer />
        </div>
    )
}
