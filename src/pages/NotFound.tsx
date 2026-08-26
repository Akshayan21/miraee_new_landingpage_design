import { Link } from "react-router-dom"
import { V2Nav } from "../components/V2Kit"
import { SiteFooter } from "../components/LegalFormKit"
import { usePageMeta } from "../hooks/usePageMeta"
import "./HomeV2Light.css"
import "./SubpagesV2.css"

export default function NotFound() {
    usePageMeta("Page not found — Miraee", "The Miraee page you requested could not be found.")
    return (
        <div className="m-site">
            <a className="m-skip" href="#main">Skip to content</a>
            <V2Nav />
            <main id="main" className="m-not-found">
                <p className="m-eyebrow">404 · LOST, NOT STRANDED</p>
                <h1>This page missed its connection.</h1>
                <p>The address may have changed, but your next step is simple.</p>
                <div className="m-not-found__actions">
                    <Link className="m-btn m-btn--primary" to="/v2">Return home</Link>
                    <Link className="m-btn m-btn--secondary" to="/product">Explore the platform</Link>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
