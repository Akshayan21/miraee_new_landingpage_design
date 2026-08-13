import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { EO } from "./easings"

// Fades the inner content of a section in on first view without changing its
// layout height (so no whitespace gaps appear between sections while scrolling).
export function SectionWrapper({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-10% 0px" })
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], [42, -24])
    const lineScale = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
    return (
        <motion.div ref={ref}
            className="cinematic-section"
            initial={{ opacity: 0, y: 28, clipPath: "inset(5% 0 0 0 round 2rem)" }}
            animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 0rem)" } : {}}
            transition={{ duration: 1.05, ease: EO }}
            style={{ ...style, position: "relative" }}>
            <motion.div className="cinematic-section__rail" style={{ scaleX: lineScale }} />
            <motion.div style={{ y }}>{children}</motion.div>
        </motion.div>
    )
}
