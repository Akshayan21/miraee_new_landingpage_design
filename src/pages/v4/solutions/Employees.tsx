import RoleShowcasePage from "./RoleShowcasePage"
import travellerPhoto from "../../../assets/traveller.jpg"

// Solutions: Employees Page ("Solutions for Employees")
// Content strictly from Miraee Website Content - V4 & User Instructions.
// This page has no "used to X, now Y" transformation narrative (shift left
// empty, which hides the With Miraee/Old Way switcher entirely — see
// RoleShowcasePage) and no capability chips; it's a single hands-free-
// assistant story told across two headed pillar groups instead.

export default function V4SolutionEmployees() {
    return (
        <RoleShowcasePage
            roleSlug="employees"
            roleTitle="Employees"
            ctaText="Explore the Traveler solution"
            shift=""
            afterHeading="Meet your hands-free travel assistant."
            body="Voice, text or avatar. Your preferences, past trips and policy tier are known before you make your first request."
            controls={[]}
            roleImage={travellerPhoto}
            detailGroups={[
                {
                    heading: "How it works for you",
                    items: [
                        {
                            title: "Planning and booking.",
                            body: "Say \"plan a trip to Tokyo.\" Miraee checks your calendar, reads your policy tier, and books flight and hotel while tracking your visa validity, all in one fluid motion.",
                        },
                        {
                            title: "Disruption, handled.",
                            body: "A delay hits. Miraee pings you with a rebooked option and an exchange summary before the airline even announces it at the gate.",
                        },
                    ],
                },
                {
                    heading: "What makes it easy",
                    items: [
                        {
                            title: "Multi-modal access.",
                            body: "Carry the same continuous conversation across phone, desktop and web by text, voice or the human-like avatar.",
                        },
                        {
                            title: "Strict personal separation.",
                            body: "Corporate travel and personal trips, one place. Personal trips book on your own card at exclusive fares, completely walled off from company visibility.",
                        },
                    ],
                },
            ]}
        />
    )
}
