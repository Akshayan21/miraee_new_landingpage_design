import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// 3D perspective tilt with a light glare that follows the pointer
export function TiltCard({ children, max = 7, style }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    const rx = useMotionValue(0)
    const ry = useMotionValue(0)
    const srx = useSpring(rx, { stiffness: 220, damping: 18 })
    const sry = useSpring(ry, { stiffness: 220, damping: 18 })
    const [glare, setGlare] = useState({ gx: 50, gy: 50, go: 0 })
    return (
        <motion.div ref={ref}
            onMouseMove={(e) => {
                const r = ref.current?.getBoundingClientRect()
                if (!r) return
                const px = (e.clientX - r.left) / r.width
                const py = (e.clientY - r.top) / r.height
                ry.set((px - 0.5) * 2 * max)
                rx.set(-(py - 0.5) * 2 * max)
                setGlare({ gx: px * 100, gy: py * 100, go: 1 })
            }}
            onMouseLeave={() => { rx.set(0); ry.set(0); setGlare(g => ({ ...g, go: 0 })) }}
            style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d", position: "relative" }}>
            {children}
            <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", opacity: glare.go, transition: "opacity 0.35s ease", background: `radial-gradient(circle at ${glare.gx}% ${glare.gy}%, rgba(255,255,255,0.22) 0%, transparent 55%)`, zIndex: 5 }} />
        </motion.div>
    )
}
