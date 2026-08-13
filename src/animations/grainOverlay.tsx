import { motion } from "framer-motion"

// Animated film grain over the whole experience: crafted, cinematic texture.
export function GrainOverlay() {
    const noise = "url(\"data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27180%27 height=%27180%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.55%27/></svg>\")"
    return (
        <motion.div
            animate={{ backgroundPosition: ["0px 0px", "-60px 40px", "40px -50px", "-30px -30px", "0px 0px"] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ position: "fixed", inset: 0, backgroundImage: noise, backgroundSize: "180px 180px", opacity: 0.05, pointerEvents: "none", zIndex: 350, mixBlendMode: "multiply" }}
        />
    )
}
