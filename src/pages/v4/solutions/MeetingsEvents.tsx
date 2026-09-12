import UseCasePageTemplate from "./UseCasePageTemplate"

function MeetingsEventsSimulation() {
    return (
        <div className="v4-sim-content">
            <div className="v4-sim-event-card">
                <div className="v4-sim-event-top">
                    <div>
                        <span className="v4-sim-badge v4-sim-badge--orange">MICE & GROUP</span>
                        <h5 className="v4-sim-event-name">Annual Sales Kickoff 2026</h5>
                    </div>
                    <span className="v4-sim-roster-pill">32 Attendees</span>
                </div>
                <div className="v4-sim-event-venue">
                    Venue: <strong>Fairmont San Jose & Grand Ballroom</strong>
                </div>
            </div>

            <div className="v4-sim-progress-box">
                <div className="v4-sim-progress-head">
                    <span>Master Group Budget</span>
                    <b>$34,800 / $42,000</b>
                </div>
                <div className="v4-sim-progress-bar">
                    <div className="v4-sim-progress-fill" style={{ width: "82%" }} />
                </div>
            </div>

            <div className="v4-sim-checklist">
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ SYNCED</span>
                    <span>Arrivals aligned: 32 flights landing 2:00 PM, 4:30 PM</span>
                </div>
                <div className="v4-sim-check-row">
                    <span className="v4-sim-badge v4-sim-badge--success">✓ ONE LEDGER</span>
                    <span>Single group invoice with attendee cost-center breakdown</span>
                </div>
            </div>
        </div>
    )
}

export default function MeetingsEventsPage() {
    return (
        <UseCasePageTemplate
            slug="meetings-events"
            title="MICE & Bleisure"
            headline="Beyond standard business travel."
            subline="From complex team offsites to after-hours experiences, Miraee handles every dimension of travel."
            blocks={[
                {
                    title: "MICE (Meetings, Incentives, Conferences, Exhibitions).",
                    body: "Plan offsites and customer events once, and the system books everything directly from the plan.",
                },
                {
                    title: "After 5pm / hyperlocal experiences.",
                    body: "Unlock restaurants, events, and hyperlocal experiences after hours via our Abhee platform.",
                },
                {
                    title: "Bleisure & personal travel.",
                    body: "Employees can use the same personal EA for personal leisure trips. Personal travel is booked at exclusive fares on personal cards, completely walled off from company visibility.",
                },
            ]}
            accentTag="Group Coordination"
            simulation={<MeetingsEventsSimulation />}
        />
    )
}
