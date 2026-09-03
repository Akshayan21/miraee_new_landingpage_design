import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import SiteAtmosphere from "./components/SiteAtmosphere"
import { MiraeeLogo } from "./components/LegalFormKit"
import "./pages/V11AlternatingSections.css"

// Home is routed at "/". Product/Technology/Solutions source files are kept in
// src/pages/ (unrouted, not deleted) in case they're needed again.
const Home = lazy(() => import("./pages/HomeElegant"))
const HomeV11 = lazy(() => import("./pages/HomeV11"))
const HomeV2 = lazy(() => import("./pages/HomeV2"))
const HomeV3 = lazy(() => import("./pages/HomeV3"))
const ProductV3 = lazy(() => import("./pages/ProductV3"))
const SavingsV3 = lazy(() => import("./pages/SavingsV3"))
const HrV3 = lazy(() => import("./pages/HrV3"))
const EnterpriseV3 = lazy(() => import("./pages/EnterpriseV3"))
const DemoV3 = lazy(() => import("./pages/DemoV3"))
const V1Product = lazy(() => import("./pages/Product"))
const V1ForTeams = lazy(() => import("./pages/ForTeams"))
const V1Technology = lazy(() => import("./pages/Technology"))
const V1Solutions = lazy(() => import("./pages/Solutions"))
const V1Security = lazy(() => import("./pages/Security"))
const V1About = lazy(() => import("./pages/About"))
const V1WhyMiraee = lazy(() => import("./pages/WhyMiraee"))
const V1Resources = lazy(() => import("./pages/Resources"))
const ProductV2 = lazy(() => import("./pages/ProductV2"))
const ForTeamsV2 = lazy(() => import("./pages/ForTeamsV2"))
const ResourcesV2 = lazy(() => import("./pages/ResourcesV2"))
const TechnologyV2 = lazy(() => import("./pages/TechnologyV2"))
const SecurityV2 = lazy(() => import("./pages/SecurityV2"))
const AboutV2 = lazy(() => import("./pages/AboutV2"))
const WhyMiraeeV2 = lazy(() => import("./pages/WhyMiraeeV2"))
const Support = lazy(() => import("./pages/Support"))
const Terms = lazy(() => import("./pages/Terms"))
const Privacy = lazy(() => import("./pages/Privacy"))
const ArbitrationOptOut = lazy(() => import("./pages/ArbitrationOptOut"))
const DisputeNotice = lazy(() => import("./pages/DisputeNotice"))
const BookDemo = lazy(() => import("./pages/BookDemo"))
const NotFound = lazy(() => import("./pages/NotFound"))

// v4 — the current build. Pages live in ./pages/v4/ because it is the only
// version with a parent/child hierarchy (Resources hub + children).
const V4Home = lazy(() => import("./pages/v4/Home"))
const V4Platform = lazy(() => import("./pages/v4/Platform"))
const V4Solutions = lazy(() => import("./pages/v4/Solutions"))
const V4Technology = lazy(() => import("./pages/v4/Technology"))
const V4WhyMiraee = lazy(() => import("./pages/v4/WhyMiraee"))
const V4Company = lazy(() => import("./pages/v4/Company"))
const V4Resources = lazy(() => import("./pages/v4/Resources"))
const V4Calculator = lazy(() => import("./pages/v4/Calculator"))
const V4HelpCenter = lazy(() => import("./pages/v4/HelpCenter"))
const V4ResourcesGuides = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesGuides })))
const V4ResourcesBlog = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesBlog })))
const V4ResourcesNews = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesNews })))
const V4ResourcesLife = lazy(() => import("./pages/v4/ResourceStub").then(m => ({ default: m.V4ResourcesLife })))

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
                    <Route path="/v1.1" element={<HomeV11 />} />
                    <Route path="/v2" element={<HomeV2 />} />
                    <Route path="/v3" element={<HomeV3 />} />
                    <Route path="/v3/product" element={<ProductV3 />} />
                    <Route path="/v3/savings" element={<SavingsV3 />} />
                    <Route path="/v3/hr" element={<HrV3 />} />
                    <Route path="/v3/enterprise" element={<EnterpriseV3 />} />
                    <Route path="/v3/demo" element={<DemoV3 />} />
                    <Route path="/v4" element={<V4Home />} />
                    <Route path="/v4/platform" element={<V4Platform />} />
                    <Route path="/v4/solutions" element={<V4Solutions />} />
                    <Route path="/v4/technology" element={<V4Technology />} />
                    <Route path="/v4/why-miraee" element={<V4WhyMiraee />} />
                    <Route path="/v4/company" element={<V4Company />} />
                    <Route path="/v4/resources" element={<V4Resources />} />
                    <Route path="/v4/resources/guides" element={<V4ResourcesGuides />} />
                    <Route path="/v4/resources/life-at-miraee" element={<V4ResourcesLife />} />
                    <Route path="/v4/resources/blog" element={<V4ResourcesBlog />} />
                    <Route path="/v4/resources/news" element={<V4ResourcesNews />} />
                    <Route path="/v4/resources/calculator" element={<V4Calculator />} />
                    <Route path="/v4/resources/help-center" element={<V4HelpCenter />} />
                    <Route path="/v1/product" element={<V1Product />} />
                    <Route path="/v1/technology" element={<V1Technology />} />
                    <Route path="/v1/solutions" element={<V1Solutions />} />
                    <Route path="/v1/security" element={<V1Security />} />
                    <Route path="/v1/about" element={<V1About />} />
                    <Route path="/v1/why-miraee" element={<V1WhyMiraee />} />
                    <Route path="/v1/resources" element={<V1Resources />} />
                    <Route path="/v1.1/product" element={<div className="v11-route v11-alternating-route"><V1Product /></div>} />
                    <Route path="/v1.1/technology" element={<div className="v11-route v11-alternating-route"><V1Technology /></div>} />
                    <Route path="/v1.1/solutions" element={<div className="v11-route v11-alternating-route"><V1Solutions /></div>} />
                    <Route path="/v1.1/for-teams" element={<div className="v11-route v11-alternating-route"><V1ForTeams /></div>} />
                    <Route path="/v1.1/security" element={<div className="v11-route v11-alternating-route"><V1Security /></div>} />
                    <Route path="/v1.1/about" element={<div className="v11-route v11-alternating-route"><V1About /></div>} />
                    <Route path="/v1.1/why-miraee" element={<div className="v11-route v11-alternating-route"><V1WhyMiraee /></div>} />
                    <Route path="/v1.1/resources" element={<div className="v11-route v11-alternating-route"><V1Resources /></div>} />
                    <Route path="/product" element={<ProductV2 />} />
                    <Route path="/for-teams" element={<ForTeamsV2 />} />
                    <Route path="/resources" element={<ResourcesV2 />} />
                    <Route path="/technology" element={<TechnologyV2 />} />
                    <Route path="/security" element={<SecurityV2 />} />
                    <Route path="/about" element={<AboutV2 />} />
                    <Route path="/why-miraee" element={<WhyMiraeeV2 />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/arbitration-opt-out" element={<ArbitrationOptOut />} />
                    <Route path="/dispute-notice" element={<DisputeNotice />} />
                    <Route path="/book-a-demo" element={<BookDemo />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
