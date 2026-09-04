import { V4Page, Reveal } from "../../../components/V4Kit"
import PersonaExperience, { PERSONA_SCRIPTS } from "../../../components/PersonaExperience"
import "../../SubpagesV2.css"
import "../V4.css"

interface RoleShowcaseProps {
    roleSlug: string
    roleTitle: string
    shift: string
    body: string
    controls: string[]
    ctaText?: string
}

function splitShift(shift: string): [string, string] {
    const i = shift.indexOf("Now ")
    if (i < 0) return [shift, ""]
    return [shift.slice(0, i).trim(), shift.slice(i).trim()]
}

export default function RoleShowcasePage({
    roleSlug,
    roleTitle,
    shift,
    body,
    controls,
    ctaText,
}: RoleShowcaseProps) {
    const [before, after] = splitShift(shift)
    const script = PERSONA_SCRIPTS[roleSlug]

    return (
        <V4Page
            title={`${roleTitle} | Solutions | Miraee`}
            description={`Everyone lands on a dashboard shaped to their role. ${shift}`}>

            <section className="v4-section" style={{ paddingTop: "clamp(90px, 10vw, 112px)", paddingBottom: "clamp(64px, 8vw, 100px)" }}>
                <div className="v4-shell">
                    <header className="v4-role-header-content">
                        <Reveal>
                            <span className="v4-role-eyebrow">BUILT FOR EACH SEAT</span>
                            <h1 className="v4-role-title">{roleTitle}</h1>
                            <p className="v4-role-lede">Everyone lands on a dashboard shaped to their role.</p>
                        </Reveal>
                    </header>

                    <div className="v4-role-diptych-light">
                        {/* Left Column: Exact docx content */}
                        <Reveal delay={0.08}>
                            <div className="v4-role-content-box-light">
                                <div style={{ fontSize: "10.5px", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--m-muted)", marginBottom: 8 }}>
                                    Before
                                </div>
                                <p className="v4-role-shift-before-light">{before}</p>

                                {after && (
                                    <>
                                        <div style={{ fontSize: "10.5px", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--m-orange)", marginBottom: 8 }}>
                                            With Miraee
                                        </div>
                                        <h2 className="v4-role-shift-now-light">{after}</h2>
                                    </>
                                )}

                                <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "var(--m-ink)", margin: "0 0 28px" }}>
                                    {body}
                                </p>

                                {controls && controls.length > 0 && (
                                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--m-line)" }}>
                                        <span style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--m-muted)", marginBottom: 12 }}>
                                            Controls
                                        </span>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {controls.map((ctrl) => (
                                                <span key={ctrl} className="v4-role-control-chip-light">{ctrl}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {ctaText && (
                                    <div style={{ marginTop: 32 }}>
                                        <button type="button" className="v4-btn v4-btn--solid">
                                            {ctaText}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {/* Right Column: Interactive live Persona preview in light tone */}
                        <Reveal delay={0.16}>
                            <div className="v4-role-preview-box-light">
                                {script ? (
                                    <PersonaExperience script={script} tone="light" autoPlay />
                                ) : null}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </V4Page>
    )
}
