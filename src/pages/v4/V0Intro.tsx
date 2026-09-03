import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { EO } from "../../animations"
import { MiraeeLogo } from "../../components/LegalFormKit"
import { useWindowWidth } from "../../hooks/useWindowSize"

// Verbatim port of V0's IntroCover (Miraee_landing_page/src/pages/Home.tsx:261).
//
// Fixed gradient cover with the white wordmark. Page scroll is locked; the first
// wheel / touch / key fires ONE tweened clip-path reveal (1.4s, expo ease) —
// deterministic, no scroll-scrub jitter. Unmounts when done so it costs nothing
// afterwards.
//
// Two things added on top of V0: it skips entirely under prefers-reduced-motion
// (a full-screen wipe is exactly what that setting is for), and it only ever
// runs once per browser session so internal navigation back to /v4 doesn't
// replay it.

const SESSION_KEY = "miraee-v4-intro-done"
const MAROON = "#450E14"
const ORANGE = "#E55602"
const F = "\"Plus Jakarta Sans\", system-ui, sans-serif"

export function IntroCover() {
    const w = useWindowWidth()
    const isMobile = w < 640
    const reduce = useReducedMotion()

    // Skip if the page loaded already scrolled (refresh mid-page), if the cover
    // has already played this session, or under reduced motion.
    const [enabled] = useState(() => {
        if (typeof window === "undefined") return false
        if (window.scrollY >= 60) return false
        try { if (sessionStorage.getItem(SESSION_KEY)) return false } catch { /* private mode */ }
        return true
    })
    const [phase, setPhase] = useState<"hold" | "reveal" | "done">("hold")

    const active = enabled && !reduce

    useEffect(() => {
        if (!active || phase !== "hold") return
        document.body.style.overflow = "hidden"
        const trigger = () => setPhase("reveal")
        window.addEventListener("wheel", trigger, { passive: true, once: true })
        window.addEventListener("touchmove", trigger, { passive: true, once: true })
        window.addEventListener("keydown", trigger, { once: true })
        const auto = window.setTimeout(trigger, 4500)
        return () => {
            window.removeEventListener("wheel", trigger)
            window.removeEventListener("touchmove", trigger)
            window.removeEventListener("keydown", trigger)
            window.clearTimeout(auto)
        }
    }, [active, phase])

    useEffect(() => {
        if (phase !== "reveal") return
        try { sessionStorage.setItem(SESSION_KEY, "1") } catch { /* private mode */ }
        const t = window.setTimeout(() => {
            document.body.style.overflow = ""
            setPhase("done")
        }, 1500)
        return () => window.clearTimeout(t)
    }, [phase])

    // Safety: always restore scroll if this unmounts mid-reveal.
    useEffect(() => () => { document.body.style.overflow = "" }, [])

    if (!active || phase === "done") return null

    return (
        <motion.div
            initial={{ clipPath: "circle(135% at 50% 45%)" }}
            animate={phase === "reveal" ? { clipPath: "circle(0% at 50% 45%)" } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 900, willChange: "clip-path", background: `linear-gradient(135deg, #2E080D 0%, ${MAROON} 38%, #8A2B0A 70%, ${ORANGE} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

            {/* Slow drifting light */}
            <motion.div animate={{ x: ["-8%", "8%", "-8%"], y: ["-5%", "7%", "-5%"] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", inset: "-25%", background: "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.10) 0%, transparent 52%)", pointerEvents: "none", willChange: "transform" }} />
            <motion.div animate={{ x: ["6%", "-6%", "6%"], y: ["8%", "-4%", "8%"] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", inset: "-25%", background: "radial-gradient(circle at 70% 75%, rgba(229,86,2,0.25) 0%, transparent 50%)", pointerEvents: "none", willChange: "transform" }} />

            {/* Wordmark: entrance, then exit-through on reveal */}
            <motion.div
                animate={phase === "reveal" ? { scale: 1.55, opacity: 0, y: -60 } : { scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, willChange: "transform, opacity", width: "100%", maxWidth: 640, padding: "0 24px", boxSizing: "border-box" }}>
                <motion.div initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: EO }}
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <MiraeeLogo fill="#FFFFFF" height={isMobile ? 64 : 130} />
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EO }}
                    style={{ fontSize: isMobile ? 13 : 15, fontFamily: F, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(251,246,242,0.6)", margin: 0, textAlign: "center" }}>
                    A private travel assistant for every employee.
                </motion.p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === "reveal" ? 0 : 1 }} transition={{ delay: phase === "reveal" ? 0 : 1.4, duration: 0.5 }}
                style={{ position: "absolute", bottom: 42, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, fontFamily: F, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(251,246,242,0.55)" }}>scroll to enter</span>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 1.5, height: 36, background: "linear-gradient(to bottom, rgba(251,246,242,0.8), transparent)" }} />
            </motion.div>
        </motion.div>
    )
}
