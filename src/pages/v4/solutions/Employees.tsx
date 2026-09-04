import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Employees Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Employees
// Shift: Used to assemble a trip. Now they describe one.
// Body: Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone.
// Controls: My Trips · Receipt Scanner · Rewards
// Action: Experience through an Employee lens

export default function V4SolutionEmployees() {
    return (
        <RoleShowcasePage
            roleSlug="employees"
            roleTitle="Employees"
            shift="Used to assemble a trip. Now they describe one."
            body="Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone."
            controls={["My Trips", "Receipt Scanner", "Rewards"]}
            ctaText="Experience through an Employee lens"
        />
    )
}
