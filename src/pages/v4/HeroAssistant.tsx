import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import avatarImg from "../../assets/Avatar.png"

// The right side of the homepage hero — a live-feeling voice/chat card.
// Everything is genuinely interactive — typing, the quick-action chips and
// the mic button all drive real state and produce a real (scripted, not
// model-generated) response, same honesty convention as PersonaExperience's
// "Scripted preview" tag elsewhere on the site.
//
// Submitting anything expands the card into a full-width takeover (parent
// hides the hero's copy column while this is true) — the close button hands
// control back to the parent AND resets this component's own conversation
// state, so reopening always starts clean.

const GREETING = "Good morning. Where are you travelling?"

const MIC_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
const SEND_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-8-8 18-2-8-8-2Z" /></svg>
const PLANE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.4.7c-.2.4-.1.9.3 1.2L8.7 12l-2 3H4l-1 1 3 2 2 3 1-1v-2.7l3-2 3.3 5.2c.3.4.8.6 1.3.4l.7-.3c.4-.2.6-.6.5-1.1z" /></svg>
const CHANGE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></svg>
const RECEIPT_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6" /></svg>
const BRIEFCASE_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></svg>
const BUILDING_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h6" /></svg>
const REFRESH_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></svg>
const CALENDAR_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 15h.01M12 15h.01M16 15h.01" /></svg>
const CLOSE_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>

const QUICK_PROMPTS: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Plan a trip", prompt: "Plan a trip to Singapore next week, within policy.", icon: PLANE_ICON },
    { label: "Change a booking", prompt: "I need to change my flight to a day earlier.", icon: CHANGE_ICON },
    { label: "Upload a receipt", prompt: "I have a taxi receipt to expense from today.", icon: RECEIPT_ICON },
]

const EXPANDED_LEFT: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Book a business trip", prompt: "Book a business trip to Singapore next week, within policy.", icon: BRIEFCASE_ICON },
    { label: "Find a policy-friendly flight", prompt: "Find a policy-friendly flight for tomorrow morning.", icon: PLANE_ICON },
    { label: "Add a hotel near my meeting", prompt: "Add a hotel near my meeting downtown.", icon: BUILDING_ICON },
]
const EXPANDED_RIGHT: { label: string; prompt: string; icon: ReactNode }[] = [
    { label: "Change my upcoming flight", prompt: "I need to change my upcoming flight to a day earlier.", icon: REFRESH_ICON },
    { label: "Extend my trip", prompt: "Extend my current trip by two days.", icon: CALENDAR_ICON },
    { label: "Upload an expense receipt", prompt: "I have an expense receipt to upload from today.", icon: RECEIPT_ICON },
]

function respondTo(text: string): string {
    const t = text.toLowerCase()
    if (/change|resched|move|earlier|later|cancel|extend/.test(t)) return "Checking fare rules for a change — I'll hold the best option and confirm before anything is booked."
    if (/receipt|expense|reimburse/.test(t)) return "Got it. I'll code this to the right category and post it automatically — no report to file."
    if (/trip|flight|book|fly|hotel|travel|singapore|meeting/.test(t)) return "On it. Building an in-policy itinerary now — I'll have the best option in a moment."
    return "Tell me the trip, the dates, or what needs to change, and I'll take it from there."
}

type Props = {
    /** Parent-controlled: true once a prompt has been submitted. */
    expanded?: boolean
    /** Fired the moment a prompt is submitted, so the parent can hide the
     *  hero's copy column and give this component the full row. */
    onExpand?: () => void
    /** Fired when the close button is pressed. This component resets its own
     *  conversation state first, then the parent flips `expanded` back off. */
    onClose?: () => void
}

export function HeroAssistant({ expanded = false, onExpand, onClose }: Props) {
    const reduce = useReducedMotion()
    const [caption, setCaption] = useState(GREETING)
    const [value, setValue] = useState("")
    const [status, setStatus] = useState<"idle" | "thinking">("idle")
    const [listening, setListening] = useState(false)
    const timer = useRef<number>(0)

    const submit = (text: string) => {
        const trimmed = text.trim()
        if (!trimmed || status === "thinking") return
        onExpand?.()
        setValue("")
        if (reduce) {
            setCaption(respondTo(trimmed))
            return
        }
        setStatus("thinking")
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => {
            setCaption(respondTo(trimmed))
            setStatus("idle")
        }, 650)
    }

    const close = () => {
        window.clearTimeout(timer.current)
        setCaption(GREETING)
        setValue("")
        setStatus("idle")
        setListening(false)
        onClose?.()
    }

    const avatar = (
        <motion.img className={expanded ? "v4-assistant__photo v4-assistant__photo--lg" : "v4-assistant__photo"} src={avatarImg} alt=""
            animate={reduce ? undefined : { scale: status === "thinking" ? [1, 1.015, 1] : [1, 1.008, 1] }}
            transition={{ duration: status === "thinking" ? 1.4 : 4, repeat: Infinity, ease: "easeInOut" }} />
    )

    const captionEl = (
        <motion.span key={status === "thinking" ? "thinking" : caption}
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}>
            {status === "thinking" ? "…" : caption}
        </motion.span>
    )

    const waveEl = status === "thinking" && (
        <div className="v4-assistant__wave" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, i) => (
                <motion.span key={i}
                    initial={reduce ? undefined : { scaleY: 0.3 }}
                    animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.045 }} />
            ))}
        </div>
    )

    if (expanded) {
        return (
            <motion.div className="v4-assistant v4-assistant--expanded"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>
                <button type="button" className="v4-assistant__close" aria-label="Close assistant" onClick={close}>
                    {CLOSE_ICON}
                </button>

                <div className="v4-assistant__chips v4-assistant__chips--left">
                    {EXPANDED_LEFT.map(q => (
                        <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                            {q.icon}<span>{q.label}</span>
                            <i aria-hidden="true">→</i>
                        </button>
                    ))}
                </div>

                <div className="v4-assistant__stage">
                    <div className="v4-assistant__oval" aria-hidden="true">{avatar}</div>
                    <p className="v4-assistant__caption v4-assistant__caption--lg" aria-live="polite">{captionEl}</p>
                    {waveEl}
                    <button type="button" className="v4-assistant__listen" onClick={() => setListening(l => !l)}>
                        <span>Listening is {listening ? "on" : "off"}</span>
                        <span className="v4-assistant__mic-circle" aria-hidden="true">{MIC_ICON}</span>
                    </button>
                </div>

                <div className="v4-assistant__chips v4-assistant__chips--right">
                    {EXPANDED_RIGHT.map(q => (
                        <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                            {q.icon}<span>{q.label}</span>
                        </button>
                    ))}
                </div>

                <form className="v4-assistant__bar" onSubmit={e => { e.preventDefault(); submit(value) }}>
                    <span className="v4-assistant__bar-keyboard" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" /></svg>
                    </span>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Ask Miraee anything…"
                        aria-label="Ask Miraee anything"
                    />
                    <button type="button" className="v4-assistant__mic" aria-label="Try a sample voice prompt"
                        onClick={() => submit(QUICK_PROMPTS[0].prompt)}>{MIC_ICON}</button>
                    <button type="submit" className="v4-assistant__send" aria-label="Send" disabled={!value.trim() || status === "thinking"}>{SEND_ICON}</button>
                </form>
            </motion.div>
        )
    }

    return (
        <div className="v4-assistant">
            <span className="v4-assistant__live"><i aria-hidden="true" /> Live</span>

            <div className="v4-assistant__avatar" aria-hidden="true">{avatar}</div>

            {/* No AnimatePresence/exit here on purpose — a changed `key` makes
                React swap the DOM node synchronously, so the new text is
                never gated behind an exit animation completing. Only the
                entrance fades in; nothing lingers if it doesn't. */}
            <p className="v4-assistant__caption" aria-live="polite">{captionEl}</p>

            {waveEl}

            <form className="v4-assistant__form" onSubmit={e => { e.preventDefault(); submit(value) }}>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Tell Miraee about your trip"
                    aria-label="Tell Miraee about your trip"
                />
                <button type="button" className="v4-assistant__mic" aria-label="Try a sample voice prompt"
                    onClick={() => submit(QUICK_PROMPTS[0].prompt)}>{MIC_ICON}</button>
                <button type="submit" className="v4-assistant__send" aria-label="Send" disabled={!value.trim() || status === "thinking"}>{SEND_ICON}</button>
            </form>

            <div className="v4-assistant__prompts">
                {QUICK_PROMPTS.map(q => (
                    <button type="button" key={q.label} onClick={() => submit(q.prompt)}>
                        {q.icon}{q.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
