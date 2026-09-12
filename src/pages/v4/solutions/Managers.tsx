import RoleShowcasePage from "./RoleShowcasePage"
import managerPhoto from "../../../assets/Manager.jpg"

// Solutions: Managers Page
// Content strictly from Miraee Website Content - V4 & User Instructions.
// No "used to X, now Y" narrative (shift left empty hides the With
// Miraee/Old Way switcher — see RoleShowcasePage) and no capability chips;
// the pains/answers pairing is told through two headed pillar groups instead.

export default function V4SolutionManagers() {
    return (
        <RoleShowcasePage
            roleSlug="managers"
            roleTitle="Managers"
            ctaText="Explore the Manager solution"
            shift=""
            afterHeading="Run the team, not the paperwork."
            body="Routine trips book themselves inside policy. Only the exceptions that need to reach you with the context to decide in one glance."
            controls={[]}
            roleImage={managerPhoto}
            detailGroups={[
                {
                    eyebrow: "The pains you know",
                    heading: "Where the queue never really clears.",
                    items: [
                        {
                            title: "Approval overload.",
                            body: "Every trip pings you for sign-off, most of them routine, and the queue never really clears.",
                        },
                        {
                            title: "No read on the team.",
                            body: "Seeing how the team is tracking on spend means pulling a report, or asking around and waiting.",
                        },
                    ],
                },
                {
                    eyebrow: "How Miraee answers each",
                    heading: "Run the team, not the paperwork.",
                    items: [
                        {
                            title: "The whole team in one view.",
                            body: "Team Analytics shows spend vs budget, KPIs met, travel outcomes and spend insights together so you know how the team is tracking without asking anyone.",
                        },
                        {
                            title: "Approvals that take a click.",
                            body: "Routine trips self-book inside policy. Only real exceptions reach you, each with estimated cost, exact policy overage and an AI confidence score attached.",
                        },
                        {
                            title: "Rewards you control per person.",
                            body: "Allocate the team's points pool by employee, recognising the people booking smart and on-policy.",
                        },
                    ],
                },
            ]}
        />
    )
}
