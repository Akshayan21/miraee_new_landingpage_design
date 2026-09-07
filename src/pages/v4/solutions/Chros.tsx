import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: CHROs Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: CHROs (HR)
// Before: Enforcing policy top-down, reacting late when a traveler hit
//   trouble, and stitching together who was travel-ready or where people
//   were from scattered updates and separate systems.
// With Miraee: Now you support people.
// Body: Your view leads with people: Total People, Travel Ready, Currently
//   Traveling and Compliance. Duty of Care shows every active traveler
//   with a live location, plus on-trip tracking, a travelers-by-day
//   calendar and compliance by team pulled from HRIS. Same policy for
//   everyone, a consumer-grade experience.
// Controls: Duty of Care · Readiness · Compliance by Team
// Detail grid: "Built around people, not policy" -- a people-first
//   overview, always-on duty of care and one fair standard, each its own
//   card. (Heading inferred to match the other role pages' pattern; the
//   three card bodies are the user's copy verbatim, lightly smoothed.)

const ICON_PEOPLE_FIRST = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
        <path d="M16 9.5l1.5 1.5L21 7.5" />
    </svg>
)
const ICON_CARE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5s-7.3-4.6-9.6-9.2C1.1 8.2 2.7 5 6 5c2 0 3.4 1.1 4.3 2.5C11.2 6.1 12.6 5 14.6 5c3.3 0 4.9 3.2 3.6 6.3-2.3 4.6-6.2 9.2-6.2 9.2z" />
    </svg>
)
const ICON_FAIRNESS = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M6 7l-3 6a3 3 0 0 0 6 0l-3-6zM18 7l-3 6a3 3 0 0 0 6 0l-3-6zM7 7h10" />
    </svg>
)

export default function V4SolutionChros() {
    return (
        <RoleShowcasePage
            roleSlug="chros"
            roleTitle="CHROs (HR)"
            shift="You used to enforce policy. Now you support people."
            before="Enforcing policy top-down, reacting late when a traveler hit trouble, and stitching together who was travel-ready or where people were from scattered updates and separate systems."
            afterHeading="Now you support people."
            body="Your view leads with people: Total People, Travel Ready, Currently Traveling and Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking, a travelers-by-day calendar and compliance by team pulled from HRIS. Same policy for everyone, a consumer-grade experience."
            controls={["Duty of Care", "Readiness", "Compliance by Team"]}
            detailsHeading="Built around people, not policy."
            details={[
                {
                    icon: ICON_PEOPLE_FIRST,
                    title: "People, not policy, up front.",
                    body: "The Overview reads as Travel Ready, Currently Traveling and Compliance, with a readiness checklist per employee, so you see who's set and who needs a nudge.",
                },
                {
                    icon: ICON_CARE,
                    title: "Care that's always on.",
                    body: "Duty of Care tracks every active traveler live, so support reaches people before they have to ask.",
                },
                {
                    icon: ICON_FAIRNESS,
                    title: "Fairness by design.",
                    body: "Compliance by team from HRIS and one policy for everyone means the same standard applies to all, no exceptions to manage.",
                },
            ]} />
    )
}
