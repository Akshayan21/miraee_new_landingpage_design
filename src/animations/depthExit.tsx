import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Sections recede into depth as the next takes over: scale down, dim, corners round.
export function DepthExit({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["end 85%", "end 15%"] })
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
    const radius = useTransform(scrollYProgress, [0, 1], [0, 28])
    return (
        <motion.div ref={ref} style={{ scale, opacity, borderRadius: radius, overflow: "hidden", transformOrigin: "center top", willChange: "transform" }}>
            {children}
        </motion.div>
    )
}
