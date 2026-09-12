import UseCasePageTemplate from "./UseCasePageTemplate"

function EmergencyDisruptionSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-alert-box">
                <div className="v4-sim-alert-head">
                    <span className="v4-sim-alert-pulse">⚠️ ALERT</span>
                    <strong>Storm Disruption · Chicago (ORD)</strong>
                </div>
                <p className="v4-sim-alert-msg">
                    Severe weather incoming. 18 flights delayed. 3 employees scheduled to depart.
                </p>
            </div>

            <div className="v4-sim-tracker">
                <div className="v4-sim-tracker-head">
                    <span>Active Travelers in Context</span>
                    <span className="v4-sim-badge v4-sim-badge--success">3 Located</span>
                </div>
                <div className="v4-sim-traveler-row">
                    <span>D. Miller (ORD → SFO)</span>
                    <strong style={{ color: "var(--m-orange)" }}>Auto-rebooked to 6:20 PM</strong>
                </div>
                <div className="v4-sim-traveler-row">
                    <span>S. Chen & R. Gomez</span>
                    <span style={{ color: "var(--m-maroon)" }}>Checked into safe airport lounge</span>
                </div>
            </div>

            <div className="v4-sim-check-row" style={{ marginTop: 12 }}>
                <span className="v4-sim-badge v4-sim-badge--orange">✓ ONE THREAD</span>
                <span>Travel lead, admin & traveler synchronized on live console</span>
            </div>
        </div>
    )
}

export default function EmergencyDisruptionPage() {
    return (
        <UseCasePageTemplate
            slug="emergency-disruption"
            title="Emergency & Disruption"
            headline="When plans break, one thread holds."
            subline="Proactive rebooking, live traveller location, and the whole response in one place."
            blocks={[
                {
                    title: "Rebooking before you ask.",
                    body: "Miraee watches for disruption and offers a rebooked option, often before the airline announces it.",
                },
                {
                    title: "Everyone located, in real time.",
                    body: "Live traveller location on the map, so the team always knows who's affected and where.",
                },
                {
                    title: "One console for the response.",
                    body: "Duty of care runs from the same screen, so travel leads, admins and CHROs act on the same picture.",
                },
            ]}
            accentTag="Duty of Care"
            simulation={<EmergencyDisruptionSimulation />}
        />
    )
}
