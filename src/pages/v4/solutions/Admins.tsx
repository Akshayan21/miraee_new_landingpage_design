import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Admins Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Admins
// Shift: You used to police every trip. Now you set the rule once.
// Body: Policy applies at search. The Overview shows the whole program, onboarding gaps, exceptions, budget, adoption, compliance and AI savings. Manage travelers and rules, run duty of care from the Live Map, reconcile in one place. The Agentic ROI Dashboard shows what the agent saved.
// Controls: Overview · Policies · Live Map · Agentic ROI

export default function V4SolutionAdmins() {
    return (
        <RoleShowcasePage
            roleSlug="admins"
            roleTitle="Admins"
            shift="You used to police every trip. Now you set the rule once."
            body="Policy applies at search. The Overview shows the whole program, onboarding gaps, exceptions, budget, adoption, compliance and AI savings. Manage travelers and rules, run duty of care from the Live Map, reconcile in one place. The Agentic ROI Dashboard shows what the agent saved."
            controls={["Overview", "Policies", "Live Map", "Agentic ROI"]}
        />
    )
}
