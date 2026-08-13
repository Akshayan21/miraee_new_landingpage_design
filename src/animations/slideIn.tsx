import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EO } from "./easings"

// Slides children in from a given direction as they enter the viewport.
export function SlideIn({ children, from = "left", delay = 0, distance = 60, style }: { children: React.ReactNode; from?: "left" | "right" | "bottom"; delay?: number; distance?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-5% 0px" })
    const x = from === "left" ? -distance : from === "right" ? distance : 0
    const y = from === "bottom" ? distance : 0
    return (
        <motion.div ref={ref} style={style}
            initial={{ x, y, opacity: 0 }}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.85, delay, ease: EO }}>
            {children}
        </motion.div>
    )
}
