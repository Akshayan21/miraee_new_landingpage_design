import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { EO } from "../animations/easings"
import ThemeToggle from "./ThemeToggle"
import { useWindowWidth } from "../hooks/useWindowSize"

export const useVW = useWindowWidth

// Shared chrome + form primitives for the legal form pages
// (arbitration opt-out, informal dispute notice). Mirrors the Support page.
export const T = {
    bg: "var(--page-bg)", ink: "var(--text)", maroon: "#450E14", orange: "#E55602",
    accent: "var(--accent-strong)",
    muted: "rgba(var(--text-rgb),0.42)", border: "rgba(var(--text-rgb),0.10)", card: "var(--surface)", cream: "#FBF6F2",
}
export const F = "\"Plus Jakarta Sans\", system-ui, sans-serif"

export function MiraeeLogo({ fill = T.orange, height = 26 }: { fill?: string; height?: number }) {
    const w = height * (338 / 84)
    return (
        <svg width={w} height={height} viewBox="0 0 338 84" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", height: "auto", display: "block" }}>
            <path d="M113.255 83.0098C112.156 83.0098 111.078 82.8081 110.021 82.4154C102.147 79.4749 101.207 66.7045 102.95 55.7387C103.807 50.3886 105.846 37.5439 105.413 31.7797C104.25 32.82 102.496 34.6352 100.033 37.788C93.6499 45.9513 86.2095 53.8917 79.3504 50.8344C74.0977 48.4884 72.5229 40.9514 74.679 28.4464L74.7001 28.3084C76.9407 15.2833 76.3805 11.0159 75.683 9.63587C74.2456 9.9331 68.1792 12.3216 52.4106 31.1746C50.6033 33.3402 48.9651 35.4102 47.4749 37.374C52.1041 40.8134 53.2244 47.1933 50.8147 56.3332C47.3481 69.4751 40.8272 78.1692 33.8095 79.0078C30.1844 79.443 26.9398 77.7127 25.1537 74.3795C22.4375 69.3265 22.9765 59.9955 30.0259 46.8005C23.0188 49.4862 13.9825 54.295 5.36894 60.2185L0 52.3312C6.29899 48.0001 24.1391 36.4823 37.2761 35.2085C39.5589 31.9814 42.1694 28.5951 45.1498 25.0389C62.3769 4.40245 72.4172 -2.60374 79.7837 0.835664C88.3972 4.85892 85.6916 20.5485 84.0746 29.922L84.0535 30.06C83.0811 35.7074 83.1763 39.444 83.5039 41.323C84.9518 40.3676 87.7948 37.9579 92.5402 31.8858C97.962 24.954 103.785 18.8819 109.704 21.4827C116.965 24.6673 115.548 37.1193 112.336 57.2461C110.962 65.8871 112.166 72.0016 113.318 73.371C114.291 73.1056 118.878 71.0674 128.231 55.8661L135.872 43.4567L143.968 48.4778L136.327 60.8872C127.047 75.9718 119.765 83.0098 113.255 83.0098ZM42.0003 45.2188C38.2061 51.1741 36.0712 55.8343 34.8875 59.1675C32.89 64.7619 33.0169 67.9571 33.3233 69.2522C35.1306 68.2119 38.9988 63.8702 41.6304 53.8704C43.0466 48.5096 42.6027 46.015 42.0003 45.2188Z" fill={fill}/>
            <path d="M134.191 18.6482C134.191 15.1132 136.855 12.5337 140.659 12.5337C144.464 12.5337 147.128 15.1132 147.128 18.6482C147.128 22.1831 144.559 24.7627 140.659 24.7627C136.76 24.7627 134.191 22.1831 134.191 18.6482ZM135.713 30.9727H145.511V82.5638H135.713V30.9727Z" fill={fill}/>
            <path d="M152.75 30.9725H162.547C162.547 34.3164 162.547 36.3227 162.452 39.571H162.547C165.496 33.8387 170.537 30.877 176.625 30.877C177.481 30.877 178.432 30.877 179.383 30.9725V39.9532H175.864C167.113 39.9532 162.547 46.6409 162.547 54.7617V82.5635H152.75V30.9725Z" fill={fill}/>
            <path d="M179.31 56.9592C179.31 41.4819 189.392 29.8262 202.899 29.8262C210.794 29.8262 216.882 33.0745 220.306 39.3801H220.496C220.401 36.4184 220.401 34.5076 220.401 30.9726H230.198V82.5637H220.401C220.401 79.0288 220.401 77.6912 220.496 74.3473H220.306C216.691 80.2708 210.128 83.9012 202.899 83.9012C189.107 83.9012 179.31 72.5321 179.31 56.9592ZM220.781 56.8637C220.781 46.2589 214.408 38.8068 204.801 38.8068C195.194 38.8068 189.107 46.7366 189.107 56.9592C189.107 67.1819 195.385 74.9206 204.801 74.9206C214.218 74.9206 220.781 67.6596 220.781 56.8637Z" fill={fill}/>
            <path d="M235.388 56.864C235.388 41.1001 245.756 29.4443 261.07 29.4443C276.384 29.4443 285.23 39.667 285.23 55.3354C285.23 56.7685 285.135 58.0105 284.945 59.4436H244.9C245.946 68.6153 252.129 75.2075 261.355 75.2075C267.823 75.2075 272.865 72.0547 275.813 66.1313L283.993 70.2395C279.428 79.5068 271.152 83.9971 260.975 83.9971C245.661 83.9971 235.388 72.5324 235.388 56.864ZM276.099 51.6094C274.957 43.4886 269.821 38.2339 261.07 38.2339C252.794 38.2339 247.087 43.7752 245.28 51.6094H276.099Z" fill={fill}/>
            <path d="M288.157 56.864C288.157 41.1001 298.525 29.4443 313.839 29.4443C329.153 29.4443 338 39.667 338 55.3354C338 56.7685 337.904 58.0105 337.714 59.4436H297.669C298.715 68.6153 304.898 75.2075 314.125 75.2075C320.593 75.2075 325.634 72.0547 328.583 66.1313L336.763 70.2395C332.197 79.5068 323.922 83.9971 313.744 83.9971C298.43 83.9971 288.157 72.5324 288.157 56.864ZM328.858 51.6094C327.716 43.4886 322.58 38.2339 313.829 38.2339C305.553 38.2339 299.846 43.7752 298.039 51.6094H328.858Z" fill={fill}/>
        </svg>
    )
}

export function SiteNav() {
    const vw = useWindowWidth()
    const isMobile = vw < 640
    return (
        <motion.nav
            initial={{ y: -28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EO }}
            style={{ position: "fixed", top: 14, left: "50%", x: "-50%", zIndex: 200, width: "min(1080px, calc(100vw - 24px))", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 10px 0 18px" : "0 10px 0 26px", borderRadius: 100, background: "var(--glass-bg)", backdropFilter: "blur(18px)", border: "1px solid rgba(var(--text-rgb),0.08)", boxShadow: "0 10px 34px rgba(var(--text-rgb),0.08)" }}>
            <a href="https://app.miraee.ai" style={{ textDecoration: "none", display: "inline-flex" }}><MiraeeLogo fill={T.orange} height={24} /></a>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16 }}>
                <ThemeToggle size={isMobile ? 32 : 34} />
                {!isMobile && <a href="https://app.miraee.ai"
                    onMouseEnter={e => (e.currentTarget.style.color = T.ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                    onFocus={e => (e.currentTarget.style.color = T.ink)}
                    onBlur={e => (e.currentTarget.style.color = T.muted)}
                    style={{ fontSize: 13.5, fontFamily: F, fontWeight: 600, color: T.muted, textDecoration: "none", transition: "color 0.25s ease" }}>Sign in</a>}
                <motion.a href="/book-a-demo" whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(229,86,2,0.28)" }} whileTap={{ scale: 0.96 }}
                    style={{ display: "inline-flex", alignItems: "center", background: T.accent, color: T.cream, borderRadius: 100, padding: isMobile ? "10px 18px" : "11px 22px", fontSize: 13, fontFamily: F, fontWeight: 700, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}>
                    Book a demo
                </motion.a>
            </div>
        </motion.nav>
    )
}

export function SiteFooter() {
    const vw = useWindowWidth()
    const isMobile = vw < 640
    const footRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: footRef, offset: ["start end", "end end"] })
    const wmY = useTransform(scrollYProgress, [0, 1], [160, 0])
    const wmOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.06])
    const COLS = [
        { title: "Company", links: ["About Tabhi", "Careers", "Newsroom", "Support"] },
        { title: "Partners", links: ["For airlines", "For suppliers", "Distribution"] },
        { title: "Legal", links: ["Terms & Conditions", "Privacy", "Security"] },
    ]
    const LINK_HREFS: Record<string, string> = {
        "About Tabhi": "https://www.tabhi.com/",
        "Support": "/support",
        "Terms & Conditions": "/terms",
        "Privacy": "/privacy",
    }
    return (
        <footer ref={footRef} style={{ background: "#0F0407", padding: isMobile ? "60px 20px 40px" : "80px 64px 48px", position: "relative", overflow: "hidden" }}>
            <motion.div style={{ y: wmY, opacity: wmOpacity, position: "absolute", bottom: isMobile ? -20 : -50, left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                <MiraeeLogo fill={T.cream} height={isMobile ? 120 : 260} />
            </motion.div>
            <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 48 : 80, marginBottom: 64 }}>
                    <div style={{ flex: "0 0 auto", maxWidth: 280 }}>
                        <MiraeeLogo fill={T.orange} height={28} />
                        <p style={{ fontSize: 14, fontFamily: F, lineHeight: 1.65, color: "rgba(251,246,242,0.45)", marginTop: 20, marginBottom: 0 }}>The AI-native employee travel platform. A Tabhi company.</p>
                    </div>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 32 }}>
                        {COLS.map(col => (
                            <div key={col.title}>
                                <p style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(251,246,242,0.35)", margin: "0 0 16px" }}>{col.title}</p>
                                {col.links.map(link => (
                                    <a key={link} href={LINK_HREFS[link] || "#"}
                                        target={(LINK_HREFS[link] || "").indexOf("http") === 0 ? "_blank" : undefined}
                                        rel={(LINK_HREFS[link] || "").indexOf("http") === 0 ? "noopener noreferrer" : undefined}
                                        style={{ display: "block", fontSize: 14, fontFamily: F, fontWeight: 500, color: "rgba(251,246,242,0.55)", textDecoration: "none", marginBottom: 10 }}>{link}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(251,246,242,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: 13, fontFamily: F, color: "rgba(251,246,242,0.28)", margin: 0 }}>
                        © 2026 Miraee, a Tabhi company. <a href="/privacy" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Privacy</a> · <a href="/terms" style={{ color: "rgba(251,246,242,0.5)", textDecoration: "none", fontWeight: 600 }}>Terms</a> · Security
                    </p>
                    <p style={{ fontSize: 13, fontFamily: F, color: "rgba(251,246,242,0.28)", margin: 0 }}>Built by Tabhi AI</p>
                </div>
            </div>
        </footer>
    )
}

// ─── Form primitives (mirror the Support form) ───────────────────────────────
export const inputBase: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", background: T.card, border: "1.5px solid " + T.border,
    borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: F, color: T.ink, outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
}
export const labelStyle: React.CSSProperties = { fontSize: 13, fontFamily: F, fontWeight: 600, color: T.ink, marginBottom: 7, display: "block" }

export function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <label style={labelStyle}>{label}{required ? <span style={{ color: T.orange }}> *</span> : null}</label>
            <div style={{ marginTop: "auto" }}>
                {children}
                {hint ? <p style={{ fontSize: 12, fontFamily: F, color: T.muted, margin: "7px 0 0", lineHeight: 1.5 }}>{hint}</p> : null}
            </div>
        </div>
    )
}

export function TextInput({ placeholder, type = "text", required, name, defaultValue, readOnly }: { placeholder?: string; type?: string; required?: boolean; name?: string; defaultValue?: string; readOnly?: boolean }) {
    const [focus, setFocus] = useState(false)
    return (
        <input type={type} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue} readOnly={readOnly}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...inputBase, borderColor: focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none", opacity: readOnly ? 0.75 : 1 }} />
    )
}

export function TextArea({ placeholder, required, rows = 4, name }: { placeholder?: string; required?: boolean; rows?: number; name?: string }) {
    const [focus, setFocus] = useState(false)
    return (
        <textarea placeholder={placeholder} name={name} required={required} rows={rows} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{ ...inputBase, resize: "vertical", minHeight: 96, borderColor: focus ? T.orange : T.border, boxShadow: focus ? "0 0 0 3px rgba(229,86,2,0.12)" : "none" }} />
    )
}

export function RadioGroup({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {options.map(o => (
                <label key={o} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", border: "1.5px solid " + (value === o ? T.orange : T.border), borderRadius: 12, padding: "12px 14px", background: value === o ? "rgba(229,86,2,0.06)" : T.card, transition: "border-color 0.2s ease, background 0.2s ease" }}>
                    <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} required
                        style={{ marginTop: 2.5, accentColor: T.orange, width: 15, height: 15, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.5, color: T.ink }}>{o}</span>
                </label>
            ))}
        </div>
    )
}

export function SectionHead({ title }: { title: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0 2px" }}>
            <span style={{ fontSize: 11, fontFamily: F, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" as const, color: T.orange, whiteSpace: "nowrap" }}>{title}</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
    )
}

export function BulletList({ items }: { items: string[] }) {
    return (
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((it, i) => <li key={i} style={{ fontSize: 13.5, fontFamily: F, lineHeight: 1.55, color: T.muted }}>{it}</li>)}
        </ul>
    )
}

export function SuccessScreen({ title, body, onReset, resetLabel }: { title: string; body: string; onReset: () => void; resetLabel: string }) {
    return (
        <motion.div key="done" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EO }}
            style={{ textAlign: "center", padding: "80px 24px" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                style={{ width: 64, height: 64, borderRadius: "50%", background: "#3BA55D", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </motion.div>
            <h2 style={{ fontFamily: F, fontSize: 26, fontWeight: 800, color: T.ink, margin: "0 0 10px" }}>{title}</h2>
            <p style={{ fontSize: 15, fontFamily: F, lineHeight: 1.65, color: T.muted, margin: "0 0 28px" }}>{body}</p>
            <button onClick={onReset} style={{ background: "transparent", border: "1.5px solid " + T.border, borderRadius: 12, padding: "12px 24px", fontSize: 14, fontFamily: F, fontWeight: 600, color: T.ink, cursor: "pointer" }}>{resetLabel}</button>
        </motion.div>
    )
}

export function MediaColumn({ isNarrow, imageSrc, imageAlt, quote, chips, badgeLabel, badgeSub }: {
    isNarrow: boolean; imageSrc: string; imageAlt: string; quote: React.ReactNode;
    chips: string[]; badgeLabel?: string; badgeSub?: string
}) {
    const mediaRef = useRef<HTMLDivElement>(null)
    const mediaInView = useInView(mediaRef, { once: true, margin: "-8% 0px" })
    const [imgHov, setImgHov] = useState(false)
    return (
        <div style={{ flex: 1, minWidth: 0, position: isNarrow ? "relative" : "sticky", top: isNarrow ? undefined : 92, alignSelf: "flex-start" }}>
            <div ref={mediaRef} style={{ position: "relative", height: isNarrow ? 420 : "calc(100vh - 124px)", minHeight: 420 }}>
                <motion.div initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={mediaInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}} transition={{ duration: 1.1, ease: EO }}
                    onMouseEnter={() => setImgHov(true)} onMouseLeave={() => setImgHov(false)}
                    style={{ position: "absolute", inset: 0, borderRadius: isNarrow ? "22px 22px 22px 48px" : "40px 40px 40px 120px", overflow: "hidden", willChange: "clip-path" }}>
                    <motion.img src={imageSrc} alt={imageAlt}
                        initial={{ scale: 1.18 }} animate={mediaInView ? { scale: imgHov ? 1.05 : 1 } : {}} transition={{ duration: 1.1, ease: EO }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 45%, transparent 65%)" }} />
                    {badgeLabel && (
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7, ease: EO }}
                            style={{ position: "absolute", top: 28, left: 28, display: "flex", alignItems: "center", gap: 9, background: "rgba(0,0,0,0.52)", backdropFilter: "blur(10px)", borderRadius: 100, padding: "9px 16px" }}>
                            <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: "#3BA55D" }} />
                            <span style={{ fontSize: 12.5, fontFamily: F, fontWeight: 700, color: "#fff" }}>{badgeLabel}</span>
                            {badgeSub && <span style={{ fontSize: 12.5, fontFamily: F, color: "rgba(255,255,255,0.65)" }}>{badgeSub}</span>}
                        </motion.div>
                    )}
                    <div style={{ position: "absolute", left: isNarrow ? 24 : 40, right: isNarrow ? 24 : 40, bottom: isNarrow ? 24 : 36 }}>
                        <motion.p initial={{ opacity: 0, y: 22 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: EO }}
                            style={{ fontFamily: F, fontStyle: "italic", fontWeight: 500, fontSize: isNarrow ? 22 : "clamp(1.6rem,2.4vw,2.3rem)", lineHeight: 1.3, color: "#fff", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
                            {quote}
                        </motion.p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {chips.map((chip, i) => (
                                <motion.div key={chip} initial={{ opacity: 0, y: 14 }} animate={mediaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.75 + i * 0.12, ease: EO }}
                                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(10px)", borderRadius: 12, padding: "10px 16px", fontSize: 12.5, fontFamily: F, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                                    {chip}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export const TICKET_ENDPOINT = import.meta.env.VITE_TICKET_ENDPOINT as string
