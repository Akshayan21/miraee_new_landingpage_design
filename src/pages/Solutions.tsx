import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion"
import ThemeToggle from "../components/ThemeToggle"
import { useRef, useEffect, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
        s.textContent = `html{scroll-behavior:smooth;} *{-webkit-font-smoothing:antialiased;} body{cursor:none;}`
        document.head.appendChild(s)
    }, [])
    return null
}

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
                        <motion.div layoutId="tech-nav-underline" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5, background: T.orange, borderRadius: 2 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                    )}
                </a>
            ))}
        </div>
    )
}

function TechNav() {
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
                        <a href="#demo" style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 20px", background: T.accent, color: T.cream, borderRadius: 8, fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", cursor: "pointer" }}>
                            Book a demo
                        </a>
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
                        <a href="#demo" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 44, background: T.accent, color: T.cream, borderRadius: 8, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", marginTop: 4 }}>Book a demo</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

function TechFooter() {
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
// --- SOLUTIONS HERO (light theme) -------------------------------------------
const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -45 },
    visible: (i: number) => ({ y: "0%", opacity: 1, rotateX: 0,
        transition: { duration: 0.75, delay: 0.3 + i * 0.055, ease: "easeOut" as const } }),
}

function SolutionsHero() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const heroRef = useRef<HTMLDivElement>(null)
    const heroInnerRef = useRef<HTMLDivElement>(null)

    useGSAP((gsap, ST) => {
        if (!heroRef.current || !heroInnerRef.current) return
        gsap.to(heroInnerRef.current, { y: -160, ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5 } })
    }, [])

    const line1 = ["AI-Native", "Employee", "Travel"]
    const line2 = ["Solutions", "for", "Every"]
    const line3 = ["Team."]
    const allWords = [...line1, ...line2, ...line3]
    const roles = ["CEO", "CFO", "CHRO", "Travel Manager", "Traveller"]
    const floatPos = [
        { top: "16%", left: "7%" }, { top: "74%", left: "5%" },
        { top: "12%", right: "8%" }, { top: "66%", right: "6%" }, { top: "40%", right: "3%" },
    ]
    const accentWords = new Set(["Team."])

    let wordIdx = 0
    const renderLine = (words: string[]) => words.map((word) => {
        const idx = wordIdx++
        return (
            <span key={idx} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.15, perspective: 1000, marginRight: "0.22em" }}>
                <motion.span custom={idx} variants={wordVariants} initial="hidden" animate="visible"
                    style={{ display: "inline-block", backfaceVisibility: "hidden",
                        color: accentWords.has(word) ? T.orange : T.cream }}>
                    {word}
                </motion.span>
            </span>
        )
    })

    return (
        <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", background: "#0F0407", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(251,246,242,0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(251,246,242,0.038) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }}/>
            {/* Vignette */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: `radial-gradient(ellipse 72% 68% at 50% 50%, transparent 0%, rgba(var(--text-rgb),0.48) 38%, rgba(var(--text-rgb),0.88) 65%, ${T.ink} 88%)`,
            }} />
            {/* Orange corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 120, height: 120, borderTop: "1px solid rgba(229,86,2,0.15)", borderLeft: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, borderBottom: "1px solid rgba(229,86,2,0.15)", borderRight: "1px solid rgba(229,86,2,0.15)", pointerEvents: "none" }}/>
            {/* Floating role badges */}
            {!isMobile && roles.map((role, i) => (
                <motion.div key={role} initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", ...floatPos[i] as any, padding: "8px 18px",
                        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100,
                        background: "rgba(var(--text-rgb),0.55)", pointerEvents: "none" }}>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: "rgba(251,246,242,0.55)", letterSpacing: "0.09em" }}>{role}</span>
                </motion.div>
            ))}
            {/* Main content */}
            <div ref={heroInnerRef} style={{ position: "relative", zIndex: 3, maxWidth: 900, textAlign: "center", padding: isMobile ? "120px 24px 80px" : isTablet ? "100px 48px 80px" : "0 64px", willChange: "transform" }}>
                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" as const }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", border: "1px solid rgba(251,246,242,0.15)", borderRadius: 100, marginBottom: 48, background: "rgba(251,246,242,0.08)" }}>
                    <motion.div animate={{ scale: [1,1.6,1], opacity: [0.7,1,0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange, flexShrink: 0 }}/>
                    <span style={{ fontSize: 11, fontFamily: "Plus Jakarta Sans", color: T.cream, letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700 }}>Employee Travel Solutions · Miraee</span>
                </motion.div>
                {/* Heading  -  framer-motion word reveal, no GSAP dependency */}
                <h1 style={{ fontSize: isMobile ? 38 : isTablet ? 58 : 78, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.04, letterSpacing: "-0.035em", margin: "0 0 36px", textAlign: "center" }}>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line1)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line2)}</span>
                    <span style={{ display: "block", textAlign: "center" }}>{renderLine(line3)}</span>
                </h1>
                {/* Subhead */}
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" as const }}
                    style={{ fontSize: isMobile ? 16 : 19, color: "rgba(251,246,242,0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 52px", fontWeight: 400 }}>
                    Miraee is the AI-native employee travel platform that adapts to every role — from CFO to road warrior — and scales from startup to enterprise without adding headcount.
                </motion.p>
                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.25, ease: "easeOut" as const }}
                    style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <motion.a href="#demo" whileHover={{ scale: 1.04, boxShadow: "0 14px 48px rgba(229,86,2,0.55)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", background: T.orange, color: T.white, borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", display: "inline-block", letterSpacing: "0.01em" }}>
                        Book a demo
                    </motion.a>
                    <motion.a href="#roles" whileHover={{ borderColor: "rgba(251,246,242,0.5)", color: T.cream, background: "rgba(251,246,242,0.05)" }} whileTap={{ scale: 0.97 }}
                        style={{ padding: isMobile ? "14px 30px" : "17px 42px", border: "1px solid rgba(251,246,242,0.25)", color: "rgba(251,246,242,0.65)", borderRadius: 12, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 500, textDecoration: "none", display: "inline-block", transition: "all 0.22s" }}>
                        Talk to sales
                    </motion.a>
                </motion.div>
            </div>
            {/* Scroll indicator */}
            <motion.div style={{ position: "absolute", bottom: 36, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <span style={{ fontSize: 9, fontFamily: "Plus Jakarta Sans", color: "rgba(251,246,242,0.2)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
                <div style={{ width: 1, height: 52, background: "linear-gradient(to bottom,rgba(229,86,2,0.7),transparent)" }}/>
            </motion.div>
        </section>
    )
}

// --- BY ROLE -----------------------------------------------------------------
// SVG icon paths  -  avoids Unicode encoding issues
const ROLE_ICONS: Record<string, string> = {
    ceo:  "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 3a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
    cfo:  "M3 19l9-16 9 16H3zm9-12.5L5.5 17h13L12 6.5z",
    chro: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z",
    tm:   "M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z",
    traveller: "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z",
}

const ROLES = [
    { id: "ceo", label: "CEO", title: "For CEOs", sub: "Visibility without the overhead",
      color: T.orange,
      desc: "Keep travel efficient, compliant, and cost-controlled — without getting pulled into day-to-day coordination. Executive-level spend visibility, policy guardrails, and minimal oversight.",
      points: ["Executive-level spend visibility in real time", "Policy guardrails that enforce themselves", "Zero day-to-day coordination required"] },
    { id: "cfo", label: "CFO", title: "For CFOs", sub: "Travel spend you can actually forecast",
      color: "#C94A00",
      desc: "Every booking becomes structured financial data the moment it's made. Real-time spend visibility, automatic reconciliation, audit-ready reporting, cost-center mapping.",
      points: ["Real-time spend vs. budget dashboard", "Automatic three-way reconciliation", "Audit-ready reporting, always on", "Cost-center and GL mapping"] },
    { id: "chro", label: "CHRO", title: "For CHROs", sub: "Business travel people actually enjoy",
      color: T.maroon,
      desc: "A faster, less stressful way to book and manage travel. Seamless booking, post-5PM recommendations, bleisure extensions — and happier teams.",
      points: ["Booking done in under 60 seconds", "Post-5PM and bleisure handled natively", "Duty-of-care monitoring built in", "Traveller satisfaction scores"] },
    { id: "tm", label: "Travel Manager", title: "For Travel Managers", sub: "One dashboard for the whole program",
      color: T.orange,
      desc: "Bookings, approvals, disruptions, and group travel from a single place. Centralised control, approval workflows, consolidated reporting.",
      points: ["All bookings in one view", "Configurable approval workflows", "Group travel and MICE in one workflow", "Consolidated spend and policy reports"] },
    { id: "traveller", label: "Traveller", title: "For Travellers", sub: "Book in seconds, focus on the trip",
      color: "#C94A00",
      desc: "Flights, hotels, cabs, itineraries, and expenses  -  all in one conversation. AI booking, live updates, instant rebooking, loyalty tracking.",
      points: ["Full trip booked in one sentence", "Live gate and delay notifications", "Auto-rebook on cancellations", "Loyalty points tracked automatically"] },
]

function RoleIcon({ id, color, size = 16 }: { id: string; color: string; size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d={ROLE_ICONS[id] || ROLE_ICONS.ceo} fill={color} fillRule="evenodd"/>
        </svg>
    )
}

function ByRole() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const [active, setActive] = useState(0)
    const [stepProgress, setStepProgress] = useState(0)
    const outerRef = useRef<HTMLDivElement>(null)   // tall scroll container
    const stickyRef = useRef<HTMLDivElement>(null)  // pinned at top:0
    const tabListRef = useRef<HTMLDivElement>(null)
    const headRef = useRef<HTMLDivElement>(null)
    const N = ROLES.length  // 5

    useGSAP((gsap, ST) => {
        if (!outerRef.current) return

        // Entrance: heading words
        if (headRef.current) {
            const wds = headRef.current.querySelectorAll(".br-w")
            gsap.fromTo(wds,
                { y: "115%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.055, ease: "power4.out",
                  scrollTrigger: { trigger: headRef.current, start: "top 76%", once: true } })
        }

        // Entrance: tab list stagger
        if (tabListRef.current && !isMobile) {
            const tabs = tabListRef.current.querySelectorAll(".role-tab")
            gsap.fromTo(tabs,
                { x: -55, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out",
                  scrollTrigger: { trigger: tabListRef.current, start: "top 74%", once: true } })
        }

        if (isMobile) return  // mobile: tap-only, no scroll-pin

        // Scroll-driven role cycling  -  outer container is N*100vh tall
        // CSS sticky keeps stickyRef at top:0 while outer scrolls
        ST.create({
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self: any) => {
                const rawIdx = self.progress * N
                const idx = Math.min(Math.floor(rawIdx), N - 1)
                const frac = rawIdx - Math.floor(rawIdx)
                setActive(idx)
                setStepProgress(idx === N - 1 ? 1 : frac)
            },
        })
    }, [isMobile])

    const current = ROLES[active]

    return (
        // Outer tall container  -  desktop: N*100vh so each role gets one viewport of scroll
        <div ref={outerRef} id="roles" style={{ position: "relative", height: isMobile ? "auto" : `${N * 100}vh`, background: "var(--page-bg)" }}>
            {/* Sticky inner  -  stays at top:0 for desktop, normal flow for mobile */}
            <div ref={stickyRef} style={{
                position: isMobile ? "relative" : "sticky",
                top: 0,
                height: isMobile ? "auto" : "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: isMobile ? "80px 24px" : "0 80px",
                background: "var(--page-bg)",
            }}>
                {/* Progress bar  -  desktop only */}
                {!isMobile && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(var(--text-rgb),0.06)", zIndex: 10 }}>
                        <motion.div
                            animate={{ scaleX: (active + stepProgress) / N }}
                            transition={{ duration: 0.1, ease: "linear" as const }}
                            style={{ height: "100%", background: T.orange, transformOrigin: "left", scaleX: 0 }}
                        />
                    </div>
                )}
                {/* Step dots  -  desktop right side */}
                {!isMobile && (
                    <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, zIndex: 10 }}>
                        {ROLES.map((r, i) => (
                            <motion.div key={r.id} animate={{ scale: active === i ? 1.4 : 1, opacity: active === i ? 1 : 0.3 }}
                                transition={{ duration: 0.25 }}
                                style={{ width: 6, height: 6, borderRadius: "50%", background: active === i ? T.orange : T.ink, cursor: "pointer" }}
                                onClick={() => setActive(i)}
                            />
                        ))}
                    </div>
                )}

                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                    {/* Heading block */}
                    <div style={{ marginBottom: isMobile ? 48 : 56 }}>
                        <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 14 }}>
                            Solutions by Role
                        </motion.span>
                        <div ref={headRef}>
                            <h2 style={{ fontSize: isMobile ? 34 : isTablet ? 50 : 62, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0 }}>
                                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                    <span className="br-w" style={{ display: "inline-block" }}>Who Uses Miraee's AI Travel Platform?</span>
                                </span>
                            </h2>
                        </div>
                    </div>

                    {/* Two-column layout */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "220px 1fr", gap: isMobile ? 0 : 40, alignItems: "start" }}>
                        {/* Tab list */}
                        <div ref={tabListRef} style={{ display: "flex", flexDirection: isMobile || isTablet ? "row" : "column", gap: 3, overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 16 : 0 }}>
                            {ROLES.map((role, i) => (
                                <motion.button key={role.id} className="role-tab"
                                    onClick={() => setActive(i)}
                                    whileHover={{ x: isMobile ? 0 : 4 }}
                                    style={{
                                        padding: isMobile ? "9px 12px" : "12px 16px",
                                        borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
                                        background: active === i ? "rgba(229,86,2,0.07)" : "transparent",
                                        borderLeft: !isMobile && !isTablet ? `3px solid ${active === i ? T.orange : "transparent"}` : "none",
                                        borderBottom: (isMobile || isTablet) ? `2px solid ${active === i ? T.orange : "transparent"}` : "none",
                                        flexShrink: 0, transition: "all 0.22s",
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                        <RoleIcon id={role.id} color={active === i ? role.color : "rgba(var(--text-rgb),0.2)"} size={14}/>
                                        <span style={{ fontSize: isMobile ? 12 : 13, fontFamily: "Plus Jakarta Sans", fontWeight: active === i ? 700 : 500, color: active === i ? T.ink : T.muted, whiteSpace: "nowrap", transition: "all 0.22s" }}>{role.label}</span>
                                    </div>
                                    {/* Per-tab progress bar  -  desktop only */}
                                    {!isMobile && !isTablet && active === i && (
                                        <motion.div
                                            initial={{ scaleX: 0 }} animate={{ scaleX: stepProgress }}
                                            transition={{ duration: 0.08, ease: "linear" as const }}
                                            style={{ height: 2, background: role.color, borderRadius: 2, marginTop: 6, transformOrigin: "left" }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Content panel */}
                        <AnimatePresence mode="wait">
                            <motion.div key={current.id}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: "easeOut" as const }}
                                style={{ padding: isMobile ? "16px 0 0" : "0" }}>
                                <div style={{ padding: isMobile ? "28px 20px" : "44px 48px", background: "rgba(255,255,255,0.04)", borderRadius: 20, position: "relative", overflow: "hidden", minHeight: isMobile ? 0 : 360, border: "1px solid rgba(255,255,255,0.08)" }}>
                                    {/* Corner glow */}
                                    <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, background: `radial-gradient(circle at top right, ${current.color}11, transparent 60%)`, pointerEvents: "none" }}/>
                                    {/* Role badge */}
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, background: `${current.color}12`, marginBottom: 22, border: `1px solid ${current.color}30` }}>
                                        <RoleIcon id={current.id} color={current.color} size={11}/>
                                        <span style={{ fontSize: 10, color: current.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Plus Jakarta Sans", fontWeight: 700 }}>{current.label}</span>
                                    </div>
                                    <h3 style={{ fontSize: isMobile ? 24 : 34, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{current.title}</h3>
                                    <p style={{ fontSize: 15, color: current.color, fontFamily: "Plus Jakarta Sans", fontStyle: "italic", marginBottom: 18, fontWeight: 500 }}>{current.sub}</p>
                                    <p style={{ fontSize: 14, color: "rgba(251,246,242,0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: "0 0 28px", maxWidth: 500 }}>{current.desc}</p>
                                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                                        {current.points.map((pt, i) => (
                                            <motion.div key={pt} initial={{ x: -14, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06, duration: 0.35 }}
                                                style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                                                <div style={{ width: 17, height: 17, borderRadius: 5, background: current.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                                    <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke={T.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                                                </div>
                                                <span style={{ fontSize: 13, color: "rgba(251,246,242,0.65)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.6 }}>{pt}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {/* Scroll hint  -  desktop only, fades after first role */}
                                    {!isMobile && active === 0 && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
                                            style={{ position: "absolute", bottom: 20, right: 28, display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{ fontSize: 10, color: "rgba(var(--text-rgb),0.3)", fontFamily: "Plus Jakarta Sans", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll to explore</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M3 7l3 3 3-3" stroke="rgba(var(--text-rgb),0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- BY COMPANY SIZE ----------------------------------------------------------
function BySize() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)

    const sizes = [
        { label: "Startups", range: "5 - 100 people", dots: 1, color: T.orange,
          headline: "Enterprise-grade travel, none of the overhead.",
          desc: "Founder-friendly cost controls. No dedicated travel team required. Full compliance from day one.",
          features: ["Fast onboarding", "Auto policy enforcement", "Zero admin overhead"] },
        { label: "Mid-sized", range: "100 - 1,000 people", dots: 4, color: T.maroon,
          headline: "Scale your program with confidence.",
          desc: "Department-level visibility. Offsites and client travel, sorted. Approval chains that match your org chart.",
          features: ["Dept-level dashboards", "Offsite coordination", "Configurable approvals"] },
        { label: "Enterprise", range: "1,000+ people", dots: 9, color: "#C94A00",
          headline: "Built for complex operations.",
          desc: "High volumes, multiple approvers, global programs. Advanced workflows, cross-border support, large-scale MICE.",
          features: ["Multi-region support", "Advanced MICE", "Enterprise reporting", "API access"] },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const cards = sectionRef.current.querySelectorAll(".size-card")
        gsap.fromTo(cards, { y: 70, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.13, ease: "power3.out",
              scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true } })
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "var(--surface-2)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 56 : 80 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>Solutions by Company Size</span>
                        <h2 style={{ fontSize: isMobile ? 32 : 56, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 auto", maxWidth: 560 }}>
                            Built for your stage.<br/>Ready for the next one.
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
                    {sizes.map((size, i) => (
                        <motion.div key={size.label} className="size-card"
                            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(var(--text-rgb),0.1)" }}
                            style={{ background: "var(--surface)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(var(--text-rgb),0.06)" }}>
                            <div style={{ height: 4, background: size.color }}/>
                            <div style={{ padding: isMobile ? "28px 24px" : "36px 32px" }}>
                                <div style={{ marginBottom: 24, display: "grid", gridTemplateColumns: `repeat(${size.dots === 1 ? 1 : size.dots === 4 ? 2 : 3}, auto)`, gap: 8, width: "fit-content" }}>
                                    {Array.from({ length: size.dots }).map((_, di) => (
                                        <motion.div key={di} animate={{ scale: [1, 1.25, 1] }}
                                            transition={{ duration: 2.2, delay: di * 0.18, repeat: Infinity, ease: "easeInOut" }}
                                            style={{ width: size.dots === 1 ? 14 : size.dots === 4 ? 10 : 8, height: size.dots === 1 ? 14 : size.dots === 4 ? 10 : 8, borderRadius: "50%", background: size.color, opacity: 0.7 }}/>
                                    ))}
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: size.color, fontFamily: "Plus Jakarta Sans", marginBottom: 8 }}>{size.range}</div>
                                <h3 style={{ fontSize: isMobile ? 22 : 26, fontFamily: "Cardo,serif", fontWeight: 700, color: T.ink, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{size.headline}</h3>
                                <p style={{ fontSize: 14, color: T.muted, fontFamily: "Plus Jakarta Sans", lineHeight: 1.7, margin: "0 0 24px" }}>{size.desc}</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {size.features.map((f) => (
                                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: size.color, flexShrink: 0 }}/>
                                            <span style={{ fontSize: 13, color: T.ink, fontFamily: "Plus Jakarta Sans", fontWeight: 500 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- BY USE CASE --------------------------------------------------------------
function ByUseCase() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const isTablet = w < 1024
    const sectionRef = useRef<HTMLElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    const cases = [
        { num: "01", title: "Everyday business travel", tag: "Daily ops", featured: true, emergency: false,
          body: "The sales rep flying to a client, the engineer to an office. 'Book me to Mumbai Wednesday, back Thursday, hotel near BKC.' Done in 60 seconds, in policy, expenses auto-filed. The rep never opens a portal." },
        { num: "02", title: "Meetings & events (MICE)", tag: "Group travel", featured: false, emergency: false,
          body: "Group travel without the spreadsheets. Venue sourcing, group flights, hotel blocks, transport, and a live event budget  -  all as one workflow, from RFP to post-event ROI." },
        { num: "03", title: "Executive travel", tag: "Premium", featured: false, emergency: false,
          body: "Tighter calendars, premium cabins, last-minute changes, privacy by default. The same AI  -  turned up for the trips that matter most. EAs delegate with full context." },
        { num: "04", title: "Global mobility", tag: "Complex trips", featured: false, emergency: false,
          body: "Five cities, two colleagues joining mid-trip, a visa for one country, a board call mid-flight. Miraee plans, books, and re-routes the whole thing as one journey." },
        { num: "05", title: "Emergency travel", tag: "Crisis response", featured: false, emergency: true,
          body: "Flight canceled. Hotel overbooked. Country in lockdown. Miraee detects it, picks the best in-policy alternative, books it, and sends one notification telling the traveller it's sorted." },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".uc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".uc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.04, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 70%", once: true } })
        }
        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll(".uc-card")
            gsap.fromTo(cards, { y: 60, opacity: 0, clipPath: "inset(0 0 30% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.75, stagger: 0.1, ease: "power3.out",
                  scrollTrigger: { trigger: gridRef.current, start: "top 68%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: "#0F0407", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(251,246,242,0.038) 1px, transparent 1px), linear-gradient(90deg, rgba(251,246,242,0.038) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <div style={{ marginBottom: isMobile ? 56 : 80 }}>
                    <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 20 }}>
                        Solutions by Use Case
                    </motion.span>
                    <h2 className="uc-heading" style={{ fontSize: isMobile ? 28 : isTablet ? 44 : 60, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 12px" }}>
                        {["From", "everyday", "employee", "travel", "to", "the", "trip", "from"].map((word, i) => (
                            <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                                <span className="uc-w" style={{ display: "inline-block" }}>{word}</span>
                            </span>
                        ))}
                        <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                            <span className="uc-w" style={{ display: "inline-block", color: T.orange, fontStyle: "italic" }}>hell.</span>
                        </span>
                        <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.18 }}>
                            <span className="uc-w" style={{ display: "inline-block" }}>Handled.</span>
                        </span>
                    </h2>
                </div>
                <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14 }}>
                    {cases.map((c, i) => (
                        <motion.div key={c.num} className="uc-card"
                            whileHover={{ borderColor: c.emergency ? "rgba(229,86,2,0.6)" : "rgba(var(--text-rgb),0.14)", y: -4 }}
                            style={{
                                gridColumn: (!isMobile && !isTablet && c.featured) ? "span 2" : "span 1",
                                padding: isMobile ? "28px 22px" : "36px 32px",
                                borderRadius: 20,
                                background: c.emergency ? "rgba(229,86,2,0.07)" : "rgba(255,255,255,0.04)",
                                border: c.emergency ? "1px solid rgba(229,86,2,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                position: "relative", overflow: "hidden",
                            }}>
                            {c.emergency && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: T.orange }}/>}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                <span style={{ fontSize: 11, fontFamily: "monospace", color: c.emergency ? T.orange : "rgba(251,246,242,0.2)", fontWeight: 700 }}>{c.num}</span>
                                <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: 100, background: c.emergency ? "rgba(229,86,2,0.12)" : "rgba(251,246,242,0.06)", color: c.emergency ? T.orange : "rgba(251,246,242,0.4)", fontFamily: "Plus Jakarta Sans", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>{c.tag}</span>
                            </div>
                            <h3 style={{ fontSize: isMobile ? 18 : (c.featured && !isMobile && !isTablet) ? 28 : 20, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "0 0 14px" }}>{c.title}</h3>
                            <p style={{ fontSize: 14, color: c.emergency ? "rgba(251,246,242,0.55)" : "rgba(251,246,242,0.45)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.75, margin: 0, maxWidth: c.featured && !isMobile ? 480 : "none" }}>{c.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- INTERACTIVE GLOBE --------------------------------------------------------
const GLOBE_PINS = [
    { lat: 40.7,  lon: -74.0,  label: "New York",   role: "North America Hub" },
    { lat: 51.5,  lon: -0.1,   label: "London",     role: "Europe HQ" },
    { lat: 25.2,  lon: 55.3,   label: "Dubai",      role: "Middle East Hub" },
    { lat: 1.4,   lon: 103.8,  label: "Singapore",  role: "Asia Pacific HQ" },
    { lat: -33.9, lon: 151.2,  label: "Sydney",     role: "ANZ Hub" },
    { lat: 19.1,  lon: 72.9,   label: "Mumbai",     role: "South Asia Hub" },
    { lat: 35.7,  lon: 139.7,  label: "Tokyo",      role: "Japan Hub" },
    { lat: 50.1,  lon: 8.7,    label: "Frankfurt",  role: "DACH Hub" },
    { lat: 41.9,  lon: -87.6,  label: "Chicago",    role: "Midwest Hub" },
    { lat: 22.3,  lon: 114.2,  label: "Hong Kong",  role: "Greater China Hub" },
    { lat: -23.5, lon: -46.6,  label: "Sao Paulo",  role: "LATAM Hub" },
    { lat: 55.7,  lon: 37.6,   label: "Moscow",     role: "Eastern Europe Hub" },
]

const CONTINENTS: number[][][] = [
    // North America
    [[71,-80],[65,-85],[60,-95],[55,-120],[50,-125],[40,-124],[32,-117],[22,-105],
     [15,-90],[9,-79],[8,-77],[18,-66],[25,-80],[30,-81],[35,-76],[40,-74],[45,-67],
     [50,-55],[55,-57],[60,-65],[70,-68],[75,-75],[80,-85],[83,-70],[71,-80]],
    // Greenland
    [[83,-25],[76,-18],[72,-22],[72,-40],[75,-57],[80,-57],[83,-45],[83,-25]],
    // South America
    [[10,-62],[5,-52],[-5,-35],[-15,-39],[-23,-43],[-33,-53],[-42,-64],[-55,-68],
     [-52,-75],[-42,-73],[-28,-70],[-10,-78],[0,-80],[8,-77],[10,-62]],
    // Europe
    [[71,28],[65,14],[60,5],[52,4],[50,-1],[44,-8],[36,-6],[36,5],[38,14],
     [40,18],[42,12],[44,8],[47,10],[50,14],[53,14],[56,22],[60,25],[65,25],[71,28]],
    // Africa
    [[37,9],[22,37],[12,43],[0,42],[-5,40],[-15,35],[-25,33],[-34,18],[-32,18],
     [-25,15],[-10,14],[-5,10],[5,-15],[18,-16],[30,-10],[35,4],[37,9]],
    // Asia
    [[70,30],[72,55],[72,80],[68,100],[68,130],[60,145],[55,140],[45,136],[35,120],
     [25,120],[22,115],[15,108],[10,105],[1,104],[5,100],[10,100],[20,93],[22,92],
     [18,84],[8,77],[20,58],[25,55],[30,48],[30,40],[35,36],[38,26],[42,28],
     [48,38],[55,38],[65,38],[70,30]],
    // Japan (simplified)
    [[45,141],[40,141],[35,136],[34,131],[33,131],[34,130],[37,136],[40,140],[45,141]],
    // Australia
    [[-16,136],[-14,128],[-20,116],[-28,114],[-34,119],[-38,140],[-36,150],
     [-28,153],[-18,146],[-12,136],[-16,136]],
    // New Zealand (south island approx)
    [[-40,172],[-43,171],[-46,168],[-44,170],[-42,174],[-40,172]],
    // UK / Ireland
    [[58,-4],[56,-3],[54,-5],[52,-5],[51,0],[54,0],[56,-2],[58,-4]],
    // Iberian Peninsula
    [[44,-8],[36,-7],[36,5],[40,3],[42,3],[44,-8]],
    // Italy
    [[44,8],[38,16],[38,13],[42,12],[44,8]],
    // Scandinavia
    [[71,28],[68,18],[65,14],[58,5],[60,5],[65,14],[68,18],[71,28]],
]

function GlobeMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rotY = useRef(0.4)
    const rotX = useRef(-0.25)
    const isDragging = useRef(false)
    const lastMouse = useRef({ x: 0, y: 0 })
    const frameRef = useRef<number>(0)
    const tagRefs = useRef<(HTMLDivElement | null)[]>([])
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || typeof window === "undefined") return
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        if (!ctx) return

        const SIZE = 500
        canvas.width = SIZE
        canvas.height = SIZE
        const cx = SIZE / 2, cy = SIZE / 2, R = SIZE * 0.40

        function toCart(lat: number, lon: number) {
            const phi = (90 - lat) * Math.PI / 180
            const th = lon * Math.PI / 180
            return { x: Math.sin(phi)*Math.sin(th), y: Math.cos(phi), z: Math.sin(phi)*Math.cos(th) }
        }

        function rotPt(p: {x:number,y:number,z:number}, ry: number, rx: number) {
            const x1 = p.x*Math.cos(ry) + p.z*Math.sin(ry)
            const z1 = -p.x*Math.sin(ry) + p.z*Math.cos(ry)
            const y2 = p.y*Math.cos(rx) - z1*Math.sin(rx)
            const z2 = p.y*Math.sin(rx) + z1*Math.cos(rx)
            return { x: x1, y: y2, z: z2 }
        }

        function proj(p: {x:number,y:number,z:number}) {
            return { sx: cx + p.x*R, sy: cy - p.y*R, z: p.z }
        }

        function drawContinent(coords: number[][]) {
            ctx.beginPath()
            let penUp = true
            for (const coord of coords) {
                const p = rotPt(toCart(coord[0], coord[1]), rotY.current, rotX.current)
                const s = proj(p)
                if (p.z > -0.05) {
                    if (penUp) { ctx.moveTo(s.sx, s.sy); penUp = false }
                    else { ctx.lineTo(s.sx, s.sy) }
                } else { penUp = true }
            }
            ctx.fillStyle = "rgba(229,86,2,0.07)"
            ctx.fill()
            ctx.strokeStyle = "rgba(229,86,2,0.28)"
            ctx.lineWidth = 0.8
            ctx.stroke()
        }

        function draw() {
            ctx.clearRect(0, 0, SIZE, SIZE)
            const ry = rotY.current, rx = rotX.current

            // Sphere fill
            const bg = ctx.createRadialGradient(cx-R*0.25, cy-R*0.25, R*0.05, cx, cy, R)
            bg.addColorStop(0, "rgba(65,14,18,1)")
            bg.addColorStop(0.55, "rgba(28,6,8,1)")
            bg.addColorStop(1, "rgba(10,2,4,1)")
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2)
            ctx.fillStyle = bg; ctx.fill()

            // Atmospheric glow
            const atm = ctx.createRadialGradient(cx, cy, R*0.88, cx, cy, R*1.22)
            atm.addColorStop(0, "rgba(229,86,2,0.18)")
            atm.addColorStop(0.5, "rgba(229,86,2,0.06)")
            atm.addColorStop(1, "rgba(229,86,2,0)")
            ctx.beginPath(); ctx.arc(cx, cy, R*1.22, 0, Math.PI*2)
            ctx.fillStyle = atm; ctx.fill()

            // Clip sphere
            ctx.save()
            ctx.beginPath(); ctx.arc(cx, cy, R-1, 0, Math.PI*2); ctx.clip()

            // Grid lines
            for (let la = -80; la <= 80; la += 20) {
                ctx.beginPath(); let f = true
                for (let lo = -180; lo <= 180; lo += 2) {
                    const p = rotPt(toCart(la, lo), ry, rx); const s = proj(p)
                    if (p.z >= 0) { f ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); f = false } else { f = true }
                }
                ctx.strokeStyle = "rgba(229,86,2,0.07)"; ctx.lineWidth = 0.5; ctx.stroke()
            }
            for (let lo = -170; lo <= 180; lo += 20) {
                ctx.beginPath(); let f = true
                for (let la = -90; la <= 90; la += 2) {
                    const p = rotPt(toCart(la, lo), ry, rx); const s = proj(p)
                    if (p.z >= 0) { f ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); f = false } else { f = true }
                }
                ctx.strokeStyle = "rgba(229,86,2,0.06)"; ctx.lineWidth = 0.4; ctx.stroke()
            }
            // Equator
            ctx.beginPath(); let eqF = true
            for (let lo = -180; lo <= 180; lo += 1) {
                const p = rotPt(toCart(0, lo), ry, rx); const s = proj(p)
                if (p.z >= 0) { eqF ? ctx.moveTo(s.sx, s.sy) : ctx.lineTo(s.sx, s.sy); eqF = false } else { eqF = true }
            }
            ctx.strokeStyle = "rgba(229,86,2,0.18)"; ctx.lineWidth = 0.8; ctx.stroke()

            // Continents
            for (const continent of CONTINENTS) { drawContinent(continent) }

            ctx.restore()

            // Sphere border
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2)
            ctx.strokeStyle = "rgba(229,86,2,0.3)"; ctx.lineWidth = 1.5; ctx.stroke()

            // Specular highlight
            ctx.beginPath()
            ctx.arc(cx - R*0.28, cy - R*0.28, R*0.55, 0.9, 2.0)
            ctx.strokeStyle = "rgba(251,246,242,0.04)"; ctx.lineWidth = 14; ctx.stroke()

            // Pins
            const t = Date.now() / 1000
            const sorted = GLOBE_PINS.map((pin, idx) => {
                const p = rotPt(toCart(pin.lat, pin.lon), ry, rx)
                const s = proj(p)
                return { ...pin, ...s, z: p.z, idx }
            }).filter(p => p.z > 0.05).sort((a, b) => a.z - b.z)

            for (const pin of sorted) {
                const alpha = Math.min(1, (pin.z - 0.05) * 3)
                const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + pin.idx * 0.85)
                const pinR = 4
                const haloR = 14 + pulse * 7

                const halo = ctx.createRadialGradient(pin.sx, pin.sy, 0, pin.sx, pin.sy, haloR)
                halo.addColorStop(0, `rgba(229,86,2,${0.4 * alpha})`)
                halo.addColorStop(0.5, `rgba(229,86,2,${0.1 * alpha})`)
                halo.addColorStop(1, "rgba(229,86,2,0)")
                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, haloR, 0, Math.PI*2)
                ctx.fillStyle = halo; ctx.fill()

                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, pinR + 2.5, 0, Math.PI*2)
                ctx.strokeStyle = `rgba(229,86,2,${0.45 * alpha})`; ctx.lineWidth = 1; ctx.stroke()

                const dotG = ctx.createRadialGradient(pin.sx-1, pin.sy-1, 0, pin.sx, pin.sy, pinR)
                dotG.addColorStop(0, `rgba(255,195,130,${alpha})`)
                dotG.addColorStop(1, `rgba(229,86,2,${alpha})`)
                ctx.beginPath(); ctx.arc(pin.sx, pin.sy, pinR, 0, Math.PI*2)
                ctx.fillStyle = dotG; ctx.fill()

                // Connector line to tag (drawn upward from pin)
                ctx.beginPath()
                ctx.moveTo(pin.sx, pin.sy - pinR)
                ctx.lineTo(pin.sx, pin.sy - 24)
                ctx.strokeStyle = `rgba(229,86,2,${0.35 * alpha})`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // Update HTML tag overlays via DOM
            for (let i = 0; i < GLOBE_PINS.length; i++) {
                const pin = GLOBE_PINS[i]
                const p = rotPt(toCart(pin.lat, pin.lon), ry, rx)
                const s = proj(p)
                const el = tagRefs.current[i]
                if (el) {
                    if (p.z > 0.12) {
                        const alpha = Math.min(1, (p.z - 0.12) * 2.5)
                        el.style.opacity = String(alpha)
                        el.style.left = (s.sx / SIZE * 100) + "%"
                        el.style.top = ((s.sy - 28) / SIZE * 100) + "%"
                        el.style.display = "block"
                    } else {
                        el.style.display = "none"
                    }
                }
            }

            if (!isDragging.current) rotY.current += 0.003
            frameRef.current = requestAnimationFrame(draw)
        }

        draw()
        return () => { cancelAnimationFrame(frameRef.current) }
    }, [])

    const getCanvasXY = (e: any, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
    }

    const onMouseDown = (e: any) => {
        isDragging.current = true
        setDragging(true)
        const pos = getCanvasXY(e, canvasRef.current!)
        lastMouse.current = pos
    }
    const onMouseMove = (e: any) => {
        if (!canvasRef.current || !isDragging.current) return
        const pos = getCanvasXY(e, canvasRef.current)
        const dx = pos.x - lastMouse.current.x
        const dy = pos.y - lastMouse.current.y
        rotY.current += dx * 0.007
        rotX.current = Math.max(-1.2, Math.min(1.2, rotX.current + dy * 0.007))
        lastMouse.current = pos
    }
    const onMouseUp = () => { isDragging.current = false; setDragging(false) }

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 500, aspectRatio: "1/1", margin: "0 auto" }}>
            <canvas ref={canvasRef}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove}
                onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
                onTouchStart={onMouseDown} onTouchMove={onMouseMove} onTouchEnd={onMouseUp}
                style={{ width: "100%", height: "100%", cursor: dragging ? "grabbing" : "grab", display: "block", borderRadius: 16 }}
            />
            {/* HTML tag overlays — positioned via DOM in draw loop */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                {GLOBE_PINS.map((pin, i) => (
                    <div key={pin.label}
                        ref={el => { tagRefs.current[i] = el }}
                        style={{
                            position: "absolute",
                            display: "none",
                            transform: "translate(-50%, -100%)",
                            background: "rgba(10,2,4,0.92)",
                            border: "1px solid rgba(229,86,2,0.45)",
                            borderRadius: 7,
                            padding: "4px 10px 5px",
                            whiteSpace: "nowrap",
                            backdropFilter: "blur(6px)",
                        }}>
                        <div style={{ color: "#FBF6F2", fontSize: 11, fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.3 }}>{pin.label}</div>
                        <div style={{ color: "#E55602", fontSize: 9, fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.4 }}>{pin.role}</div>
                        {/* caret */}
                        <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(229,86,2,0.45)" }} />
                    </div>
                ))}
            </div>
            {/* Live badge */}
            <div style={{ position: "absolute", bottom: 14, left: 14, display: "flex", alignItems: "center", gap: 6, pointerEvents: "none" }}>
                <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: "#E55602" }}/>
                <span style={{ fontSize: 10, color: "rgba(229,86,2,0.7)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Live monitoring</span>
            </div>
            <div style={{ position: "absolute", top: 12, left: 14, pointerEvents: "none" }}>
                <span style={{ fontSize: 9, color: "rgba(var(--text-rgb),0.3)", fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Drag to rotate</span>
            </div>
        </div>
    )
}

// --- DUTY OF CARE -------------------------------------------------------------
function DutyOfCare() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const sectionRef = useRef<HTMLDivElement>(null)
    const pointsRef = useRef<HTMLDivElement>(null)
    const features = [
        { icon: ["M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"], title: "Real-time location", desc: "One live map, filter by region, team, or risk level." },
        { icon: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"], title: "Risk monitoring", desc: "Weather, unrest, health alerts, advisories, flagged proactively." },
        { icon: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"], title: "Instant response", desc: "One tap triggers rebooking, hotel relocation, and manager notification." },
        { icon: ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2", "M9 12h6M9 16h4"], title: "Audit-ready records", desc: "A full trail of every itinerary and response." },
    ]

    useGSAP((gsap, ST) => {
        if (!sectionRef.current) return
        const hd = sectionRef.current.querySelector(".doc-heading")
        if (hd) {
            const wds = hd.querySelectorAll(".doc-w")
            gsap.fromTo(wds, { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.85, stagger: 0.05, ease: "power4.out",
                  scrollTrigger: { trigger: hd, start: "top 72%", once: true } })
        }
        if (pointsRef.current) {
            const pts = pointsRef.current.querySelectorAll(".doc-pt")
            gsap.fromTo(pts, { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                  scrollTrigger: { trigger: pointsRef.current, start: "top 68%", once: true } })
        }
    }, [])

    return (
        <section ref={sectionRef} style={{ padding: isMobile ? "80px 24px" : "130px 80px", background: T.maroon, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "25%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(229,86,2,0.08) 0%, transparent 65%)", pointerEvents: "none" }}/>
            <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans", display: "inline-block", marginBottom: 16 }}>
                    Duty of Care
                </motion.span>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, marginBottom: 56 }}>
                    <div>
                        <h2 className="doc-heading" style={{ fontSize: isMobile ? 30 : 48, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 28px" }}>
                            {[["Always", "know", "where"], ["your", "people", "are."]].map((line, li) => (
                                <span key={li} style={{ display: "block" }}>
                                    {line.map((word, wi) => (
                                        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em", verticalAlign: "bottom", lineHeight: 1.2 }}>
                                            <span className="doc-w" style={{ display: "inline-block" }}>{word}</span>
                                        </span>
                                    ))}
                                </span>
                            ))}
                            <span style={{ display: "block", overflow: "hidden", lineHeight: 1.2, marginTop: 4 }}>
                                <span className="doc-w" style={{ display: "inline-block", color: T.orange, fontStyle: "italic" }}>Always ready.</span>
                            </span>
                        </h2>
                        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ fontSize: 15, color: "rgba(251,246,242,0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 440 }}>
                            Duty of care used to mean a spreadsheet of itineraries and a phone tree. Miraee turns it into a live, AI-monitored safety layer.
                        </motion.p>
                        <div ref={pointsRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {features.map((f, i) => (
                                <motion.div key={f.title} className="doc-pt" whileHover={{ x: 6 }}
                                    style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(229,86,2,0.15)", border: "1px solid rgba(229,86,2,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <motion.div animate={{ opacity: [0.7,1,0.7] }} transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                {f.icon.map((d: string, di: number) => <path key={di} d={d}/>)}
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 15, fontFamily: "Cardo,serif", fontWeight: 700, color: T.cream, marginBottom: 4 }}>{f.title}</div>
                                        <div style={{ fontSize: 13, color: "rgba(251,246,242,0.48)", fontFamily: "Plus Jakarta Sans", lineHeight: 1.65 }}>{f.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: "relative", minHeight: isMobile ? 300 : 420, borderRadius: 20, overflow: "hidden" }}>
                        <GlobeMap/>
                    </div>
                </div>
                <motion.div initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" as const }}
                    style={{ padding: isMobile ? "28px 24px" : "36px 48px", background: "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", borderLeft: `3px solid ${T.orange}` }}>
                    <p style={{ fontSize: isMobile ? 18 : 24, fontFamily: "Cardo,serif", fontStyle: "italic", color: T.cream, margin: 0, lineHeight: 1.55 }}>
                        "Your people travel everywhere. Miraee makes sure no one's ever alone out there."
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

// --- TRUSTED SECTORS ---------------------------------------------------------
const SECTOR_DATA = [
    { name: "Consulting & Professional Services", icon: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"] },
    { name: "Technology & SaaS", icon: ["M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"] },
    { name: "Financial Services", icon: ["M12 1v22","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"] },
    { name: "Healthcare & Pharma", icon: ["M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z","M12 8v8","M8 12h8"] },
    { name: "Event Management & MICE", icon: ["M17 2H7a2 2 0 0 0-2 2v16l7-3 7 3V4a2 2 0 0 0-2-2z"] },
    { name: "Manufacturing", icon: ["M2 20h20","M4 20V10l4-4 4 4 4-6 4 6v10","M10 20v-5h4v5"] },
    { name: "Logistics & Supply Chain", icon: ["M1 3h15v13H1z","M16 8h4l3 3v5h-7V8z","M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z","M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"] },
    { name: "Telecom", icon: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"] },
]

function TrustedSectors() {
    const w = useWindowWidth()
    const isMobile = w < 768
    const cols = isMobile ? 2 : w < 1024 ? 3 : 4

    return (
        <section id="demo" style={{ padding: isMobile ? "80px 24px 96px" : "110px 80px 130px", background: "#0F0407", position: "relative", overflow: "hidden" }}>
            {/* Background glow */}
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(229,86,2,0.04) 0%, transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: isMobile ? 48 : 64 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: T.orange, fontFamily: "Plus Jakarta Sans" }}>Trusted Across</span>
                    <h2 style={{ fontSize: isMobile ? 28 : 44, fontFamily: "Cardo,serif", color: T.cream, margin: "14px 0 0", letterSpacing: "-0.025em", fontWeight: 700, lineHeight: 1.1 }}>
                        Travel-heavy sectors.
                    </h2>
                </motion.div>

                {/* Card grid */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: isMobile ? 12 : 16 }}>
                    {SECTOR_DATA.map((sector, i) => (
                        <motion.div key={sector.name}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: (i % cols) * 0.07 }}
                            whileHover={{ y: -4, borderColor: "rgba(229,86,2,0.5)" }}
                            style={{
                                padding: isMobile ? "20px 16px" : "28px 24px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 16,
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                cursor: "default",
                                transition: "border-color 0.25s",
                            }}>
                            {/* Icon box */}
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(229,86,2,0.12)", border: "1px solid rgba(229,86,2,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {sector.icon.map((d, di) => <path key={di} d={d}/>)}
                                </svg>
                            </div>
                            {/* Name */}
                            <span style={{ fontSize: isMobile ? 12 : 14, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: T.cream, lineHeight: 1.4, letterSpacing: "0.01em" }}>
                                {sector.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ textAlign: "center", marginTop: isMobile ? 40 : 56, fontSize: 13, color: "rgba(251,246,242,0.3)", fontFamily: "Plus Jakarta Sans" }}>
                    Any industry where employees travel. Miraee handles the rest.
                </motion.p>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function MiraeeSolutionsPage(_props: any) {

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
        <div style={{ position: "relative", width: "100%", maxWidth: "100vw", overflowX: "clip", background: "var(--page-bg)", fontFamily: "Plus Jakarta Sans, sans-serif", cursor: "none" }}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
            <SmoothScrollStyle/>
            <ScrollBar/>
            <TechNav/>
            <SolutionsHero/>
            <ByRole/>
            <BySize/>
            <ByUseCase/>
            <DutyOfCare/>
            <TrustedSectors/>
            <TechFooter/>
        </div>
    )
}
