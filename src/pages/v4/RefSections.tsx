import { Reveal } from "../../components/V4Kit"

// Verbatim ports of the sections the site-architecture doc names by version —
// layout, structure and reveal timing copied from the source, not
// re-interpreted through V4's generic card components.
//
//   OutcomesV1  "Less work, better journeys — from V1 homepage"
//               src/pages/HomeElegant.tsx:133 + .el-outcome* in HomeElegant.css
//   SecurityV1  "Fast for people. Safe for business — from V1 homepage"
//               src/pages/HomeElegant.tsx:135 + .el-security/.el-trust
//   SavingsV3   "Savings that compound on their own — V3"
//               src/pages/HomeV3.tsx:187 + .timeline/.stop in V3.css
//
// Colours are re-pointed at V4's --m-* tokens; every dimension, border, stagger
// delay and element order is unchanged from the source.

const OUTCOMES: [string, string, string, string, string][] = [
    ["For employees", "Ask once. Get a complete, policy-safe trip.", "A trip that feels personal - not procedural.", "4.8/5", "traveler experience"],
    ["For finance", "See committed spend before it becomes an expense.", "Complete transparency over company expenditure.", "20–30%", "wholesale savings"],
    ["For travel teams", "Set the rules once and run the program by exception.", "No more managing every single booking and update.", "24/7", "agent + human care"],
]

export function OutcomesV1() {
    return (
        <section id="outcomes" className="v4r-outcomes">
            <Reveal className="v4r-section-head">
                <span>Designed for everyone</span>
                <h2>Less work.<br /><em>Better journeys.</em></h2>
            </Reveal>
            <div className="v4r-outcome-grid">
                {OUTCOMES.map(([title, shift, expect, stat, statLabel], i) => (
                    <Reveal className="v4r-outcome" key={title} delay={i * 0.1}>
                        <span>0{i + 1}</span>
                        <h3>{title}</h3>
                        <p className="v4r-outcome__shift">{shift}</p>
                        <p className="v4r-outcome__expect">{expect}</p>
                        <div><strong>{stat}</strong><small>{statLabel}</small></div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

const TRUST: [string, string][] = [
    ["SOC 2", "Operational controls"],
    ["SSO / SCIM", "Identity management"],
    ["GDPR", "Privacy by design"],
    ["Audit logs", "Every agent action"],
]

export function SecurityV1() {
    return (
        <section id="governance" className="v4r-security">
            <Reveal>
                <span className="v4r-label">Enterprise foundations</span>
                <h2>Fast for people.<br />Safe for the business.</h2>
                <p>Every action is governed, permissioned, traceable, and ready for enterprise controls.</p>
            </Reveal>
            <div className="v4r-security__grid">
                {TRUST.map(([mark, label], i) => (
                    <Reveal className="v4r-trust" key={mark} delay={i * 0.08}>
                        <i>0{i + 1}</i>
                        <b>{mark}</b>
                        <span>{label}</span>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

const LOOP: [string, string][] = [
    ["Employee chooses smart", "Miraee surfaces a better option and a price to beat."],
    ["Company saves", "Savings are captured and visible in real time."],
    ["Employee earns", "Rewards land in the Miraee Wallet."],
    ["Adoption grows", "More trips on Miraee — more savings next quarter."],
]

export function SavingsV3() {
    return (
        <section id="savings" className="v4-section">
            <div className="v4-shell">
                <Reveal>
                    <h2 className="v4-h2">Savings that compound on their own.</h2>
                    <p className="v4-lede">Miraee doesn't enforce savings with restrictive policy alone — it rewards the behavior that creates them.</p>
                </Reveal>
                <div className="v4r-timeline">
                    {LOOP.map(([title, copy]) => (
                        <Reveal className="v4r-stop" key={title}>
                            <span className="v4r-dot" />
                            <b>{title}</b>
                            <span>{copy}</span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
