import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { EO, FadeUp, SectionWrapper, StaggerWords, ScrambleText, TiltCard } from "../../animations"
import { useWindowWidth } from "../../hooks/useWindowSize"
import experienceMarket from "../../assets/miraee-experience-market.webp"
import experienceSkyline from "../../assets/team-travellers.jpg"
import experienceCabin from "../../assets/miraee-supplier-cabin.webp"
import experienceJet from "../../assets/partner-with-miraee.jpg"
import experienceLounge from "../../assets/role-traveller.jpg"
import experienceArrival from "../../assets/v2-home-hero.jpg"

// Verbatim ports of the V0 homepage sections the site-architecture doc calls
// for by name — layout and animation, not just the copy. Source is
// Miraee_landing_page/src/pages/Home.tsx; the content itself is catalogued in
// docs/v0-home-reference.md.
//
// Only two things are changed from V0: the colours read from V4's `--m-*`
// tokens instead of V0's hardcoded T object, and the "200+ AI agents" stat uses
// the site's current agents-plus-bots framing.

const T = {
    bg: "var(--m-paper)", bg2: "var(--m-surface)", surface2: "var(--m-soft)",
    ink: "var(--m-maroon)", maroon: "var(--m-maroon)", orange: "var(--m-orange)",
    muted: "var(--m-muted)", border: "var(--m-line)", card: "var(--m-surface)",
    cream: "#FBF6F2", accent: "var(--m-orange)",
}
const F = "\"Plus Jakarta Sans\", system-ui, sans-serif"

function SectionLabel({ children, accent = T.orange }: { children: string; accent?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, scale: 0.88, x: -10 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EO }}
            style={{ marginBottom: 24, display: "inline-flex" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontFamily: F, fontWeight: 600, letterSpacing: "0.11em", textTransform: "uppercase", color: accent, border: "1.5px solid " + T.border, borderRadius: 100, padding: "5px 14px" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                <ScrambleText text={children} />
            </span>
        </motion.div>
    )
}

function PlaneGlyph({ size = 15, color = T.orange, rotate = 0 }: { size?: number; color?: string; rotate?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotate}deg)`, display: "block" }}>
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.2L8.7 12l-2 3H4l-1 1 3 2 2 3 1-1v-2.7l3-2 3.3 5.2c.3.4.8.6 1.3.4l.7-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
    )
}

function TypingDots({ color = T.muted, active = true }: { color?: string; active?: boolean }) {
    return (
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
                <motion.span key={i} animate={active ? { opacity: [0.25, 1, 0.25], y: [0, -3, 0] } : { opacity: 0.25, y: 0 }} transition={{ duration: 1, repeat: active ? Infinity : 0, delay: i * 0.18 }} style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block" }} />
            ))}
        </span>
    )
}

function CheckDot({ size = 16 }: { size?: number }) {
    return (
        <span style={{ width: size, height: size, borderRadius: "50%", background: "#3BA55D", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
    )
}

// ─── STAT STRIP ──────────────────────────────────────────────────────────────
// Infinite marquee on maroon, skewed by scroll velocity so the page feels
// physically connected. All eight V0 data points.
export function StatStrip() {
    const stripRef = useRef<HTMLDivElement>(null)
    // The marquee row is ~4000px wide. Its scroll-velocity skew and its looping
    // translate were being recomputed for the whole 8800px page, long after the
    // strip had left the screen. Gating on view keeps the effect identical where
    // you can see it and stops the compositor touching it where you cannot.
    const stripInView = useInView(stripRef, { margin: "200px 0px" })
    const STATS = [
        { val: "2M+", label: "Properties" }, { val: "500+", label: "Airlines" },
        { val: "6", label: "Specialized agents" }, { val: "125M+", label: "Travelers reached" },
        { val: "20–30%", label: "Wholesale savings" }, { val: "24/7", label: "Human support" },
        { val: "100%", label: "Agent-managed" }, { val: "1", label: "Platform" },
    ]
    const items = [...STATS, ...STATS]
    const { scrollY } = useScroll()
    const velo = useVelocity(scrollY)
    const skewRaw = useTransform(velo, [-1500, 1500], [-5, 5])
    const skewX = useSpring(skewRaw, { stiffness: 250, damping: 30 })
    return (
        <div ref={stripRef} style={{ background: T.maroon, overflow: "hidden", padding: "18px 0", display: "flex", alignItems: "center" }}>
            <motion.div
                animate={stripInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
                transition={{ duration: 28, repeat: stripInView ? Infinity : 0, ease: "linear" }}
                style={{ display: "flex", gap: 0, width: "max-content", skewX: stripInView ? skewX : 0, willChange: "transform" }}>
                {items.map((s, i) => (
                    // flexShrink:0 is load-bearing. index.css gives every div inside a
                    // registered site wrapper `min-width: 0`, which lets these
                    // nowrap items shrink below their text width and overlap.
                    <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0, padding: "0 36px", borderRight: "1px solid rgba(251,246,242,0.12)", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 20, fontFamily: F, fontWeight: 800, color: T.cream, letterSpacing: "-0.02em", marginRight: 10 }}>{s.val}</span>
                        <span style={{ fontSize: 12, fontFamily: F, fontWeight: 500, color: "rgba(251,246,242,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

// ─── KINETIC TYPE BAND ───────────────────────────────────────────────────────
// Giant type strips sliding opposite ways with scroll; second row is outline only.
export function KineticBand({ line1, line2, bg = T.bg, ink = T.ink }: { line1: string; line2: string; bg?: string; ink?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "4%"])
    const x2 = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"])
    const rowStyle: CSSProperties = { whiteSpace: "nowrap", fontFamily: F, fontWeight: 900, fontSize: "clamp(3rem,8vw,7rem)", letterSpacing: "-0.03em", lineHeight: 1.06, userSelect: "none" }
    return (
        <div ref={ref} style={{ overflow: "hidden", padding: "clamp(40px,6vw,64px) 0 clamp(32px,5vw,56px)", background: bg }}>
            <motion.div style={{ ...rowStyle, x: x1, color: ink, willChange: "transform" }}>{(line1 + " · ").repeat(4)}</motion.div>
            <motion.div style={{ ...rowStyle, x: x2, color: "transparent", WebkitTextStroke: `1.5px ${ink}`, opacity: 0.6, willChange: "transform" }}>{(line2 + " · ").repeat(4)}</motion.div>
        </div>
    )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
const STEPS = [
    { num: "01", title: "Plan", body: "Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds.", accent: T.orange, bg: T.bg, tag: "Plain language" },
    { num: "02", title: "Book", body: "Flights, hotels and cars from Mondee wholesale inventory: real savings, one tap.", accent: T.accent, bg: T.bg2, tag: "Wholesale inventory" },
    { num: "03", title: "Expense", body: "Receipts, reports and reconciliation handled automatically. No forms, no chasing.", accent: T.orange, bg: T.surface2, tag: "Zero forms" },
    { num: "04", title: "Change", body: "Plans shift, the agent rebooks itself: within policy, before you even ask.", accent: T.accent, bg: T.bg, tag: "Self-rebooking" },
]

// Per-step product vignette, rendered at >=1200px only.
function StepVisual({ index, accent, inView }: { index: number; accent: string; inView: boolean }) {
    const card: CSSProperties = { background: T.card, border: "1px solid " + T.border, borderRadius: 20, boxShadow: "0 24px 64px rgba(69,14,20,0.09)", padding: 20, width: 300, fontFamily: F }
    const rise = { initial: { opacity: 0, y: 32 }, animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }, transition: { duration: 0.7, delay: 0.35, ease: EO } }

    if (index === 0) return (
        <motion.div {...rise} style={{ ...card, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: "92%", background: T.maroon, color: T.cream, borderRadius: "14px 14px 4px 14px", padding: "9px 13px", fontSize: 12.5, lineHeight: 1.5 }}>Fly me to Singapore Mar 15, hotel near the client office</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3, alignSelf: "flex-end" }}>
                {[8, 14, 20, 12, 16, 9, 13].map((h, i) => (
                    <motion.div key={i} animate={inView ? { height: [h * 0.4, h, h * 0.4] } : {}} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1 }} style={{ width: 2.5, height: h, borderRadius: 2, background: accent, opacity: 0.75 }} />
                ))}
                <span style={{ fontSize: 10, color: T.muted, marginLeft: 6 }}>or say it out loud</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TypingDots color={accent} active={inView} />
                <span style={{ fontSize: 11, color: T.muted }}>Miraee is on it</span>
            </div>
        </motion.div>
    )

    if (index === 1) return (
        <motion.div {...rise} style={{ ...card, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SFO</span>
                <div style={{ flex: 1, position: "relative", margin: "0 10px", height: 16, display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100%", height: 1.5, overflow: "hidden", opacity: 0.6 }}>
                        <motion.div animate={inView ? { x: [0, -24] } : { x: 0 }} transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "linear" }} style={{ width: "calc(100% + 24px)", height: "100%", backgroundImage: `repeating-linear-gradient(90deg, ${accent} 0 5px, transparent 5px 12px)` }} />
                    </div>
                    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}><PlaneGlyph size={13} color={accent} rotate={45} /></div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>SIN</span>
            </div>
            {[{ t: "SQ 31 · Nonstop · 17h 25m", p: "$1,240", best: true }, { t: "NH 107 · 1 stop · 21h 10m", p: "$1,388", best: false }, { t: "UA 28 · 1 stop · 22h 45m", p: "$1,512", best: false }].map((o, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease: EO }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 12, border: o.best ? "1.5px solid " + accent : "1px solid " + T.border, background: o.best ? "rgba(229,86,2,0.05)" : "transparent" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 600, color: o.best ? T.ink : T.muted }}>{o.t}</span>
                        {o.best && <span style={{ fontSize: 9.5, fontWeight: 700, color: accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>Best · in policy</span>}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: o.best ? T.ink : T.muted }}>{o.p}</span>
                </motion.div>
            ))}
        </motion.div>
    )

    if (index === 2) return (
        <motion.div {...rise} style={{ ...card, position: "relative" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 10 }}>Trip request · Singapore</div>
            {["SQ 31 · SFO to SIN · $1,240", "2 nights · client-side hotel", "Total $1,596 · under budget"].map((t, i) => (
                <div key={i} style={{ fontSize: 11.5, color: T.muted, padding: "7px 0", borderTop: "1px solid " + T.border }}>{t}</div>
            ))}
            <motion.div initial={{ opacity: 0, scale: 2.4, rotate: -4 }} animate={inView ? { opacity: 1, scale: 1, rotate: -12 } : { opacity: 0, scale: 2.4, rotate: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.9 }}
                style={{ position: "absolute", right: 14, bottom: 14, border: "2.5px solid " + accent, color: accent, borderRadius: 8, padding: "5px 12px", fontSize: 13, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", background: "rgba(255,255,255,0.85)" }}>
                Expensed
            </motion.div>
        </motion.div>
    )

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
            {[{ t: "Calendar synced", s: "Flight + hotel on your schedule" }, { t: "Receipt captured", s: "$18.40 airport cab · auto-coded" }, { t: "Rebooked automatically", s: "6:00 AM cancelled → on the 9:15 AM" }].map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }} transition={{ duration: 0.55, delay: 0.4 + i * 0.2, ease: EO }}
                    style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 16, boxShadow: "0 16px 40px rgba(69,14,20,0.07)", padding: "13px 16px", display: "flex", alignItems: "center", gap: 11, fontFamily: F }}>
                    <CheckDot size={17} />
                    <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{n.t}</div>
                        <div style={{ fontSize: 10.5, color: T.muted }}>{n.s}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

function StepPanel({ num, title, body, accent, bg, tag, index, total }: typeof STEPS[0] & { index: number; total: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: false, margin: "-20% 0px" })
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <div ref={ref} className="v4-step-panel" style={{ position: "sticky", top: 0, height: "100vh", background: bg, display: "flex", alignItems: "center", overflow: "hidden", zIndex: index + 1 }}>
            {/* Massive ghost number */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={inView ? { opacity: 0.045, x: 0 } : { opacity: 0, x: 60 }}
                transition={{ duration: 0.9, ease: EO }}
                style={{ position: "absolute", right: isMobile ? -20 : -10, top: "50%", transform: "translateY(-50%)", fontSize: isMobile ? "42vw" : "28vw", fontFamily: F, fontWeight: 900, color: T.ink, lineHeight: 1, userSelect: "none", pointerEvents: "none", letterSpacing: "-0.06em", willChange: "transform, opacity" }}>
                {num}
            </motion.div>
            {/* Orange side accent bar */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EO }}
                style={{ position: "absolute", left: 0, top: "15%", height: "70%", width: 3, background: accent, transformOrigin: "top", borderRadius: 2 }} />
            {/* Step counter top-right */}
            <div style={{ position: "absolute", top: 92, right: isMobile ? 20 : 64, display: "flex", alignItems: "center", gap: 12 }}>
                {Array.from({ length: total }).map((_, i) => (
                    <motion.div key={i}
                        animate={{ width: i === index ? 24 : 6, background: i === index ? accent : T.border }}
                        transition={{ duration: 0.4 }}
                        style={{ height: 6, borderRadius: 3 }} />
                ))}
            </div>
            {w >= 1200 && (
                <div style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)", zIndex: 2 }}>
                    <StepVisual index={index} accent={accent} inView={inView} />
                </div>
            )}
            <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 24px" : isTablet ? "0 40px" : "0 80px", maxWidth: isMobile ? "100%" : isTablet ? "100%" : 720 }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.05, ease: EO }}
                    style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>
                    <span style={{ width: 20, height: 1.5, background: accent, display: "inline-block" }} />
                    {tag}
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: EO }}
                    style={{ fontSize: 13, fontFamily: F, fontWeight: 700, color: accent, letterSpacing: "0.08em", margin: "0 0 12px" }}>
                    {num} / {String(total).padStart(2, "0")}
                </motion.p>
                <h3 style={{ fontFamily: F, fontSize: isMobile ? "clamp(3rem,12vw,5rem)" : isTablet ? "clamp(3.5rem,8vw,5.5rem)" : "clamp(4rem,7vw,7rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", color: T.ink, margin: "0 0 32px" }}>
                    <StaggerWords text={title} delay={0.15} stagger={0.08} />
                </h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: EO }}
                    style={{ fontSize: isMobile ? 15 : 18, fontFamily: F, fontWeight: 400, lineHeight: 1.7, color: T.muted, margin: 0, maxWidth: 520 }}>
                    {body}
                </motion.p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: 64 } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: EO }}
                    style={{ height: 2, background: accent, borderRadius: 2, marginTop: 40 }} />
            </div>
        </div>
    )
}

export function HowItWorks() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <section id="how-it-works" style={{ position: "relative" }}>
            <div style={{ background: T.bg2, padding: isMobile ? "80px 20px 40px" : isTablet ? "80px 40px 40px" : "80px 64px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                    <SectionLabel>How it works</SectionLabel>
                    <h2 style={{ fontFamily: F, fontSize: isMobile ? "1.1rem" : "1.2rem", fontWeight: 500, color: T.muted, margin: 0, letterSpacing: "-0.01em" }}>
                        One agent, the whole journey: plan, book, expense, change.
                    </h2>
                </div>
                <span style={{ fontSize: 13, fontFamily: F, color: T.muted }}>Voice, chat or avatar · It remembers your preferences.</span>
            </div>
            {STEPS.map((step, i) => (
                <StepPanel key={step.num} {...step} index={i} total={STEPS.length} />
            ))}
        </section>
    )
}

// ─── EXPERIENCES (scroll-linked horizontal pan) ──────────────────────────────
const ROLES = [
    { tag: "Experiences", headline: "Not bookable anywhere else.", body: "The city after 5pm, the festival, the family weekend bolted onto a work trip. Booked and expensed separately, one tap.", stat: "90%", statLabel: "of experiences", accent: T.accent, bg: T.bg, img: "" },
    { tag: "01", headline: "Festivals and culture", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: experienceMarket },
    { tag: "02", headline: "Once-in-a-trip moments", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: experienceSkyline },
    { tag: "03", headline: "The upgrade that feels earned", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: experienceCabin },
    { tag: "04", headline: "Business, elevated", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: experienceJet },
    { tag: "05", headline: "Down time between flights", body: "", stat: "", statLabel: "", accent: T.orange, bg: T.surface2, img: experienceLounge },
    { tag: "06", headline: "Every trip, welcomed", body: "", stat: "", statLabel: "", accent: T.accent, bg: T.bg, img: experienceArrival },
]

function RoleCard({ tag, headline, body, stat, statLabel, accent, bg, img, index }: typeof ROLES[0] & { index: number }) {
    const [hov, setHov] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)
    const imgInView = useInView(imgRef, { once: true, margin: "-8% 0px" })
    const reduced = useReducedMotion()
    return (
        <TiltCard max={9} style={{ width: "min(380px, 84vw)", flexShrink: 0, display: "flex", borderRadius: 24 }}>
            <motion.div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={imgInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.06, ease: EO }}
                style={{ flex: 1, background: hov ? T.card : bg, border: "1px solid " + T.border, borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", gap: 20, boxShadow: hov ? "0 24px 70px rgba(69,14,20,0.16)" : "0 1px 0 rgba(69,14,20,0.03)", transition: "box-shadow 0.35s ease, background 0.3s ease" }}>
                <motion.span
                    animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                    style={{ display: "inline-block", fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, border: "1.5px solid " + T.border, borderRadius: 100, padding: "4px 12px", alignSelf: "flex-start" }}>{tag}</motion.span>
                <p style={{ fontSize: 22, fontFamily: F, fontWeight: 800, lineHeight: 1.2, margin: "0 0 12px", color: T.ink }}>{headline}</p>
                {img ? (
                    <div ref={imgRef} style={{ borderRadius: 14, overflow: "hidden", height: 200, position: "relative" }}>
                        {/* Idle Ken Burns drift while the card sits unhovered, so the tile
                            never looks like a static photo — it settles the instant a
                            pointer arrives and TiltCard's own hover scale takes over. */}
                        <motion.img src={img} alt={headline}
                            initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 }}
                            animate={imgInView ? {
                                clipPath: "inset(0% 0% 0% 0%)",
                                scale: hov ? 1.1 : (reduced ? 1 : [1, 1.06, 1]),
                            } : {}}
                            transition={{
                                clipPath: { duration: 0.9, ease: EO },
                                scale: hov || reduced
                                    ? { duration: 0.6, ease: EO }
                                    : { duration: 9 + index * 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                            }}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", willChange: "clip-path, transform" }} />
                        {/* Brand wash: a duotone tint at rest that clears on hover so the
                            photo reveals itself in full colour, like light hitting it. */}
                        <div aria-hidden="true" style={{
                            position: "absolute", inset: 0, pointerEvents: "none",
                            background: `linear-gradient(155deg, rgba(69,14,20,${hov ? 0.05 : 0.3}) 0%, rgba(229,86,2,${hov ? 0.02 : 0.16}) 60%, transparent 100%)`,
                            mixBlendMode: "multiply",
                            transition: "background 0.5s ease",
                        }} />
                    </div>
                ) : null}
                {body ? <p style={{ fontSize: 14, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: 0 }}>{body}</p> : null}
                {stat ? (
                    <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border }}>
                        <div style={{ fontSize: 36, fontFamily: F, fontWeight: 800, color: accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat}</div>
                        <div style={{ fontSize: 12, fontFamily: F, fontWeight: 500, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{statLabel}</div>
                    </div>
                ) : (
                    <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid " + T.border, display: "flex", alignItems: "center", gap: 8 }}>
                        <PlaneGlyph size={14} rotate={45} color={accent} />
                        <span style={{ fontSize: 12, fontFamily: F, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>One tap away</span>
                    </div>
                )}
            </motion.div>
        </TiltCard>
    )
}

export function Experiences() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const cardWidth = 380
    const gap = 20
    // Pan ONLY by the amount the track overflows the viewport. Wide screens fit
    // every card: panPx = 0, and no pinned scroll happens at all.
    const pad = Math.min(64, Math.max(32, w * 0.05))
    const contentW = ROLES.length * cardWidth + (ROLES.length - 1) * gap + 64
    const panPx = Math.max(0, Math.round(pad + contentW - w))

    useEffect(() => {
        if (isMobile || isTablet || panPx === 0) return
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return
        // Coalesce to one read+write per frame. Reading the rect and writing the
        // transform on every scroll event forces a synchronous layout per tick,
        // which is what made the pan janky.
        let frame = 0
        const apply = () => {
            frame = 0
            const scrolledIn = -section.getBoundingClientRect().top
            const progress = Math.max(0, Math.min(1, scrolledIn / panPx))
            track.style.transform = `translateX(${-progress * panPx}px)`
        }
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply) }
        window.addEventListener("scroll", onScroll, { passive: true })
        apply()
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [isMobile, isTablet, panPx])

    if (isMobile || isTablet) {
        return (
            <SectionWrapper>
                <section id="experiences" style={{ background: T.bg, padding: isMobile ? "80px 20px" : "80px 40px" }}>
                    <div style={{ marginBottom: 40 }}>
                        <SectionLabel>Experiences</SectionLabel>
                        <h2 style={{ fontFamily: F, fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                            <StaggerWords text="Business travel," /><br /><StaggerWords text="meet the trips people love." delay={0.15} />
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, WebkitOverflowScrolling: "touch" }}>
                        {ROLES.map((role, index) => (
                            <div key={role.tag} style={{ minWidth: isMobile ? "min(300px,80vw)" : 340, flexShrink: 0 }}>
                                <RoleCard {...role} index={index} />
                            </div>
                        ))}
                    </div>
                </section>
            </SectionWrapper>
        )
    }

    return (
        <section id="experiences" ref={sectionRef} style={{ position: "relative", height: panPx === 0 ? "100vh" : `calc(${panPx}px + 100vh)`, background: T.bg }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ paddingLeft: "clamp(32px,5vw,64px)", paddingRight: "clamp(32px,5vw,64px)", marginBottom: 48 }}>
                    <SectionLabel>Experiences</SectionLabel>
                    <h2 style={{ fontFamily: F, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: 0 }}>
                        <StaggerWords text="Business travel, meet the" /><br />
                        <StaggerWords text="trips people love." delay={0.15} />
                    </h2>
                </div>
                <div style={{ overflow: "hidden", paddingLeft: "clamp(32px,5vw,64px)" }}>
                    <div ref={trackRef} style={{ display: "flex", gap: 20, willChange: "transform" }}>
                        {ROLES.map((role, index) => <RoleCard key={role.tag} {...role} index={index} />)}
                        <div style={{ minWidth: 64, flexShrink: 0 }} />
                    </div>
                </div>
                {panPx > 0 && (
                    <FadeUp style={{ paddingLeft: "clamp(32px,5vw,64px)", marginTop: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 1, background: T.orange }} />
                            <span style={{ fontSize: 11, fontFamily: F, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>scroll to explore</span>
                        </div>
                    </FadeUp>
                )}
            </div>
        </section>
    )
}

// ─── BUSINESS CASE ───────────────────────────────────────────────────────────
const CASE_STATS = [
    { stat: "20–30%", label: "Travel savings, validated apples-to-apples vs. incumbents", accent: T.orange },
    { stat: "100%", label: "Of the journey managed by the agent, end to end", accent: T.accent },
    { stat: "1", label: "Platform for business and personal travel alike", accent: T.orange },
]

export function BusinessCase({ children }: { children?: ReactNode }) {
    const w = useWindowWidth()
    const isMobile = w < 640
    const isTablet = w >= 640 && w < 1024
    return (
        <SectionWrapper>
            <section id="proof" style={{ background: T.bg2, padding: isMobile ? "80px 20px" : isTablet ? "80px 40px" : "120px 64px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                    <SectionLabel accent={T.accent}>The business case</SectionLabel>
                    <h2 style={{ fontFamily: F, fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink, margin: "0 0 56px" }}>
                        <StaggerWords text="Loved by employees." /><br />
                        <span style={{ color: T.orange }}><StaggerWords text="Trusted by finance." delay={0.15} /></span>
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 32 : 48 }}>
                        {CASE_STATS.map((item, i) => (
                            <FadeUp key={item.stat} delay={i * 0.1}>
                                <div style={{ borderTop: "2px solid " + T.border, paddingTop: 24 }}>
                                    <div style={{ fontSize: isMobile ? 44 : 56, fontFamily: F, fontWeight: 800, color: item.accent, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 14 }}>{item.stat}</div>
                                    <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.6, color: T.muted, margin: 0 }}>{item.label}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                    {children}
                </div>
            </section>
        </SectionWrapper>
    )
}

// ─── CTA ROUTES — dotted world map with flowing flight arcs ──────────────────
// Verbatim port of V0's CtaRoutes (Home.tsx:218). Dotted continents from a
// bitmap, seven great-circle arcs with flowing dashes, planes travelling each
// arc via SMIL animateMotion, and pulsing hub pings at eight cities.
const WORLD_ROWS = [
    "0000000011000111100000000000001111100000",
    "0000000111100111100000111111111111110000",
    "0111101111111110001011111111111111111100",
    "0111011111111110001111111111111111111100",
    "0000111111111100011111111111111111111000",
    "0000111111111000111111111111111111110000",
    "0000011111110001111111111111111111100000",
    "0000011110000011111111110111101111000000",
    "0000001110000011111111100110011110000000",
    "0000000110000011111101100000011111000000",
    "0000000001111000011111000000001111110000",
    "0000000001111100011111100000000111000000",
    "0000000001111100011111000000000111100000",
    "0000000001111000011110000000001111110000",
    "0000000001110000011100000000001111100000",
    "0000000001100000000000000000000000001000",
    "0000000001100000000000000000000000011000",
    "0000000001000000000000000000000000000000",
]
// Hub px coords in the 1440x760 viewBox: SFO NYC LON DXB SIN SYD TYO GRU
const HUBS: Array<[number, number]> = [[248, 209], [442, 205], [738, 173], [954, 285], [1152, 399], [1343, 551], [1292, 228], [554, 513]]
const FLIGHT_ARCS = [
    "M248,209 Q345,130 442,205",
    "M442,205 Q590,90 738,173",
    "M738,173 Q850,170 954,285",
    "M954,285 Q1055,320 1152,399",
    "M1152,399 Q1255,440 1343,551",
    "M248,209 Q760,40 1292,228",
    "M554,513 Q640,300 738,173",
]

export function CtaRoutes() {
    const reduce = useReducedMotion()
    const dots: Array<[number, number]> = []
    WORLD_ROWS.forEach((row, r) => {
        for (let c = 0; c < row.length; c++) {
            if (row[c] === "1") dots.push([c * 36 + 18, r * 38 + 40])
        }
    })
    return (
        <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {/* Dotted continents */}
            <g>
                {dots.map(([dx, dy], i) => (
                    <circle key={i} cx={dx} cy={dy} r={3.2} fill={T.cream} opacity={0.09} />
                ))}
            </g>
            {/* Flight arcs: dashed, flowing */}
            {FLIGHT_ARCS.map((d, i) => (
                <motion.path key={i} d={d} fill="none" stroke={T.orange} strokeOpacity={0.32} strokeWidth={1.3} strokeDasharray="4 8"
                    animate={reduce ? undefined : { strokeDashoffset: [0, -96] }}
                    transition={{ duration: 7 + (i % 3) * 2, repeat: Infinity, ease: "linear" }} />
            ))}
            {/* Travelling flights along each arc. SMIL, so reduced motion has to
                be honoured by simply not rendering them. */}
            {!reduce && FLIGHT_ARCS.map((d, i) => (
                <circle key={"p" + i} r={3} fill={T.orange} opacity={0.9}>
                    <animateMotion dur={`${6 + (i % 4) * 1.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} path={d} />
                </circle>
            ))}
            {/* Hub pings */}
            {HUBS.map(([px, py], i) => (
                <g key={"h" + i} transform={`translate(${px},${py})`}>
                    <circle r={3.4} fill={T.orange} opacity={0.85} />
                    <motion.circle r={4} fill="none" stroke={T.orange} strokeOpacity={0.5}
                        animate={reduce ? undefined : { r: [4, 16], opacity: [0.6, 0] }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }} />
                </g>
            ))}
        </svg>
    )
}
