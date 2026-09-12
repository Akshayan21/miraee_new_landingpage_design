import UseCasePageTemplate from "./UseCasePageTemplate"

function GlobalMobilitySimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-entity-grid">
                <div className="v4-sim-entity-item v4-sim-entity-item--active">
                    <span className="v4-sim-flag">🇬🇧 UK HQ</span>
                    <b>£220/day Per Diem</b>
                    <span>GBP / HMRC Rules</span>
                </div>
                <div className="v4-sim-entity-item">
                    <span className="v4-sim-flag">🇩🇪 Berlin Hub</span>
                    <b>€195/day Per Diem</b>
                    <span>EUR / Statutory</span>
                </div>
                <div className="v4-sim-entity-item">
                    <span className="v4-sim-flag">🇺🇸 US Operations</span>
                    <b>$260/day Per Diem</b>
                    <span>USD / GSA Tier 1</span>
                </div>
            </div>

            <div className="v4-sim-checklist" style={{ marginTop: 16 }}>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ RESIDENCY</span>
                    <span>EU tenant data residency locked in Frankfurt region</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ HRIS LIVE</span>
                    <span>Cost centres & employee grades inherited across entities</span>
                </div>
            </div>
        </div>
    )
}

export default function GlobalMobilityPage() {
    return (
        <UseCasePageTemplate
            slug="global-mobility"
            title="Global Mobility"
            headline="One platform, every border."
            subline="Cross-border travel for distributed teams, with local rules, currency and data residency handled per office."
            blocks={[
                {
                    title: "Policy that fits each entity.",
                    body: "Entity-level policy, currency and data residency, set per office rather than forced into one mould.",
                },
                {
                    title: "Rules that inherit themselves.",
                    body: "Grade-based policy carries across entities automatically, so seniority sets the rules, not manual setup.",
                },
                {
                    title: "People data always current.",
                    body: "HRIS keeps cost centres and managers up to date without anyone maintaining them by hand.",
                },
            ]}
            accentTag="Cross-Border Entity"
            simulation={<GlobalMobilitySimulation />}
        />
    )
}
