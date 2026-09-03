import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"
import { MiraeeLogo } from "./LegalFormKit"
import { V4_NAV_ITEMS } from "./V4NavData"
import { V4Nav } from "./V4MegaMenu"
import { usePageMeta } from "../hooks/usePageMeta"

// V4's shared chrome. Content primitives are re-exported from V2Kit rather than
// re-implemented — V4 extends V2's design system, so Reveal/Faq/EditorialRows/
// MiniTable must stay single-sourced. (V3Kit re-implemented Reveal with a
// different rise value; that drift is the thing this avoids.)
import { Reveal } from "./V2Kit"
export { Reveal, Faq, EditorialRows, MiniTable } from "./V2Kit"
export { V4Nav } from "./V4MegaMenu"

// Every V4 page is skip-link + nav + main + footer with the same page meta
// wiring, so the shell owns it and pages supply only their sections.
// Temporary perf isolation switch. Append ?perf=<name> to any V4 URL to disable
// one expensive effect at a time and find what actually costs frames:
//   ?perf=noatmos   the blurred orbs + pointer-tracked blend-mode glow
//   ?perf=noblur    the nav's backdrop-filter
//   ?perf=nosticky  the pinned full-viewport step panels
//   ?perf=notilt    the 3D tilt on the experience cards
//   ?perf=none      all of the above at once
// Remove this once the culprit is known.
function usePerfFlag() {
    const { search } = useLocation()
    useEffect(() => {
        const flag = new URLSearchParams(search).get("perf")
        const root = document.documentElement
        if (flag) root.dataset.perf = flag
        else delete root.dataset.perf
        return () => { delete root.dataset.perf }
    }, [search])
}

export function V4Page({ title, description, children }: { title: string; description: string; children: ReactNode }) {
    usePageMeta(title, description)
    usePerfFlag()
    return (
        // reducedMotion="user" makes every framer-motion animation beneath this
        // honour prefers-reduced-motion. The CSS-level override in index.css
        // cannot reach JS-driven motion values, so this is the only switch that
        // covers the V0 ports (marquee, kinetic band, pinned panels, tilt cards).
        <MotionConfig reducedMotion="user">
            <div className="v4-site">
                <a className="v4-skip" href="#main">Skip to content</a>
                <V4Nav />
                <main id="main">{children}</main>
                <V4Footer />
            </div>
        </MotionConfig>
    )
}

// A page hero. `lede` is the one-line promise under the headline.
export function V4Hero({ eyebrow, title, lede, actions }: { eyebrow?: string; title: ReactNode; lede?: string; actions?: ReactNode }) {
    return (
        <section className="v4-hero">
            <div className="v4-shell">
                <Reveal>
                    {eyebrow && <span className="v4-hero__eyebrow">{eyebrow}</span>}
                    <h1>{title}</h1>
                    {lede && <p className="v4-hero__lede">{lede}</p>}
                    {actions && <div className="v4-hero__actions">{actions}</div>}
                </Reveal>
            </div>
        </section>
    )
}

export function V4Cta({ title, body }: { title: string; body: string }) {
    return (
        <section className="v4-cta">
            <div className="v4-shell">
                <h2>{title}</h2>
                <p>{body}</p>
                <div className="v4-cta__actions">
                    <Link className="v4-btn v4-btn--solid" to="/book-a-demo">Book a demo</Link>
                    <Link className="v4-btn v4-btn--ghost" to="/v4/platform">Explore the platform</Link>
                </div>
            </div>
        </section>
    )
}

// The footer renders from the same nav model as the menu, so a link added to
// V4NavData appears in both places.
export function V4Footer() {
    return (
        <footer className="v4-foot">
            <div className="v4-foot__inner">
                <div className="v4-foot__brand">
                    <Link to="/v4" aria-label="Miraee home"><MiraeeLogo fill="#E55602" height={22} /></Link>
                    <p>One AI-native platform for employee travel. A Tabhi company.</p>
                    <Link to="/book-a-demo" className="v4-foot__cta">Book a demo</Link>
                </div>
                <div className="v4-foot__cols">
                    {V4_NAV_ITEMS.map(item => item.kind === "link" ? null : (
                        <div className="v4-foot__col" key={item.key}>
                            <h2>{item.label}</h2>
                            <ul>
                                {item.groups.flatMap(group => [
                                    ...(group.feature ? [group.feature] : []),
                                    ...group.items,
                                ]).map(leaf => (
                                    <li key={leaf.to}><Link to={leaf.to}>{leaf.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="v4-foot__col">
                        <h2>Company</h2>
                        <ul>
                            <li><Link to="/v4/company">About Miraee</Link></li>
                            <li><a href="https://www.tabhi.com/" target="_blank" rel="noopener noreferrer">Tabhi group ↗</a></li>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/terms">Terms</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="v4-foot__base">
                <p>© {new Date().getFullYear()} Miraee, a Tabhi company.</p>
                <p>Built by Tabhi AI</p>
            </div>
        </footer>
    )
}
