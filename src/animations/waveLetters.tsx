import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EO } from "./easings"

// Per-letter masked entrance — each character rises up from below the baseline.
export function WaveLetters({ text, delay = 0 }: { text: string; delay?: number; hoverColor?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: "-6% 0px" })
    return (
        <span ref={ref} style={{ display: "inline-block" }}>
            {text.split("").map((ch, i) => (
                ch === " " ? <span key={i} style={{ display: "inline-block", width: "0.26em" }} /> : (
                    <motion.span key={i}
                        initial={{ y: "115%", opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: delay + i * 0.024, ease: EO }}
                        style={{ display: "inline-block", cursor: "default", willChange: "transform" }}>
                        {ch}
                    </motion.span>
                )
            ))}
        </span>
    )
}
