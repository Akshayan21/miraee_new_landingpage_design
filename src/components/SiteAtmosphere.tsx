import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { MiraeeLogo } from "./LegalFormKit"

function RoutePreloader() {
    const [dismissed, setDismissed] = useState(false)
    const [released, setReleased] = useState(false)

    useEffect(() => {
        if (released) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const dismiss = () => { if (!dismissed) setDismissed(true) }
        const onWheel = (event: WheelEvent) => { event.preventDefault(); event.stopImmediatePropagation(); dismiss() }
        const onTouchMove = (event: TouchEvent) => { event.preventDefault(); dismiss() }
        const onKeyDown = (event: KeyboardEvent) => {
            if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
                event.preventDefault()
                dismiss()
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false })
        window.addEventListener("touchmove", onTouchMove, { passive: false })
        window.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("touchmove", onTouchMove)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [dismissed, released])

    useEffect(() => {
        if (!dismissed) return
        // Keep consuming the remainder of a wheel/trackpad gesture while the
        // panel exits, then release after its momentum has dissipated.
        const releaseTimer = window.setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            setReleased(true)
        }, 1200)
        return () => window.clearTimeout(releaseTimer)
    }, [dismissed])

    return (
        <motion.div
            className="route-wipe"
            initial={{ y: "0%" }}
            animate={{ y: dismissed ? "-100%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
        >
            <motion.div className="route-wipe__mark" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
                <MiraeeLogo fill="#FBF6F2" height={34} />
                <span>Scroll to enter</span>
            </motion.div>
        </motion.div>
    )
}

export default function SiteAtmosphere() {
    const pointerX = useMotionValue(-400)
    const pointerY = useMotionValue(-400)
    const x = useSpring(pointerX, { stiffness: 45, damping: 18, mass: 0.8 })
    const y = useSpring(pointerY, { stiffness: 45, damping: 18, mass: 0.8 })

    useEffect(() => {
        const move = (event: PointerEvent) => {
            pointerX.set(event.clientX - 220)
            pointerY.set(event.clientY - 220)
        }
        window.addEventListener("pointermove", move, { passive: true })
        return () => window.removeEventListener("pointermove", move)
    }, [pointerX, pointerY])

    return (
        <>
            <div className="site-atmosphere" aria-hidden="true">
                <div className="site-atmosphere__orb site-atmosphere__orb--one" />
                <div className="site-atmosphere__orb site-atmosphere__orb--two" />
                <motion.div className="site-atmosphere__cursor" style={{ x, y }} />
            </div>
            <RoutePreloader />
        </>
    )
}
