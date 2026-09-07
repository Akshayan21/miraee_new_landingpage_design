import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Admins Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Admins
// Before: Checking each trip against policy by hand, fielding one-off
//   booking requests, hunting down onboarding gaps and exceptions, and
//   reconciling spend across tools that never quite agree.
// With Miraee: Now you set the rule once.
// Body: Policy applies at search, so out-of-policy trips rarely get built.
//   The Overview shows the whole program in one place: onboarding gaps,
//   exceptions, budget, adoption, compliance and AI-surfaced savings.
//   Manage travelers and rules, run duty of care from the Live Map, and
//   reconcile without switching screens. The Agentic ROI Dashboard shows
//   exactly what the agent saved in hours and dollars.
// Controls: Overview · Policies · Live Map · Agentic ROI
// Detail grid: "Govern the program, not each trip" -- self-enforcing
//   policy, whole-program visibility and proof of ROI, each as its own card.

const ICON_POLICY = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
)
const ICON_OVERVIEW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)
const ICON_ROI = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
    </svg>
)

export default function V4SolutionAdmins() {
    return (
        <RoleShowcasePage
            roleSlug="admins"
            roleTitle="Admins"
            shift="You used to police every trip. Now you set the rule once."
            before="Checking each trip against policy by hand, fielding one-off booking requests, hunting down onboarding gaps and exceptions, and reconciling spend across tools that never quite agree."
            afterHeading="Now you set the rule once."
            body="Policy applies at search, so out-of-policy trips rarely get built. The Overview shows the whole program in one place: onboarding gaps, exceptions, budget, adoption, compliance and AI-surfaced savings. Manage travelers and rules, run duty of care from the Live Map, and reconcile without switching screens. The Agentic ROI Dashboard shows exactly what the agent saved in hours and dollars."
            controls={["Overview", "Policies", "Live Map", "Agentic ROI"]}
            detailsHeading="Govern the program, not each trip."
            details={[
                {
                    icon: ICON_POLICY,
                    title: "Policy that enforces itself.",
                    body: "Rules apply at search and inherit by grade, so trips arrive in policy instead of being fixed after the fact.",
                },
                {
                    icon: ICON_OVERVIEW,
                    title: "The whole program at a glance.",
                    body: "Onboarding gaps, budget, adoption, compliance and exceptions sit on one Overview, with duty of care on the Live Map, so there's no report-gathering.",
                },
                {
                    icon: ICON_ROI,
                    title: "Proof it's working.",
                    body: "The Agentic ROI Dashboard shows hours and dollars saved and the auto-approval rate, so the program's value is never a guess.",
                },
            ]} />
    )
}
