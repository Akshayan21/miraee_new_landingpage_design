import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

// Reset scroll to top on every route change (SPA nav) -- unless the link
// carries a hash (e.g. footer/nav deep links like /v4/platform#plan), in
// which case scroll to that section instead of stomping it back to top.
export default function ScrollToTop() {
    const { pathname, hash } = useLocation()
    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"

        const scrollToTarget = () => {
            if (hash) {
                const el = document.getElementById(hash.slice(1))
                if (el) {
                    el.scrollIntoView({ behavior: "auto", block: "start" })
                    return
                }
            }
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
        }

        scrollToTarget()

        // Lazy routes replace a viewport-height fallback after this component mounts.
        // Reassert the target after that layout swap so browser restoration/anchoring
        // cannot move the newly rendered hero (or the hash target).
        let secondFrame = 0
        const firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(scrollToTarget)
        })
        return () => {
            window.cancelAnimationFrame(firstFrame)
            window.cancelAnimationFrame(secondFrame)
        }
    }, [pathname, hash])
    return null
}
