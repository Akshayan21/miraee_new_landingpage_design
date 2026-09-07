import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Employees Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Employees
// Before: Assembling a trip across tabs, then saving receipts and filing
//   an expense report after getting home.
// With Miraee: Now they describe one.
// Body: Book from a sentence, checked against policy as you go. The
//   Receipt Scanner matches receipts to trips automatically, so there's
//   no report to file. Your briefing carries currency, safety, visa and
//   emergency numbers; Rewards tracks points to your next milestone.
// Controls: My Trips · Receipt Scanner · Rewards
// Action: Experience through an Employee lens
// Detail grid: "Navigate the whole trip in one platform" -- book from a
//   sentence, receipts that close themselves, and everything for the road,
//   each its own card.

const ICON_SENTENCE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v11H8l-4 4V5z" />
    </svg>
)
const ICON_RECEIPT = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
        <path d="M9 8h6M9 12h6" />
    </svg>
)
const ICON_BRIEFING = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </svg>
)

export default function V4SolutionEmployees() {
    return (
        <RoleShowcasePage
            roleSlug="employees"
            roleTitle="Employees"
            shift="Used to assemble a trip. Now they describe one."
            before="Assembling a trip across tabs, then saving receipts and filing an expense report after getting home."
            afterHeading="Now they describe one."
            body="Book from a sentence, checked against policy as you go. The Receipt Scanner matches receipts to trips automatically, so there's no report to file. Your briefing carries currency, safety, visa and emergency numbers; Rewards tracks points to your next milestone."
            controls={["My Trips", "Receipt Scanner", "Rewards"]}
            ctaText="Experience through an Employee lens"
            detailsHeading="Navigate the whole trip in one platform."
            details={[
                {
                    icon: ICON_SENTENCE,
                    title: "A trip from a sentence.",
                    body: "Describe it and it's booked in policy. The statistics strip keeps total trips, savings rate and duration in view.",
                },
                {
                    icon: ICON_RECEIPT,
                    title: "No report to file.",
                    body: "The Receipt Scanner matches receipts to trips with AI confidence and in-policy scoring, so expenses close themselves.",
                },
                {
                    icon: ICON_BRIEFING,
                    title: "Everything for the road, in hand.",
                    body: "Trip Briefing carries currency, safety, visa and emergency numbers, while Rewards tracks points to your next milestone.",
                },
            ]} />
    )
}
