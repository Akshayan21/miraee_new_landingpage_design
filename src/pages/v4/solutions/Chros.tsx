import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: CHROs Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: CHROs (HR)
// Shift: You used to enforce policy. Now you support people.
// Body: Your view leads with people: Travel Ready, Currently Traveling, Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking and compliance by a team from HRIS. Same policy for everyone, consumer-grade experience.
// Controls: Duty of Care · Readiness · Compliance by Team

export default function V4SolutionChros() {
    return (
        <RoleShowcasePage
            roleSlug="chros"
            roleTitle="CHROs (HR)"
            shift="You used to enforce policy. Now you support people."
            body="Your view leads with people: Travel Ready, Currently Traveling, Compliance. Duty of Care shows every active traveler with a live location, plus on-trip tracking and compliance by a team from HRIS. Same policy for everyone, consumer-grade experience."
            controls={["Duty of Care", "Readiness", "Compliance by Team"]}
        />
    )
}
