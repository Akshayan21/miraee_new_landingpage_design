import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Managers Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Managers (Approver)
// Before: Chasing sign-offs across chat and email, approving trips with no
//   real context, and piecing together the team's progress and spends from
//   scattered updates.
// With Miraee: Now only exceptions reach you.
// Body: Routine trips inside policy self-book. What reaches you arrives
//   with estimated cost, exact policy overage and an AI confidence score,
//   so you can decide in one glance. Team Analytics gives you spend vs
//   budget, compliance and travel outcomes in one view, and you can
//   allocate rewards per employee across the team, all without pulling a
//   month's report.
// Controls: Approvals · Team Analytics · Team Trips
// Detail grid: "Run the team, not the paperwork" -- team-wide visibility,
//   one-click approvals and per-person rewards, each as its own card.

const ICON_TEAM_VIEW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
)
const ICON_ONE_CLICK = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9" />
    </svg>
)
const ICON_REWARDS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3z" />
    </svg>
)

export default function V4SolutionManagers() {
    return (
        <RoleShowcasePage
            roleSlug="managers"
            roleTitle="Managers (Approver)"
            shift="You used to chase approvals. Now only exceptions reach you."
            before="Chasing sign-offs across chat and email, approving trips with no real context, and piecing together the team's progress and spends from scattered updates."
            afterHeading="Now only exceptions reach you."
            body="Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage and an AI confidence score, so you can decide in one glance. Team Analytics gives you spend vs budget, compliance and travel outcomes in one view, and you can allocate rewards per employee across the team, all without pulling a month's report."
            controls={["Approvals", "Team Analytics", "Team Trips"]}
            detailsHeading="Run the team, not the paperwork."
            details={[
                {
                    icon: ICON_TEAM_VIEW,
                    title: "The whole team in one view.",
                    body: "Team Analytics shows spend vs budget, KPIs met, travel outcomes and spend insights together, so you see how the team is tracking without asking anyone.",
                },
                {
                    icon: ICON_ONE_CLICK,
                    title: "Approvals that take a click.",
                    body: "Routine trips self-book inside policy; only real exceptions reach you, each with cost, overage and confidence attached.",
                },
                {
                    icon: ICON_REWARDS,
                    title: "Rewards you control per person.",
                    body: "Allocate the team's points pool by employee, recognizing the people booking smart and on-policy.",
                },
            ]} />
    )
}
