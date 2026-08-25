import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import SiteAtmosphere from "./components/SiteAtmosphere"
import { MiraeeLogo } from "./components/LegalFormKit"

// Home is routed at "/". Product/Technology/Solutions source files are kept in
// src/pages/ (unrouted, not deleted) in case they're needed again.
const Home = lazy(() => import("./pages/HomeElegant"))
const HomeV2 = lazy(() => import("./pages/HomeV2"))
const ProductV2 = lazy(() => import("./pages/ProductV2"))
const ForTeamsV2 = lazy(() => import("./pages/ForTeamsV2"))
const SecurityV2 = lazy(() => import("./pages/SecurityV2"))
const AboutV2 = lazy(() => import("./pages/AboutV2"))
const WhyMiraeeV2 = lazy(() => import("./pages/WhyMiraeeV2"))
const Support = lazy(() => import("./pages/Support"))
const Terms = lazy(() => import("./pages/Terms"))
const Privacy = lazy(() => import("./pages/Privacy"))
const ArbitrationOptOut = lazy(() => import("./pages/ArbitrationOptOut"))
const DisputeNotice = lazy(() => import("./pages/DisputeNotice"))
const BookDemo = lazy(() => import("./pages/BookDemo"))

const APP_URL = "https://app.miraee.ai"

// Root path and any route not explicitly listed below bounce out to the web app.
function RedirectToApp() {
    useEffect(() => {
        window.location.replace(APP_URL)
    }, [])
    return null
}

function PageFallback() {
    return (
        <div className="page-preloader min-h-screen flex flex-col gap-5 items-center justify-center bg-page" aria-label="Loading Miraee">
            <MiraeeLogo fill="#E55602" height={38} />
            <div className="page-preloader__line" aria-hidden="true"><span /></div>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <SiteAtmosphere />
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/v2" element={<HomeV2 />} />
                    <Route path="/product" element={<ProductV2 />} />
                    <Route path="/for-teams" element={<ForTeamsV2 />} />
                    <Route path="/security" element={<SecurityV2 />} />
                    <Route path="/about" element={<AboutV2 />} />
                    <Route path="/why-miraee" element={<WhyMiraeeV2 />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/arbitration-opt-out" element={<ArbitrationOptOut />} />
                    <Route path="/dispute-notice" element={<DisputeNotice />} />
                    <Route path="/book-a-demo" element={<BookDemo />} />
                    <Route path="*" element={<RedirectToApp />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
