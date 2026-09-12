import RoleShowcasePage from "./RoleShowcasePage"
import hrPhoto from "../../../assets/HR_2.jpg"

// Solutions: CHROs / People Teams Page
// Content strictly from Miraee Website Content - V4 & User Instructions.
// No "used to X, now Y" narrative (shift left empty hides the With
// Miraee/Old Way switcher — see RoleShowcasePage) and no capability chips;
// the pains/answers pairing is told through two headed pillar groups instead.

export default function V4SolutionChros() {
    return (
        <RoleShowcasePage
            roleSlug="chros"
            roleTitle="CHROs"
            ctaText="Explore the People solution"
            shift=""
            afterHeading="A meaningful benefit for every employee."
            body="Turn corporate travel from an administrative chore into a rewarding perk with the highest standard of safety and duty of care."
            controls={[]}
            roleImage={hrPhoto}
            detailGroups={[
                {
                    eyebrow: "The pains you know",
                    heading: "Unequal perks, and duty-of-care gaps.",
                    items: [
                        {
                            title: "Unequal perks.",
                            body: "Traditional travel tools only reward the 10% who travel heavily, leaving the rest of the company behind.",
                        },
                        {
                            title: "Duty-of-care gaps.",
                            body: "During a disruption, knowing exactly where your people are is too often a guess based on outdated systems.",
                        },
                    ],
                },
                {
                    eyebrow: "How Miraee answers each",
                    heading: "A benefit and a safety net, for everyone.",
                    items: [
                        {
                            title: "Wallets and rewards for all.",
                            body: "Employees earn rewards for smart booking choices, landing in a digital wallet they can spend in the burn store, flight upgrades or personal travel at exclusive fares. Because personal travel is supported too, it's a retention lever for 100% of your workforce, not just frequent flyers.",
                        },
                        {
                            title: "Modern duty of care.",
                            body: "Every traveller is located by their itinerary, with travel alerts, weather and disruption monitoring per PNR. SOS intervention is on hand, and managers and HR are notified only when it truly matters, always with an audit trail.",
                        },
                    ],
                },
            ]}
        />
    )
}
