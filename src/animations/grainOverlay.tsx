import { motion, useReducedMotion } from "framer-motion"

// Animated film grain over the whole experience: crafted, cinematic texture.
// The jitter is driven by a `transform` (compositor-only, cheap) instead of
// animating the background's paint offset directly (a paint-heavy property),
// so this doesn't force a perpetual full-viewport repaint. It also respects
// prefers-reduced-motion via framer-motion's useReducedMotion() — the CSS
// media query in index.css only catches CSS animation/transition, not
// JS-driven framer-motion values.
export function GrainOverlay() {
    const noise = "url(\"data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.55%27/></svg>\")"
    const prefersReducedMotion = useReducedMotion()
    const baseStyle: React.CSSProperties = { position: "fixed", inset: 0, backgroundImage: noise, backgroundSize: "180px 180px", opacity: 0.05, pointerEvents: "none", zIndex: 350, mixBlendMode: "multiply" }
    if (prefersReducedMotion) {
        return <div style={baseStyle} />
    }
    return (
        <motion.div
            animate={{ x: [0, -20, 14, -10, 0], y: [0, 13, -17, -10, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ ...baseStyle, willChange: "transform" }}
        />
    )
}
