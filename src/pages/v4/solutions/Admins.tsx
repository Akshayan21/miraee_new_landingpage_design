import RoleShowcasePage from "./RoleShowcasePage"
import adminVideo from "../../../assets/Video/Admin.mp4"
import adminPhoto from "../../../assets/Admin2.jpg"

// Solutions: Admins Page
// Content strictly from Miraee Website Content - V4 & User Instructions
// Video: Admin.mp4 (muted, loop, background, no buttons/emojis)

export default function V4SolutionAdmins() {
    return (
        <RoleShowcasePage
            roleSlug="admins"
            roleTitle="Admins"
            ctaText="Explore the Admin solution"
            shift="You used to police every trip. Now you set the rule once."
            before="Checking each trip against policy by hand, fielding one-off booking requests, hunting down onboarding gaps and exceptions, and reconciling spend across tools that never quite agree."
            afterHeading="Set the rule once. Let it run."
            body="Policy applies at search, so out-of-policy trips rarely get built — and the whole program sits on one screen instead of across a dozen."
            controls={["Overview", "Policies", "Live Map", "Agentic ROI"]}
            videoSrc={adminVideo}
            roleImage={adminPhoto}
            detailGroups={[
                {
                    eyebrow: "The pains you know",
                    heading: "Where admin still slows the program down.",
                    items: [
                        {
                            title: "Policing every trip.",
                            body: "Compliance means checking bookings by hand and fixing the ones that slipped through after the fact.",
                        },
                        {
                            title: "A program spread thin.",
                            body: "Onboarding gaps, budget, adoption and compliance live in different places, so proving the program works means gathering reports.",
                        },
                    ],
                },
                {
                    eyebrow: "How Miraee answers each",
                    heading: "Govern the program, not each trip.",
                    items: [
                        {
                            title: "Policy that enforces itself.",
                            body: "Rules apply at search and inherit by grade, so trips arrive in policy rather than being fixed later. Nothing publishes until you approve it.",
                        },
                        {
                            title: "The whole program at a glance.",
                            body: "Onboarding gaps, budget, adoption, compliance and exceptions sit on one Overview, with duty of care on the Live Map — no report-gathering.",
                        },
                        {
                            title: "Proof it's working.",
                            body: "The Agentic ROI Dashboard shows hours and dollars saved and the auto-approval rate, so the program's value is never a guess.",
                        },
                    ],
                },
            ]}
        />
    )
}
