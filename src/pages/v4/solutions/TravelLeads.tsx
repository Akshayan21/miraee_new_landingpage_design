import RoleShowcasePage from "./RoleShowcasePage"
import travelLeadPhoto from "../../../assets/Travell_lead.jpg"

// Solutions: Travel Leads Page
// Content strictly from Miraee Website Content - V4 & User Instructions.
// No "used to X, now Y" narrative (shift left empty hides the With
// Miraee/Old Way switcher — see RoleShowcasePage) and no capability chips;
// the pains/answers pairing is told through two headed pillar groups instead.

export default function V4SolutionTravelLeads() {
    return (
        <RoleShowcasePage
            roleSlug="travel-leads"
            roleTitle="Travel Leads"
            ctaText="Explore the Travel Lead solution"
            shift=""
            afterHeading="Run a program, not a booking desk."
            body="Every traveller in motion on one screen, every open request in one queue, and the analytics to run travel as a program."
            controls={[]}
            roleImage={travelLeadPhoto}
            detailGroups={[
                {
                    eyebrow: "The pains you know",
                    heading: "Booking by hand, one at a time.",
                    items: [
                        {
                            title: "Booking by hand, one at a time.",
                            body: "Requests arrive from everywhere and each is processed manually, with no single place they all live.",
                        },
                        {
                            title: "Blind between bookings.",
                            body: "Once people are travelling, tracking where they are and what's still open means chasing updates.",
                        },
                    ],
                },
                {
                    eyebrow: "How Miraee answers each",
                    heading: "Run a program, not a booking desk.",
                    items: [
                        {
                            title: "Everyone is in motion, on one screen.",
                            body: "The Live Tracker shows route, status, flight and ETA, alongside Active Trips, Upcoming and Travellers Abroad at a glance.",
                        },
                        {
                            title: "Every request in one queue.",
                            body: "The Booking Queue holds every open booking, traveller, dates, items, status so nothing slips.",
                        },
                        {
                            title: "A program, not just bookings.",
                            body: "Analytics by team, entity and route, with MICE and group booking built in and direct supply through Mondee.",
                        },
                    ],
                },
            ]}
        />
    )
}
