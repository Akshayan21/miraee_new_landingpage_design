import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import ThemeToggle from "../components/ThemeToggle"
import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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

// ─── Custom cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
    const cx = useMotionValue(-100)
    const cy = useMotionValue(-100)
    const rx = useSpring(cx, { stiffness: 120, damping: 16 })
    const ry = useSpring(cy, { stiffness: 120, damping: 16 })
    const [hover, setHover] = useState(false)
    const [dark, setDark] = useState(false)
    useEffect(() => {
        if (typeof window === "undefined") return
        const move = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY) }
        const over = (e: MouseEvent) => {
            const t = e.target as HTMLElement
            setHover(!!(t.closest("button") || t.closest("a") || t.closest("[data-cursor='hover']")))
            setDark(!!(t.closest("[data-dark='true']")))
        }
        window.addEventListener("mousemove", move)
        window.addEventListener("mouseover", over)
        return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over) }
    }, [cx, cy])
    return (
        <>
            <motion.div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, x: cx, y: cy, translateX: "-50%", translateY: "-50%", width: hover ? 10 : 6, height: hover ? 10 : 6, borderRadius: "50%", background: dark ? T.orange : T.maroon, transition: "width 0.2s, height 0.2s, background 0.3s" }} />
            <motion.div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9998, x: rx, y: ry, translateX: "-50%", translateY: "-50%", width: hover ? 52 : 32, height: hover ? 52 : 32, borderRadius: "50%", border: `1.5px solid ${dark ? "rgba(229,86,2,0.5)" : "rgba(69,14,20,0.3)"}`, background: hover ? (dark ? "rgba(229,86,2,0.08)" : "rgba(69,14,20,0.06)") : "transparent", transition: "width 0.3s, height 0.3s, border-color 0.3s" }} />
        </>
    )
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

// ─── Miraee SVG Logo ─────────────────────────────────────────────────────────
function MiraeeLogo({ fill = T.orange, height = 28 }: { fill?: string; height?: number }) {
    const w = height * (338 / 84)
    return (
        <svg width={w} height={height} viewBox="0 0 338 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M113.255 83.0098C112.156 83.0098 111.078 82.8081 110.021 82.4154C102.147 79.4749 101.207 66.7045 102.95 55.7387C103.807 50.3886 105.846 37.5439 105.413 31.7797C104.25 32.82 102.496 34.6352 100.033 37.788C93.6499 45.9513 86.2095 53.8917 79.3504 50.8344C74.0977 48.4884 72.5229 40.9514 74.679 28.4464L74.7001 28.3084C76.9407 15.2833 76.3805 11.0159 75.683 9.63587C74.2456 9.9331 68.1792 12.3216 52.4106 31.1746C50.6033 33.3402 48.9651 35.4102 47.4749 37.374C52.1041 40.8134 53.2244 47.1933 50.8147 56.3332C47.3481 69.4751 40.8272 78.1692 33.8095 79.0078C30.1844 79.443 26.9398 77.7127 25.1537 74.3795C22.4375 69.3265 22.9765 59.9955 30.0259 46.8005C23.0188 49.4862 13.9825 54.295 5.36894 60.2185L0 52.3312C6.29899 48.0001 24.1391 36.4823 37.2761 35.2085C39.5589 31.9814 42.1694 28.5951 45.1498 25.0389C62.3769 4.40245 72.4172 -2.60374 79.7837 0.835664C88.3972 4.85892 85.6916 20.5485 84.0746 29.922L84.0535 30.06C83.0811 35.7074 83.1763 39.444 83.5039 41.323C84.9518 40.3676 87.7948 37.9579 92.5402 31.8858C97.962 24.954 103.785 18.8819 109.704 21.4827C116.965 24.6673 115.548 37.1193 112.336 57.2461C110.962 65.8871 112.166 72.0016 113.318 73.371C114.291 73.1056 118.878 71.0674 128.231 55.8661L135.872 43.4567L143.968 48.4778L136.327 60.8872C127.047 75.9718 119.765 83.0098 113.255 83.0098ZM42.0003 45.2188C38.2061 51.1741 36.0712 55.8343 34.8875 59.1675C32.89 64.7619 33.0169 67.9571 33.3233 69.2522C35.1306 68.2119 38.9988 63.8702 41.6304 53.8704C43.0466 48.5096 42.6027 46.015 42.0003 45.2188Z" fill={fill}/>
            <path d="M134.191 18.6482C134.191 15.1132 136.855 12.5337 140.659 12.5337C144.464 12.5337 147.128 15.1132 147.128 18.6482C147.128 22.1831 144.559 24.7627 140.659 24.7627C136.76 24.7627 134.191 22.1831 134.191 18.6482ZM135.713 30.9727H145.511V82.5638H135.713V30.9727Z" fill={fill}/>
            <path d="M152.75 30.9725H162.547C162.547 34.3164 162.547 36.3227 162.452 39.571H162.547C165.496 33.8387 170.537 30.877 176.625 30.877C177.481 30.877 178.432 30.877 179.383 30.9725V39.9532H175.864C167.113 39.9532 162.547 46.6409 162.547 54.7617V82.5635H152.75V30.9725Z" fill={fill}/>
            <path d="M179.31 56.9592C179.31 41.4819 189.392 29.8262 202.899 29.8262C210.794 29.8262 216.882 33.0745 220.306 39.3801H220.496C220.401 36.4184 220.401 34.5076 220.401 30.9726H230.198V82.5637H220.401C220.401 79.0288 220.401 77.6912 220.496 74.3473H220.306C216.691 80.2708 210.128 83.9012 202.899 83.9012C189.107 83.9012 179.31 72.5321 179.31 56.9592ZM220.781 56.8637C220.781 46.2589 214.408 38.8068 204.801 38.8068C195.194 38.8068 189.107 46.7366 189.107 56.9592C189.107 67.1819 195.385 74.9206 204.801 74.9206C214.218 74.9206 220.781 67.6596 220.781 56.8637Z" fill={fill}/>
            <path d="M235.388 56.864C235.388 41.1001 245.756 29.4443 261.07 29.4443C276.384 29.4443 285.23 39.667 285.23 55.3354C285.23 56.7685 285.135 58.0105 284.945 59.4436H244.9C245.946 68.6153 252.129 75.2075 261.355 75.2075C267.823 75.2075 272.865 72.0547 275.813 66.1313L283.993 70.2395C279.428 79.5068 271.152 83.9971 260.975 83.9971C245.661 83.9971 235.388 72.5324 235.388 56.864ZM276.099 51.6094C274.957 43.4886 269.821 38.2339 261.07 38.2339C252.794 38.2339 247.087 43.7752 245.28 51.6094H276.099Z" fill={fill}/>
            <path d="M288.157 56.864C288.157 41.1001 298.525 29.4443 313.839 29.4443C329.153 29.4443 338 39.667 338 55.3354C338 56.7685 337.904 58.0105 337.714 59.4436H297.669C298.715 68.6153 304.898 75.2075 314.125 75.2075C320.593 75.2075 325.634 72.0547 328.583 66.1313L336.763 70.2395C332.197 79.5068 323.922 83.9971 313.744 83.9971C298.43 83.9971 288.157 72.5324 288.157 56.864ZM328.858 51.6094C327.716 43.4886 322.58 38.2339 313.829 38.2339C305.553 38.2339 299.846 43.7752 298.039 51.6094H328.858Z" fill={fill}/>
        </svg>
    )
}

// ─── SHARED NAV LINKS ────────────────────────────────────────────────────────
function NavLinks() {
    const [hovered, setHovered] = useState<string | null>(null)
    const links = [
        { label: "Product", href: "/product" },
        { label: "Technology", href: "/technology" },
        { label: "Solutions", href: "/solutions" },
        { label: "Resources", href: "/resources" },
    ]
    return (
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
                        <ThemeToggle size={34} />
            {links.map(({ label, href }) => (
                <a key={label} href={href} onMouseEnter={() => setHovered(label)} onMouseLeave={() => setHovered(null)} style={{ position: "relative", cursor: "pointer", paddingBottom: 4, textDecoration: "none" }}>
                    <motion.span animate={{ color: hovered === label ? T.maroon : "rgba(var(--text-rgb),0.55)" }} transition={{ duration: 0.2 }} style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 500, display: "block" }}>
                        {label}
                    </motion.span>
                    {hovered === label && (
                        <motion.div layoutId="nav-underline" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5, background: T.orange, borderRadius: 2 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                    )}
                </a>
            ))}
        </div>
    )
}
function ProductNav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const w = useWindowWidth()
    const isMobile = w < 768
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 32)
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])
    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
                height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: isMobile ? "0 20px" : "0 80px",
                background: scrolled ? "var(--glass-bg)" : "rgba(251,246,242,0)",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(var(--text-rgb),0.06)" : "1px solid transparent",
                transition: "all 0.4s ease", boxSizing: "border-box",
            }}>
                <a href="https://app.miraee.ai" style={{ textDecoration: "none" }}>
                    <MiraeeLogo fill={T.orange} height={26} />
                </a>
                {!isMobile && (
                    <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
                        <NavLinks />
                        <a href="https://app.miraee.ai" style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 500, color: T.muted, cursor: "pointer", textDecoration: "none" }}>Sign in</a>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(229,86,2,0.35)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{ background: T.accent, color: T.cream, border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 700, cursor: "pointer" }}
                        >Book a demo</motion.button>
                    </div>
                )}
                {isMobile && (
                    <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
                        <div style={{ width: 22, height: 2, background: T.ink, marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
                        <div style={{ width: 22, height: 2, background: T.ink, marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
                        <div style={{ width: 22, height: 2, background: T.ink, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
                    </button>
                )}
            </nav>
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
                        style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 199, background: "var(--glass-bg)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(var(--text-rgb),0.06)", padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
                        {[{ label: "Product", href: "/product" }, { label: "Technology", href: "/technology" }, { label: "Solutions", href: "/solutions" }, { label: "Resources", href: "/resources" }].map(({ label, href }) => (
                            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ fontSize: 18, fontFamily: "Plus Jakarta Sans", fontWeight: 500, color: T.ink, textDecoration: "none", opacity: 0.75 }}>{label}</a>
                        ))}
                        <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 44, background: T.accent, color: T.cream, border: "none", borderRadius: 8, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Book a demo</motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// ─── 2.1 HERO ────────────────────────────────────────────────────────────────
function ProductHero() {
    const ww = useWindowWidth()
    const isMobile = ww < 768
    const { x: mpx, y: mpy } = useMouseParallax()
    const floatX = useTransform(mpx, (v: number) => v * -0.4)
    const floatY = useTransform(mpy, (v: number) => v * -0.25)
    const { trigger, rippleEls } = useRipple()
    const words = ["The", "AI-Native", "Employee", "Travel", "Platform."]

    const chatMsgs = [
        { who: "user", text: "Book me SIN March 15–17, hotel near Marina Bay Sands." },
        { who: "ai",   text: "SQ401 8:20am $640 · Marriott Marina Bay $320/night — both within policy. Confirm?" },
        { who: "user", text: "Yes." },
        { who: "ai",   text: "Done ✓  Calendar updated · Receipts auto-captured · Safe travels!" },
    ]

    return (
        <section style={{ minHeight: "100vh", background: "#0F0407", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
            {/* Noise grain overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px", pointerEvents: "none", zIndex: 1 }} />

            {/* Radial glows */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                <div style={{ position: "absolute", top: "-10%", left: "20%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.18) 0%, transparent 65%)" }} />
                <div style={{ position: "absolute", bottom: "0%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(229,86,2,0.12) 0%, transparent 65%)" }} />
            </div>

            {/* Main content */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", maxWidth: 1320, width: "100%", margin: "0 auto", padding: isMobile ? "80px 20px" : "140px 64px 80px", position: "relative", zIndex: 2, gap: 64, boxSizing: "border-box" }}>

                {/* Left — headline + CTAs */}
                <div style={{ flex: "0 0 auto", maxWidth: 620 }}>
                    {/* Pill label */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(229,86,2,0.12)", border: "1px solid rgba(229,86,2,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 36 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.orange }}>Product Overview</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(48px, 5.5vw, 76px)", fontWeight: 700, color: T.cream, lineHeight: 1.0, letterSpacing: "-0.03em", margin: "0 0 32px", textAlign: "center", wordSpacing: "0.1em" }}>
                        {words.map((w, i) => (
                            <motion.span key={`w-${i}`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.07, duration: 0.65, ease: [0.16,1,0.3,1] }}
                                style={{ color: w === "AI-Native" || w === "Travel" ? T.orange : T.cream }}>
                                {w}{i < words.length - 1 ? " " : ""}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Sub */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.65, ease: [0.16,1,0.3,1] }}
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 19, lineHeight: 1.7, color: "rgba(251,246,242,0.6)", margin: "0 0 48px", maxWidth: 500 }}>
                        Miraee is the AI-native employee travel platform that automates bookings, enforces travel policy, captures expenses, and handles disruptions — all from a single conversation.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.6 }}
                        style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: "0 20px 56px rgba(229,86,2,0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{ position: "relative", overflow: "hidden", background: T.orange, color: T.white, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, fontWeight: 700, padding: "16px 36px", borderRadius: 12, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>Book a demo
                        </motion.button>
                        <motion.button onClick={trigger}
                            whileHover={{ scale: 1.04, borderColor: "rgba(251,246,242,0.3)" }}
                            whileTap={{ scale: 0.97 }}
                            style={{ background: "transparent", color: "rgba(251,246,242,0.52)", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, fontWeight: 500, padding: "16px 32px", borderRadius: 12, border: "1px solid rgba(251,246,242,0.14)", cursor: "pointer", transition: "border-color 0.25s", display: "flex", alignItems: "center", gap: 6 }}>
                            See it in action →
                        </motion.button>
                    </motion.div>

                    {/* Trust bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        style={{ display: "flex", gap: 28, marginTop: 56, flexWrap: "wrap" }}>
                        {[["500+", "Airlines"], ["800K+", "Hotels"], ["60s", "Avg booking"], ["98%", "Policy compliance"]].map(([n, l]) => (
                            <div key={l} style={{ borderLeft: "1px solid rgba(251,246,242,0.12)", paddingLeft: 16 }}>
                                <div style={{ fontFamily: "Cardo, serif", fontSize: 22, fontWeight: 700, color: T.cream, letterSpacing: "-0.02em" }}>{n}</div>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: "rgba(251,246,242,0.4)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — floating chat card */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
                    <motion.div style={{ x: floatX, y: floatY, width: "100%", maxWidth: 380 }}>
                        <TiltCard>
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.16,1,0.3,1] }}
                                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)", borderRadius: 24, padding: 28, border: "1px solid rgba(251,246,242,0.10)" }}>
                                {/* Card header */}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(251,246,242,0.10)" }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: T.maroon, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={T.orange} stroke={T.orange} strokeWidth="1" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 13, color: T.cream }}>Miraee AI</div>
                                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: "rgba(251,246,242,0.4)" }}>Tabhi-powered · Always on</div>
                                    </div>
                                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 10, color: "rgba(251,246,242,0.4)" }}>live</span>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {chatMsgs.map((m, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 + i * 0.4, duration: 0.45, ease: [0.16,1,0.3,1] }}
                                            style={{ display: "flex", justifyContent: m.who === "user" ? "flex-end" : "flex-start" }}>
                                            <div style={{
                                                maxWidth: "88%", padding: "10px 14px",
                                                borderRadius: m.who === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                                                background: m.who === "user" ? T.maroon : "rgba(251,246,242,0.08)",
                                                color: m.who === "user" ? T.cream : "rgba(251,246,242,0.82)",
                                                fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12.5, lineHeight: 1.55,
                                            }}>
                                                {m.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Booking confirmed bar */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.7, duration: 0.5 }}
                                    style={{ marginTop: 18, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#4ade80" }}>Trip booked in 60 seconds</div>
                                        <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 10.5, color: "rgba(251,246,242,0.45)", marginTop: 1 }}>Policy checked · Expenses queued · Calendar synced</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade into next section */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, transparent, ${T.ink})`, pointerEvents: "none", zIndex: 2 }} />
        </section>
    )
}

// ─── Animated stat group for WhatIsMiraee ─────────────────────────────────────
function WhatStats() {
    const r1 = useScrollCounter(500, "+")
    const r2 = useScrollCounter(800, "K+")
    const r3 = useScrollCounter(60, "s")
    return (
        <div style={{ display: "flex", gap: 40 }}>
            {[
                { ref: r1, label: "Airlines" },
                { ref: r2, label: "Hotels" },
                { ref: r3, label: "Avg booking" },
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
                            One AI platform.<br />
                            <span style={{ color: T.maroon, fontStyle: "italic" }}>Every employee trip, automated.</span>
                        </h2>
                    </Reveal>
                    <Reveal direction="left" delay={0.1}>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 20px" }}>
                            Miraee replaces fragmented travel tools with a single AI-native platform. Employees describe a trip in plain language — Miraee plans, books, enforces policy, and captures expenses automatically.
                        </p>
                    </Reveal>
                    <Reveal direction="left" delay={0.2}>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 36px" }}>
                            No portals. No expense forms. No month-end surprises. Just AI-native employee travel that runs itself.
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
                                "The only corporate travel platform where the AI actually does the work — not just suggests it."
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: T.maroon, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: T.cream, fontFamily: "Cardo, serif", fontWeight: 700, fontSize: 16 }}>M</span>
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
        "Search 3 booking portals for options",
        "Email manager for approval",
        "Book hotel separately on another site",
        "Arrange cab through ops team",
        "Photograph receipt, email finance",
        "Wait for reimbursement next month",
    ]
    const after = [
        "Say where you're going",
        "Everything else — done.",
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
                            Six painful steps become two words.
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
                            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "rgba(251,246,242,0.7)", marginBottom: 6 }}>Average time saved per trip</div>
                            <div style={{ fontFamily: "Cardo, serif", fontSize: 40, fontWeight: 700, color: T.cream, letterSpacing: "-0.03em" }}>2.4 hours</div>
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
            tag: "Per Traveller",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3.5" stroke={T.maroon} strokeWidth="1.8"/>
                    <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={T.maroon} strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            headline: "Remembers how you travel",
            body: "Seat preferences, meal choices, loyalty numbers, favorite hotels. Every booking gets more accurate the more you use it.",
            accent: T.maroon,
        },
        {
            tag: "Per Role",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke={T.orange} strokeWidth="1.8"/>
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.2" fill={T.orange}/>
                </svg>
            ),
            headline: "Policy that knows your grade",
            body: "An analyst and a VP don't book the same cabin. Miraee applies the right policy layer automatically — no manual overrides.",
            accent: T.orange,
        },
        {
            tag: "Per Company",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#1a6b4a" strokeWidth="1.8"/>
                    <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="#1a6b4a" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
            ),
            headline: "Learns your whole program",
            body: "Preferred vendors, negotiated rates, blackout periods — all baked in and updated live as your program evolves.",
            accent: "#1a6b4a",
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="Personalisation Engine" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            AI that knows <span style={{ color: T.maroon }}>who's booking</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 480, margin: "0 auto" }}>
                            Three layers of personalisation — traveller, role, company — working simultaneously.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 28 }}>
                    {cards.map((c, i) => (
                        <Reveal key={c.tag} direction="up" delay={i * 0.12}>
                            <TiltCard style={{ height: "100%" }}>
                                <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "40px 36px", border: `1px solid ${T.mutedLight}`, height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${c.accent}10` }} />
                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                        {c.icon}
                                    </div>
                                    <div style={{ display: "inline-block", background: `${c.accent}15`, color: c.accent, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                                        {c.tag}
                                    </div>
                                    <h3 style={{ fontFamily: "Cardo, serif", fontSize: 24, fontWeight: 700, color: T.ink, lineHeight: 1.25, margin: "0 0 14px" }}>{c.headline}</h3>
                                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, lineHeight: 1.65, color: T.muted, margin: 0 }}>{c.body}</p>
                                </div>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
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
    const m1 = useScrollCounter(28, "%")
    const m2 = useScrollCounter(4, ".2×")
    const m3 = useScrollCounter(98, "%")
    const metricRefs = [m1, m2, m3]
    const metrics = [
        { label: "Avg spend reduction", sub: "vs. prior year", accent: T.orange },
        { label: "ROI on platform cost", sub: "first 12 months", accent: T.maroon },
        { label: "Policy compliance rate", sub: "across all bookings", accent: T.maroon },
    ]
    return (
        <section style={{ background: "var(--page-bg)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <div>
                        <Reveal direction="left">
                            <Label text="Analytics & Insights" />
                            <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                                Every dollar,<br />
                                <span style={{ color: T.maroon, fontStyle: "italic" }}>visible in real time.</span>
                            </h2>
                            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, lineHeight: 1.75, color: T.muted, margin: "0 0 48px" }}>
                                Live dashboards. Live spend. Catch issues while you can still do something — not at month-end when it's too late.
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
                                    ↓ 28% YoY
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
    const sectionRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)
    const layerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]
    const numRefs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]

    useGSAP((gsap, ST) => {
        // 1. Heading — clip-path curtain wipe + blur reveal
        if (headingRef.current) {
            const label = headingRef.current.querySelector(".arch-label")
            const h2 = headingRef.current.querySelector("h2")
            if (label) {
                gsap.from(label, {
                    y: 20, opacity: 0, filter: "blur(8px)", duration: 0.7, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
                })
            }
            if (h2) {
                const words = h2.querySelectorAll(".arch-word")
                gsap.from(words, {
                    y: 48, opacity: 0, rotationX: -40, transformOrigin: "top center",
                    duration: 0.75, ease: "expo.out", stagger: 0.07,
                    scrollTrigger: { trigger: h2, start: "top 88%", toggleActions: "play none none none" },
                })
            }
        }

        // 2. Vertical connecting line — scaleY draws from top to bottom
        if (lineRef.current) {
            gsap.fromTo(lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1, duration: 1.2, ease: "power2.inOut",
                    scrollTrigger: { trigger: lineRef.current, start: "top 80%", end: "bottom 20%", scrub: 0.8 }
                }
            )
        }

        // 3. Layer cards — alternating left/right with blur, scale, and border glow
        layerRefs.forEach((ref, i) => {
            if (!ref.current) return
            const dir = i % 2 === 0 ? -100 : 100
            const card = ref.current.querySelector(".arch-card")
            const accent = ref.current.querySelector(".arch-accent")

            if (card) {
                gsap.from(card, {
                    x: dir, opacity: 0, filter: "blur(12px)", scale: 0.94,
                    duration: 1.0, ease: "expo.out",
                    scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
                    delay: 0.05 * i,
                })
            }

            // Border accent line reveal (left edge)
            if (accent) {
                gsap.from(accent, {
                    scaleY: 0, transformOrigin: "top center",
                    duration: 0.9, ease: "power3.out", delay: 0.3,
                    scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
                })
            }
        })

        // 4. Number counter animation — each num counts 0→01/02/03
        numRefs.forEach((ref, i) => {
            if (!ref.current) return
            const target = i + 1
            const obj = { val: 0 }
            gsap.to(obj, {
                val: target, duration: 1.2, ease: "power2.out",
                scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none reset" },
                onUpdate: () => {
                    if (ref.current) ref.current.textContent = String(Math.round(obj.val)).padStart(2, "0")
                },
            })
        })

        // 5. Quote block — scale from 0.93 + fade + border sweep
        if (quoteRef.current) {
            const bar = quoteRef.current.querySelector(".quote-bar")
            const text = quoteRef.current.querySelector(".quote-text")
            const sub = quoteRef.current.querySelector(".quote-sub")

            gsap.from(quoteRef.current, {
                scale: 0.93, opacity: 0, y: 40, filter: "blur(6px)",
                duration: 0.9, ease: "expo.out",
                scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
            })
            if (bar) {
                gsap.from(bar, {
                    scaleY: 0, transformOrigin: "top", duration: 0.8, ease: "power3.out", delay: 0.3,
                    scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
                })
            }
            if (text) {
                gsap.from(text, {
                    x: 24, opacity: 0, duration: 0.75, ease: "power3.out", delay: 0.35,
                    scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
                })
            }
            if (sub) {
                gsap.from(sub, {
                    x: 24, opacity: 0, duration: 0.75, ease: "power3.out", delay: 0.5,
                    scrollTrigger: { trigger: quoteRef.current, start: "top 88%", toggleActions: "play none none none" },
                })
            }
        }
    }, [])

    const layers = [
        {
            num: "01",
            title: "Conversational Interface",
            body: "Chat, voice, or app. Employees describe a trip in plain language — Miraee parses intent, extracts dates, destination, preferences in under a second.",
            color: T.orange,
            glow: "rgba(229,86,2,0.18)",
        },
        {
            num: "02",
            title: "AI Policy & Decision Engine",
            body: "Miraee's core brain. Checks policy, negotiated rates, traveller preferences, duty-of-care — and selects the optimal option before presenting it.",
            color: T.maroon,
            glow: "rgba(69,14,20,0.25)",
        },
        {
            num: "03",
            title: "Mondee Inventory & Settlement",
            body: "500+ airlines, 800K+ hotels, 50+ transfer partners — real corporate rates, real availability. Booking, expense capture, and reconciliation happen automatically.",
            color: "#1a4e6b",
            glow: "rgba(26,78,107,0.25)",
        },
    ]

    return (
        <section ref={sectionRef} style={{ background: "#0F0407", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* Heading */}
                <div ref={headingRef} style={{ textAlign: "center", marginBottom: 80, overflow: "hidden" }}>
                    <div className="arch-label" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,246,242,0.45)" }}>Platform Architecture</span>
                    </div>
                    <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.cream, lineHeight: 1.15, letterSpacing: "-0.03em", margin: "0 auto 20px", perspective: 800 }}>
                        {"Three layers.".split(" ").map((w, i) => (
                            <span key={i} className="arch-word" style={{ display: "inline-block", marginRight: "0.3em" }}>{w}</span>
                        ))}
                        <br />
                        {["One", "seamless", "experience."].map((w, i) => (
                            <span key={i} className="arch-word" style={{ display: "inline-block", marginRight: "0.3em", color: T.orange }}>{w}</span>
                        ))}
                    </h2>
                </div>

                {/* Cards with connecting line */}
                <div style={{ position: "relative" }}>
                    {/* Vertical connector line */}
                    <div ref={lineRef} style={{
                        position: "absolute", left: 59, top: 48, bottom: 48, width: 2,
                        background: `linear-gradient(to bottom, ${T.orange}, ${T.maroon}, #1a4e6b)`,
                        borderRadius: 2, opacity: 0.35, zIndex: 0,
                    }} />

                    <div style={{ display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 }}>
                        {layers.map((l, i) => (
                            <div key={l.num} ref={layerRefs[i]}>
                                <motion.div
                                    className="arch-card"
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
                                    <div className="arch-accent" style={{
                                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                                        background: `linear-gradient(to bottom, ${l.color}, transparent)`,
                                        borderRadius: "18px 0 0 18px",
                                    }} />
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                                        <span ref={numRefs[i]} style={{ fontFamily: "Cardo, serif", fontSize: 48, fontWeight: 700, color: l.color, lineHeight: 1, opacity: 0.9 }}>{l.num}</span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "Cardo, serif", fontSize: 26, fontWeight: 700, color: T.cream, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{l.title}</h3>
                                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, lineHeight: 1.7, color: "rgba(251,246,242,0.55)", margin: 0 }}>{l.body}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quote block */}
                <div ref={quoteRef} style={{ marginTop: 64, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(251,246,242,0.10)", borderRadius: 20, padding: "44px 48px", display: "flex", alignItems: "flex-start", gap: 24 }}>
                    <div className="quote-bar" style={{ minWidth: 4, height: 72, borderRadius: 2, background: T.orange, marginTop: 4 }} />
                    <div>
                        <div className="quote-text" style={{ fontFamily: "Cardo, serif", fontSize: 24, fontStyle: "italic", color: T.cream, lineHeight: 1.5, marginBottom: 16 }}>
                            "Book me a flight to Mumbai Tuesday, hotel near Lower Parel, and arrange a cab from the airport."
                        </div>
                        <div className="quote-sub" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "rgba(251,246,242,0.45)" }}>
                            That's the entire trip request. Flight + hotel + cab booked in 60 seconds, policy checked, calendar updated.
                        </div>
                    </div>
                </div>

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
            title: "HR & Identity",
            pills: ["Workday", "BambooHR", "Okta", "Azure AD", "SAP SuccessFactors"],
        },
        {
            title: "Finance & ERP",
            pills: ["SAP Concur", "Expensify", "NetSuite", "Oracle", "QuickBooks"],
        },
        {
            title: "Collaboration",
            pills: ["Slack", "Microsoft Teams", "Google Calendar", "Outlook"],
        },
        {
            title: "Data & Analytics",
            pills: ["Tableau", "Power BI", "Looker", "Google Sheets"],
        },
    ]
    return (
        <section style={{ background: "var(--surface)", padding: isMobile ? "80px 20px" : "120px 80px" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <Reveal direction="none">
                        <Label text="Integrations" />
                        <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 auto 20px" }}>
                            Plugs into your<br />
                            <span style={{ color: T.maroon, fontStyle: "italic" }}>existing stack.</span>
                        </h2>
                        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, color: T.muted, maxWidth: 480, margin: "0 auto" }}>
                            No rip-and-replace. Miraee connects where your team already works.
                        </p>
                    </Reveal>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 28 }}>
                    {cats.map((c, ci) => (
                        <Reveal key={c.title} direction="up" delay={ci * 0.1}>
                            <div style={{ background: "var(--page-bg)", borderRadius: 20, padding: "32px 32px", border: `1px solid ${T.mutedLight}` }}>
                                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: 14, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>{c.title}</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
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
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={0.3} direction="none">
                    <div style={{ textAlign: "center", marginTop: 48 }}>
                        <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: T.muted }}>
                            + REST API & webhooks for custom integrations
                        </span>
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
                    <Label text="Get Started" />
                    <h2 style={{ fontFamily: "Cardo, serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 700, color: T.ink, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
                        Schedule a personalised<br />
                        <span style={{ color: T.maroon }}>walkthrough.</span>
                    </h2>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 18, lineHeight: 1.65, color: T.muted, maxWidth: 480, margin: "0 auto 56px" }}>
                        20 minutes on your real travel program. We'll show you exactly what changes — with your numbers, your policy, your team.
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <motion.div ref={magRef} style={{ display: "inline-block" }}>
                        <motion.button
                            onClick={trigger}
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ boxShadow: "0 24px 64px rgba(69,14,20,0.4)" }}
                            style={{ position: "relative", overflow: "hidden", background: T.maroon, color: T.cream, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, fontWeight: 700, padding: "20px 52px", borderRadius: 100, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, letterSpacing: "-0.01em" }}>
                            <motion.span style={{ display: "flex", alignItems: "center", gap: 12, x: sx, y: sy }}>
                                {rippleEls}
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 0 3px rgba(34,197,94,0.3)" }} />
                                Book a demo — it's free
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </Reveal>
                <Reveal delay={0.35}>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: T.muted, marginTop: 20 }}>
                        No long contracts · No heavy IT lift · Pilots live in 90 days
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

// ─── SHARED FOOTER ────────────────────────────────────────────────────────────
function ProductFooter() {
    const w = useWindowWidth()
    const isMobile = w < 768
    return (
        <footer data-dark="true" style={{ background: "#0F0407", padding: `${isMobile ? 48 : 64}px ${isMobile ? 20 : 80}px 40px`, boxSizing: "border-box" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: isMobile ? 40 : 0, marginBottom: 48 }}>
                    <div>
                        <div style={{ marginBottom: 12 }}>
                            <MiraeeLogo fill={T.cream} height={22} />
                        </div>
                        <p style={{ margin: 0, fontSize: 14, fontFamily: "Plus Jakarta Sans", color: "rgba(251,246,242,0.3)", maxWidth: 240, lineHeight: 1.65 }}>
                            The AI-native employee travel platform. One conversation. Every trip, automated.
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: isMobile ? 40 : 64 }}>
                        {[
                            { title: "PRODUCT", links: ["Features", "Integrations", "Security", "Pricing"] },
                            { title: "COMPANY", links: ["About", "Blog", "Careers", "Contact"] },
                        ].map((col) => (
                            <div key={col.title}>
                                <p style={{ margin: "0 0 20px", fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 700, color: "rgba(251,246,242,0.2)", letterSpacing: "0.1em" }}>{col.title}</p>
                                {col.links.map(l => (
                                    <motion.p key={l} whileHover={{ x: 4, color: "rgba(251,246,242,0.75)" }} transition={{ duration: 0.18 }} style={{ margin: "0 0 12px", fontSize: 14, fontFamily: "Plus Jakarta Sans", color: "rgba(251,246,242,0.4)", cursor: "pointer" }}>{l}</motion.p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(251,246,242,0.06)", paddingTop: 24, display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0, justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontFamily: "Plus Jakarta Sans", color: "rgba(251,246,242,0.2)" }}>© 2025 Miraee. All rights reserved.</span>
                    <span style={{ fontSize: 13, fontFamily: "Plus Jakarta Sans", color: "rgba(251,246,242,0.2)" }}>Privacy Policy · Terms of Service</span>
                </div>
            </div>
        </footer>
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
        <div style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", fontFamily: "Plus Jakarta Sans, sans-serif", background: "var(--page-bg)", cursor: "none" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle />
            <CustomCursor />
            <ScrollProgress />
            <ProductNav />
            <ProductHero />
            <WhatIsMiraee />
            <UnifiedExperience />
            <PersonalisationEngine />
            <AnalyticsInsights />
            <PlatformArchitecture />
            <Integrations />
            <DemoCTA />
            <ProductFooter />
        </div>
    )
}
