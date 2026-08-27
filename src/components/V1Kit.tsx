import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MiraeeLogo } from "./LegalFormKit"
import ThemeToggle from "./ThemeToggle"
import { useWindowWidth } from "../hooks/useWindowSize"

// Shared nav for the "V1" design system (Product/Technology/Solutions and
// their siblings). Mirrors the shape of V2Kit's V2Nav so both site versions
// share the same 5-item nav / footer-for-the-rest information architecture.
// V1's heroes now open on a light background, so this nav reads dark ink on
// light throughout (no more cream-on-transparent, which was unreadable once
// the heroes stopped being dark).

const T = { orange: "#E55602", cream: "#FBF6F2", maroon: "#450E14", ink: "var(--text)" }

const V1_NAV_LINKS: [string, string][] = [
    ["Home", "/"],
    ["Product", "/v1/product"],
    ["Solutions", "/v1/solutions"],
    ["AI & Technology", "/v1/technology"],
    ["About", "/v1/about"],
]

export function V1Nav({ active }: { active?: string }) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [hovered, setHovered] = useState<string | null>(null)
    const w = useWindowWidth()
    const isMobile = w < 900

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 32)
        fn()
        window.addEventListener("scroll", fn, { passive: true })
        return () => window.removeEventListener("scroll", fn)
    }, [])

    useEffect(() => {
        if (!isMobile) setMenuOpen(false)
    }, [isMobile])

    return (
        <>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
                height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: isMobile ? "0 20px" : "0 64px",
                background: scrolled ? "rgba(251,246,242,0.85)" : "rgba(251,246,242,0)",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(var(--text-rgb),0.08)" : "1px solid transparent",
                transition: "all 0.4s ease", boxSizing: "border-box",
            }}>
                <Link to="/" aria-label="Miraee home" style={{ textDecoration: "none", display: "inline-flex" }}>
                    <MiraeeLogo fill={T.orange} height={24} />
                </Link>
                {!isMobile && (
                    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                        {V1_NAV_LINKS.map(([label, href]) => (
                            <Link key={href} to={href} onMouseEnter={() => setHovered(href)} onMouseLeave={() => setHovered(null)}
                                style={{ position: "relative", textDecoration: "none", paddingBottom: 4 }}>
                                <span style={{ fontSize: 14, fontFamily: "Plus Jakarta Sans", fontWeight: 500, color: active === href ? T.ink : "rgba(var(--text-rgb),0.6)", transition: "color .2s" }}>{label}</span>
                                {(hovered === href || active === href) && (
                                    <motion.div layoutId="v1-nav-underline" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5, background: T.orange, borderRadius: 2 }} transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                                )}
                            </Link>
                        ))}
                    </div>
                )}
                <div style={{ display: "flex", gap: isMobile ? 8 : 16, alignItems: "center" }}>
                    {!isMobile && <ThemeToggle size={30} />}
                    {!isMobile && (
                        <div style={{ display: "flex", alignItems: "center", padding: 3, border: "1px solid rgba(var(--text-rgb),0.14)", borderRadius: 100 }} aria-label="Choose site version">
                            <Link to="/" style={{ padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: "Plus Jakarta Sans", textDecoration: "none", color: T.cream, background: T.maroon }}>v1</Link>
                            <Link to="/v2" style={{ padding: "5px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: "Plus Jakarta Sans", textDecoration: "none", color: "rgba(var(--text-rgb),0.55)" }}>v2</Link>
                        </div>
                    )}
                    {!isMobile && <a href="https://app.miraee.ai" style={{ fontSize: 13.5, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: "rgba(var(--text-rgb),0.55)", textDecoration: "none" }}>Sign in</a>}
                    <Link to="/book-a-demo" style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 20px", background: T.orange, color: T.cream, borderRadius: 100, fontSize: 13, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none" }}>
                        Book a demo
                    </Link>
                    {isMobile && (
                        <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
                            <div style={{ width: 20, height: 1.5, background: T.ink, marginBottom: 5, transition: "transform .3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
                            <div style={{ width: 20, height: 1.5, background: T.ink, marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "opacity .3s" }} />
                            <div style={{ width: 20, height: 1.5, background: T.ink, transition: "transform .3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
                        </button>
                    )}
                </div>
            </nav>
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
                        style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 199, background: "rgba(251,246,242,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(var(--text-rgb),0.08)", padding: "20px 20px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
                        {V1_NAV_LINKS.map(([label, href]) => (
                            <Link key={href} to={href} onClick={() => setMenuOpen(false)} aria-current={active === href ? "page" : undefined}
                                style={{ fontSize: 18, fontFamily: "Plus Jakarta Sans", fontWeight: 500, color: T.ink, textDecoration: "none", opacity: active === href ? 1 : 0.72 }}>{label}</Link>
                        ))}
                        <a href="https://app.miraee.ai" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 600, color: "rgba(var(--text-rgb),0.55)", textDecoration: "none" }}>Sign in</a>
                        <Link to="/book-a-demo" onClick={() => setMenuOpen(false)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 44, background: T.orange, color: T.cream, borderRadius: 10, fontSize: 15, fontFamily: "Plus Jakarta Sans", fontWeight: 700, textDecoration: "none", marginTop: 4 }}>Book a demo</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
