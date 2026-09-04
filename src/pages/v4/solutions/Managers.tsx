import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Managers Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Managers (Approver)
// Shift: You used to chase approvals. Now only exceptions reach you.
// Body: Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage, and an AI confidence score, decide in one glance. Team Analytics gives spend vs budget and compliance without a report.
// Controls: Approvals · Team Analytics · Team Trips

export default function V4SolutionManagers() {
    return (
        <RoleShowcasePage
            roleSlug="managers"
            roleTitle="Managers (Approver)"
            shift="You used to chase approvals. Now only exceptions reach you."
            body="Routine trips inside policy self-book. What reaches you arrives with estimated cost, exact policy overage, and an AI confidence score, decide in one glance. Team Analytics gives spend vs budget and compliance without a report."
            controls={["Approvals", "Team Analytics", "Team Trips"]}
        />
    )
}
